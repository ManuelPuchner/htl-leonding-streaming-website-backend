FROM node:16

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./


RUN npm ci

COPY dist/ ./dist/

COPY .tsconfig.json ./


RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]

