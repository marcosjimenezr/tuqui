// TUQUI · configuración
//
// Estos dos valores son públicos por diseño: viajan al navegador de
// todos los que abran la app. Lo que protege los datos NO son ellos,
// son las políticas RLS que instalaste con schema.sql.
//
// La llave "secret" (sb_secret_...) NUNCA va aquí: esa sí salta todas
// las reglas de seguridad.

window.TUQUI_CONFIG = {
  SUPABASE_URL: 'https://lvvjallhrbfxoylkmxeg.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_6mwTOj4ZoUVuf7kWWDuPcQ_EQvHB037',

  // Pon en true cada uno SOLO cuando ya lo hayas configurado en
  // Supabase (Authentication -> Providers). Si se muestra el boton
  // sin estar configurado, da error al tocarlo.
  // Llave publica de los avisos. Es publica por diseno, igual que la anon.
  // La privada vive solo como secreto en Supabase, nunca en este archivo.
  VAPID_PUBLIC: 'BPl8-LYcybnrX57nIeyH4CvpaZRoCMeHHR6EQe3cVwVYan7k1rKNrbas6FmKmssPQknO91BlgNweJn1Z45fhznQ',

  GOOGLE: false,
  APPLE:  false,
};
