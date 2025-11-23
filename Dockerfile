# syntax=docker/dockerfile:1
FROM node:latest

WORKDIR /api

# copie apenas package files e instale (permitir gerar prisma)
COPY package*.json ./
RUN npm install --no-audit --no-fund

# copie o schema do prisma e gere o client
COPY prisma ./prisma
RUN npx prisma generate

# depois copie o resto do código e, se houver build, rode build
COPY . .

# se seu projeto tem build TS, rode aqui (opcional)
RUN npm run build || true

EXPOSE 3001

# mantém seu comando atual; se tiver start:prod use-o
CMD ["npm", "run", "start"]
