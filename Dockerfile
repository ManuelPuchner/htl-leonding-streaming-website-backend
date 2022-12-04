FROM node:16

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./


RUN npm ci

COPY . .

COPY .tsconfig.json ./


RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
