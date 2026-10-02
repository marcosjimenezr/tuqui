#!/usr/bin/env bash
# Pone en index.html la version de este despliegue.
# Numero secuencial (commits + 1) · fecha · commit corto.
# Se corre SIEMPRE justo antes de hacer commit.
set -e
cd "$(dirname "$0")/.."
N=$(( $(git rev-list --count HEAD) + 1 ))
F=$(date +%Y-%m-%d)
S=$(git rev-parse --short HEAD)
V="$N · $F · $S"
python3 - "$V" <<'PY'
import io,re,sys
v=sys.argv[1]
p='public/index.html'
s=io.open(p,encoding='utf-8').read()
s=re.sub(r'(<meta name="tuqui-version" content=")[^"]*(">)', lambda m:m.group(1)+v+m.group(2), s)
io.open(p,'w',encoding='utf-8').write(s)
PY
echo "version: $V"
