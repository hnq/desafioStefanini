# desafioStefanini

Criar Docker para mySQL
docker run --name some-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest


build do projeto 
node_modules/.bin/babel src -d build --copy-files --no-copy-ignored --verbose

Comandos yarn
yarn add pacote_nome

iniciar projeto 
yarn start:dev

//criar o banco
yarn sequelize db:migrate

banco: mysql
name: test

EndPoints:

PUT http://localhost:4000/v1/todos/1
body:
{
    "todolabel": "Update Todo Label"
}

++++++++++++++++++++++++++++++++++++++++++++

POST http://localhost:4000/v1/todos
body:

{
    "user_id": 1,
    "todolabel": "Test of todolabel"
}

++++++++++++++++++++++++++++++++++++++++++++

GET BY ID http://localhost:4000/v1/todos?todolabel=update

++++++++++++++++++++++++++++++++++++++++++++

GET LIST http://localhost:4000/v1/todos

++++++++++++++++++++++++++++++++++++++++++++

DELETE http://localhost:4000/v1/todos/1
