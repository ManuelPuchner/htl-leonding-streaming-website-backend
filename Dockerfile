FROM node:16
ARG DATABASE_URL
ARG AUTH_SECRET_KEY

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./


RUN npm ci

COPY . .

COPY tsconfig.json ./

ENV DATABASE_URL=$DATABASE_URL
ENV AUTH_SECRET_KEY=$AUTH_SECRET_KEY

RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]

