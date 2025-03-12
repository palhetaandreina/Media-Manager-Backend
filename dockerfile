# Baixa a imagem alpine do node v21
FROM node:21-alpine

# Caminho da pasta da aplicação
WORKDIR /home/node/app/

# Install chromium dependencies and chromium browser
RUN apk update && apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ttf-freefont \
  ca-certificates \
  fontconfig \
  && rm -rf /var/cache/apk/*

# Set the path for chromium to be available in the system path
ENV CHROME_BIN=/usr/bin/chromium

# Copiando para o container os arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar o pnpm
RUN npm i -g pnpm

# Instalar cli do nest
RUN npm i -g @nestjs/cli 

# Instalar as dependências
RUN pnpm i

# Copiando os demais arquivos para o container
COPY . .

CMD ["pnpm", "run", "start:dev"]