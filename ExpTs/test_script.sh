#!/bin/bash

DIR="ExpTS"
DB="bd_sistema"
USER="root"
PASS="sebastiaoufamicomp"
PORT="3333"
ROUNDS="10"

cd $DIR
npm install

# Criar e configurar os arquivo .env
echo "PORT=$PORT" > .env
echo "ROUNDS=$ROUNDS" >> .env
echo "DATABASE_URL=mysql://$USER:$PASS@localhost:3306/$DB" >> .env

# Drop e create database no MySQL
mysql -u$USER -p$PASS -e "DROP DATABASE IF EXISTS $DB;"
mysql -u$USER -p$PASS -e "CREATE DATABASE $DB;"

# Rodar as migrações do Prisma
npx prisma migrate dev --name init

# Iniciar a aplicação
npm run start:prod
