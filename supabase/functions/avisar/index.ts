// TUQUI · avisar
//
// Empuja un aviso al celular de los demas integrantes del hogar cuando
// alguien registra un gasto.
//
// Recibe SOLO el id del gasto. El texto lo arma esta funcion leyendo la base,
// para que nadie pueda hacerle mandar un mensaje inventado. Y antes de leerlo
// usa la sesion de quien llama: si las reglas RLS no lo dejan ver ese gasto,
// es que no es de su hogar y no se envia nada.

import webpush from 'npm:web-push@3.6.7'
import { createClient } from 'jsr:@supabase/supabase-js@2'

const URL  = Deno.env.get('SUPABASE_URL')!
const ANON = Deno.env.get('SUPABASE_ANON_KEY')!
const SRV  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const VPUB = Deno.env.get('VAPID_PUBLIC')!
const VPRI = Deno.env.get('VAPID_PRIVATE')!

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

webpush.setVapidDetails('mailto:avisos@tuqui.app', VPUB, VPRI)

const plata = (n: number) => '$' + Math.round(n).toLocaleString('es-CO')
const json = (o: unknown, status = 200) =>
  new Response(JSON.stringify(o), { status, headers: { ...CORS, 'Content-Type': 'application/json' } })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })
  try {
    const jwt = req.headers.get('Authorization') || ''
    if (!jwt) return json({ error: 'sin sesion' }, 401)

    const { gasto } = await req.json().catch(() => ({ gasto: null }))
    if (!gasto) return json({ error: 'falta el gasto' }, 400)

    // Con la sesion de quien llama: RLS decide si puede ver ese gasto.
    const mio = createClient(URL, ANON, { global: { headers: { Authorization: jwt } } })
    const { data: sesion } = await mio.auth.getUser()
    const quien = sesion?.user
    if (!quien) return json({ error: 'sin sesion' }, 401)

    const { data: g } = await mio.from('expenses')
      .select('id, household_id, nombre, monto').eq('id', gasto).single()
    if (!g) return json({ error: 'no autorizado' }, 403)

    // De aqui en adelante hace falta leer datos de otros: va con el rol de servicio,
    // pero ya sabemos que quien llama pertenece al hogar.
    const admin = createClient(URL, SRV)
    const { data: ms } = await admin.from('members')
      .select('user_id, nombre').eq('household_id', g.household_id)

    const yo = (ms || []).find((m) => m.user_id === quien.id)
    const otros = (ms || []).filter((m) => m.user_id && m.user_id !== quien.id).map((m) => m.user_id)
    if (!otros.length) return json({ enviados: 0, motivo: 'nadie mas en el hogar' })

    const { data: subs } = await admin.from('push_subs')
      .select('id, endpoint, p256dh, auth').in('user_id', otros)
    if (!subs?.length) return json({ enviados: 0, motivo: 'nadie tiene avisos activos' })

    const cuerpo = JSON.stringify({
      t: (yo?.nombre || 'Alguien') + ' registro ' + g.nombre,
      b: plata(Number(g.monto)),
      g: g.id,
    })

    let ok = 0
    await Promise.all(subs.map(async (s) => {
      try {
        await webpush.sendNotification(
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, cuerpo)
        ok++
      } catch (e) {
        // 404 o 410: ese celular desinstalo la app o revoco el permiso.
        // La suscripcion ya no sirve, se borra sola.
        const code = (e as { statusCode?: number })?.statusCode
        if (code === 404 || code === 410) await admin.from('push_subs').delete().eq('id', s.id)
      }
    }))

    return json({ enviados: ok })
  } catch (e) {
    return json({ error: String(e) }, 500)
  }
})
