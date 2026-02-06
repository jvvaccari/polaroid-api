# syntax=docker/dockerfile:1
FROM node:latest

WORKDIR /api

# copie package files e schema do prisma primeiro
COPY package*.json ./
COPY prisma ./prisma

# instale dependências e gere o client do prisma
RUN npm install

# depois copie o resto do código e, se houver build, rode build
COPY . .

# se seu projeto tem build TS, rode aqui (opcional)
RUN npm run build || true

EXPOSE 3001

# mantém seu comando atual; se tiver start:prod use-o
CMD ["npm", "run", "start"]
