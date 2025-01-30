# Baixa a imagem alpine do node v21
FROM node:21-alpine

# Caminho da pasta da aplicação
WORKDIR /home/node/app/

# Copiando para o container os arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar o pnpm
RUN npm i -g pnpm

# Instalar as dependências
RUN pnpm i

# Copiando os demais arquivos para o container
COPY . .

CMD ["pnpm", "run", "start:dev"]