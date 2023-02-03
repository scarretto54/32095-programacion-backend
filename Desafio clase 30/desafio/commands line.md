# Lineas de comandos del desafio

## Consigna 1

pm2 start app.js --name server_fork  --watch -- --port=8080 --mode=fork

pm2 start app.js --name server_cluster --watch -i max -- --port=8081 --mode=cluster

Archivo de configuración 1

## Consigna 2

pm2 start app.js  --name server_1 --watch -- --port=8080 --mode=fork
pm2 start app.js  --name server_2 --watch -- --port=8082 --mode=fork
pm2 start app.js  --name server_3 --watch -- --port=8083 --mode=fork
pm2 start app.js  --name server_4 --watch -- --port=8084 --mode=fork
pm2 start app.js  --name server_5 --watch -- --port=8085 --mode=fork

Archivo de configuración 2