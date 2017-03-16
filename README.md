# Projeto base Mean Stack #

Esse projeto contém uma estrutura básica para um projeto com a M.E.A.N. stack 
(MongoDB, Express, AngularJS e Node.JS).

## Estrutura do Projeto ##

O projeto é estruturado em pastas:
* client - Contém os arquivos do lado cliente (que vão para o browser do usuário), esses arquivos serão processados (agrupados, minificados, comprimidos) e enviados para a pasta build;
* public - Arquivos estáticos do lado cliente (páginas HTML, folhas de estilo, imagens);
* server - Scripts do servidor.

## Construindo o Projeto ##

Clone (ou descompacte) o projeto em uma pasta e digite no terminal:

```bash
npm i
npm run build
npm start
```

Após isso, abra o endereço `http://localhost:3000` em um navegador moderno.