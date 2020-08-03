Informações da API Notícias

-> Implementei validação de usuário utilizando JWT, porém não consegui terminar a implementação do frontend para executar desta forma, 
portanto desabilitei a validação do token na API de CRUD de notícias.

Abaixo seguem informações para iniciar localmente.

Prequisitos:

NodeJS 10.16.3
npm 6.9.0
MongoDB
Instalar Dependências: npm install
Iniciar a API: nodemon loader.js / node loader.js

Swagger: http://localhost:3001/api-docs

Endpoints:

Criação de Usuário POST - http://localhost:3000/api/signup

Autenticação de Usuário
POST - http://localhost:3001/api/login

Incluir Noticia
POST - http://localhost:3001/api/noticias

Incluir Noticia
PUT - http://localhost:3001/api/noticias/{:id}

Excluir Noticia
DELETE - http://localhost:3001/api/noticias/{:id}

Consultar Noticia por ID
GET - http://localhost:3001/api/noticias/{:id}

Listar Planeta
GET - http://localhost:3000/api/planetas
http://localhost:3000/api/planetas/?page=[numero da pagina]
