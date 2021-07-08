## 🚀 Começando

  

Primeiro de tudo, você têm que ter o `node` e `yarn`(or `npm`) instalado na sua máquina.

  
Se você decidir usar npm, não esqueça de deletar yarn.lock no projeto
  

Então você pode clonar o repositório.
  

`git clone https:https://github.com/rafapaivadeandrade/FullStackModulesClassesServer`

  
Começando pela aplicação server

1. Deletar o arquivo db.sqlite da pasta database

2. `yarn` ou `npm install`

3. yarn knex:migrate ou npm knex:migrate(Criar tabelas)

4. yarn knex:seed ou npm knex:seed(Inserir informações dentro das tabelas) 

5. `yarn dev` or `npm run dev`

Opicional(yarn knex:migrate:rollback ou npm knex:migrate:rollback) = Para quando estiver criado algum banco de dado errado.
