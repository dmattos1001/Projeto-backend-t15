<h1 align="center">
  Projeto final M4 T15
</h1>

<h2 align="center">
  API Doc
</h2>

<p align="center">
  <a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

## **Endpoints**

Esta API tem um total de 30 endpoints para o controle de estoque de hardwares.

A base url da API é https://estoque-t15.herokuapp.com

## Rotas que não necessitam de autenticação


<h2 align ='center'> Logando usuário </h2>

`POST /login - Formato da requisição`
```json
{
	"cpf": "06053245625",
	"password": "Teste123*"
}
```

`POST /login -  Formato da resposta - STATUS 200`
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdGlvbk5pdmVsIjozLCJpYXQiOjE2NjI3MjkwODUsImV4cCI6MTY2MjczNjI4NSwic3ViIjoiMjk2YWExYjUtODE0MC00ZGU0LTljYzMtMzZkNGU2MWY2NWQ5In0.xU7QS2TznT0TSISrnHWzZ67l0Oa5dXRTmqiIYi2Pa_s"
}
```

O token gerado no login será utilizado para autenticação das demais rotas.

## Rotas que necessitam de autenticação

O token deverá ser informado no header da requisição no formato: 
```js
"Authorization": `Bearer token`
```

<h2 align ='center'> Criando usuário </h2>

<ul>
<li>A senha deve conter ao menos uma letra maiúscula, minúscula, número e um caractere espercial</li>
</ul>

`POST /users - Formato da requisição`

```json
{
  "name": "hitalo",
  "email": "hitaloMenorLucas@gmail.com",
  "password": "Teste123*",
  "cpf": "06053245625",
  "administrationNivel": 3,
  "occupation": "senior",
  "telephone": "6133658755",
  "cell": "61994133544",
  "address": {
    "district": "Rua Heleodo Pires de camargo",
    "zipCode": "72215093",
    "number": "67",
    "city": "Piedade",
    "state": "SP"
  }
}
```
O administrationNivel definirá quais rotas o usuário terá acesso, deve ser entre 1 e 3.

`POST /users - Formato da resposta - STATUS 201 CREATED:`

```json
{
	"name": "hitalo",
	"cpf": "06053245625",
	"email": "hitaloMenorLucas@gmail.com",
	"password": "$2a$10$MFMtY8yEn/rEgO9Mdk1rnusOL/jF95C.0Qq25jGRoqJX9o9aTU.p6",
	"administrationNivel": 3,
	"occupation": "senior",
	"telephone": "6133658755",
	"cell": "61994133544",
	"address": {
		"id": "02a8faeb-c0a2-493f-814e-256bb9c88dc8",
		"district": "Rua Heleodo Pires de camargo",
		"zipCode": "72215093",
		"number": "67",
		"city": "Piedade",
		"state": "SP"
	},
	"id": "296aa1b5-8140-4de4-9cc3-36d4e61f65d9",
	"contractDate": "2022-09-09T13:09:14.874Z",
	"isActive": true
}
```

<h2 align ='center'> Listando usuários </h2>

`GET /users - Formato da resposta - STATUS 200`

```json
[
	{
		"id": "296aa1b5-8140-4de4-9cc3-36d4e61f65d9",
		"name": "hitalo",
		"cpf": "06053245625",
		"email": "hitaloMenorLucas@gmail.com",
		"password": "$2a$10$MFMtY8yEn/rEgO9Mdk1rnusOL/jF95C.0Qq25jGRoqJX9o9aTU.p6",
		"contractDate": "2022-09-09T13:09:14.874Z",
		"administrationNivel": 3,
		"isActive": true,
		"occupation": "senior",
		"telephone": "6133658755",
		"cell": "61994133544",
		"address": {
			"id": "02a8faeb-c0a2-493f-814e-256bb9c88dc8",
			"district": "Rua Heleodo Pires de camargo",
			"zipCode": "72215093",
			"number": "67",
			"city": "Piedade",
			"state": "SP"
		}
	}
]
```
Necessário administrationNivel 3

<h2 align ='center'> Listando um usuário </h2>

`GET /users/:id - Formato da resposta - STATUS 200`

```json
{
	"id": "296aa1b5-8140-4de4-9cc3-36d4e61f65d9",
	"name": "hitalo",
	"cpf": "06053245625",
	"email": "hitaloMenorLucas@gmail.com",
	"password": "$2a$10$MFMtY8yEn/rEgO9Mdk1rnusOL/jF95C.0Qq25jGRoqJX9o9aTU.p6",
	"contractDate": "2022-09-09T13:09:14.874Z",
	"administrationNivel": 3,
	"isActive": true,
	"occupation": "senior",
	"telephone": "6133658755",
	"cell": "61994133544",
	"address": {
		"id": "02a8faeb-c0a2-493f-814e-256bb9c88dc8",
		"district": "Rua Heleodo Pires de camargo",
		"zipCode": "72215093",
		"number": "67",
		"city": "Piedade",
		"state": "SP"
	}
}
```
Necessário administrationNivel 3

<h2 align ='center'> Deletando um usuário </h2>

`DELETE /users/:id - Formato da resposta - STATUS 204`

Está rota dá um soft delete no usuário alterando o isActive para false

Necessário administrationNivel 3

<h2 align ='center'> Editando um usuário </h2>

`PATCH /users/:id  Formato da requisição`

```json
  {
	"name": "Hitalo Kenzie"
}
```

`PATCH /users/:id - Formato da resposta - STATUS 200`

```json
{
	"id": "296aa1b5-8140-4de4-9cc3-36d4e61f65d9",
	"name": "Hitalo Kenzie",
	"cpf": "06053245625",
	"email": "hitaloMenorLucas@gmail.com",
	"password": "$2a$10$MFMtY8yEn/rEgO9Mdk1rnusOL/jF95C.0Qq25jGRoqJX9o9aTU.p6",
	"contractDate": "2022-09-09T13:09:14.874Z",
	"administrationNivel": 3,
	"isActive": true,
	"occupation": "senior",
	"telephone": "6133658755",
	"cell": "61994133544",
	"address": {
		"id": "02a8faeb-c0a2-493f-814e-256bb9c88dc8",
		"district": "Rua Heleodo Pires de camargo",
		"zipCode": "72215093",
		"number": "67",
		"city": "Piedade",
		"state": "SP"
	}
}
```
Necessário administrationNivel 3

<h2 align ='center'> Listando acessos de usuários </h2>

`GET /accesslog - Formato da resposta - STATUS 200`

```json
[
	{
		"id": "61aabe15-6d84-4b4e-a379-14a7f76f142a",
		"accessDate": "2022-09-09T18:14:17.150Z",
		"user": {
			"id": "296aa1b5-8140-4de4-9cc3-36d4e61f65d9",
			"name": "Hitalo Silva",
			"cpf": "06053245625",
			"email": "hitaloMenorLucas@gmail.com",
			"password": "$2a$10$MFMtY8yEn/rEgO9Mdk1rnusOL/jF95C.0Qq25jGRoqJX9o9aTU.p6",
			"contractDate": "2022-09-09T13:09:14.874Z",
			"administrationNivel": 3,
			"isActive": true,
			"occupation": "senior",
			"telephone": "6133658755",
			"cell": "61994133544",
			"address": {
				"id": "02a8faeb-c0a2-493f-814e-256bb9c88dc8",
				"district": "Rua Heleodo Pires de camargo",
				"zipCode": "72215093",
				"number": "67",
				"city": "Piedade",
				"state": "SP"
			}
		}
	}
]
```
Necessário administrationNivel 3

<h2 align ='center'> Listando um acesso de usuário </h2>

`GET /accesslog/:id - Formato da resposta - STATUS 200`

```json
{
	"id": "61aabe15-6d84-4b4e-a379-14a7f76f142a",
	"accessDate": "2022-09-09T18:14:17.150Z",
	"user": {
		"id": "296aa1b5-8140-4de4-9cc3-36d4e61f65d9",
		"name": "Hitalo Silva",
		"cpf": "06053245625",
		"email": "hitaloMenorLucas@gmail.com",
		"password": "$2a$10$MFMtY8yEn/rEgO9Mdk1rnusOL/jF95C.0Qq25jGRoqJX9o9aTU.p6",
		"contractDate": "2022-09-09T13:09:14.874Z",
		"administrationNivel": 3,
		"isActive": true,
		"occupation": "senior",
		"telephone": "6133658755",
		"cell": "61994133544",
		"address": {
			"id": "02a8faeb-c0a2-493f-814e-256bb9c88dc8",
			"district": "Rua Heleodo Pires de camargo",
			"zipCode": "72215093",
			"number": "67",
			"city": "Piedade",
			"state": "SP"
		}
	}
}
```
Necessário administrationNivel 3

<h2 align ='center'> Listando um acesso de um usuário </h2>

`GET /accesslog/user/:id - Formato da resposta - STATUS 200`

```json
[
	{
		"id": "f873f62c-9417-4870-8b2b-0670b8e23b43",
		"accessDate": "2022-09-14T18:23:57.469Z",
		"user": {
			"id": "359380f1-5be8-45dd-9b48-4d76f3e53003",
			"name": "hitalo",
			"cpf": "98765432112123",
			"email": "teste@gmail.com",
			"password": "$2a$10$F0Tl5.HgbmpQcYc2vORHMe35M3QF2YwyD27SwjCfQIL781es5WQaK",
			"contractDate": "2022-09-14T13:25:17.359Z",
			"administrationNivel": 3,
			"isActive": true,
			"occupation": "senior",
			"telephone": "6133658755",
			"cell": "61994133544",
			"address": {
				"id": "9939c7f8-c06d-4f6d-a300-3362dcc81731",
				"district": "Rua Heleodo Pires de camargo",
				"zipCode": "72215093",
				"number": "67",
				"city": "Piedade",
				"state": "SP"
			}
		}
	}
]
```
Necessário administrationNivel 3

<h2 align ='center'> Criando categoria </h2>

`POST /category - Formato da requisição`

```json
{
	"name": "placas",
  "description": "placas em geral"
}
```

`POST /category - Formato da resposta - STATUS 201 CREATED`

```json
{
	"name": "placas",
	"description": "placas em geral",
	"id": "d7263002-5730-439a-8f19-15f8a642ed10"
}
```
Necessário administrationNivel 2+

<h2 align ='center'> Listando categorias </h2>

`GET /category - Formato da resposta - STATUS 200`

```json
[
	{
		"id": "d7263002-5730-439a-8f19-15f8a642ed10",
		"name": "placas",
		"description": "placas em geral"
	}
]
```
Necessário administrationNivel 2+

<h2 align ='center'> Listando uma categoria </h2>

`GET /category/:id - Formato da resposta - STATUS 200`

```json
{
	"id": "d7263002-5730-439a-8f19-15f8a642ed10",
	"name": "placas",
	"description": "placas em geral",
	"product": [
		{
			"id": "2b0c98da-39f5-4fcc-9115-6698b15b96cf",
			"name": "placa de video",
			"description": "sdsdsdsdsd",
			"isActive": true,
			"value": 5050,
			"saleValue": 6500,
			"stock": 5,
			"criticalStock": 2,
			"provider": {
				"id": "857f7533-26a3-4175-a6aa-1188df27de63",
				"name": "Megabyte",
				"telephone": "1333240499",
				"email": "megaByte@mail.com",
				"cnpj": "63519017/0001-70",
				"address": "Rua Candido Rodrigues - 1082, Centro, São Vicente - SP",
				"employee": "Larissa Regina Sales",
				"employeeCell": "1333240499"
			},
			"category": {
				"id": "d7263002-5730-439a-8f19-15f8a642ed10",
				"name": "placas",
				"description": "placas em geral"
			}
		}
	]
}
```
Necessário administrationNivel 2+

<h2 align ='center'> Criando um provider </h2>

`POST /provider - Formato da requisição`

```json
{
  "name": "Megabyte",
  "telephone": "1333240499",
  "email": "megaByte@mail.com",
  "cnpj": "63519017/0001-70",
  "address": "Rua Candido Rodrigues - 1082, Centro, São Vicente - SP",
  "employee": "Larissa Regina Sales",
  "employeeCell": "1333240499"
}
```

`POST /provider - Formato da resposta - STATUS 201 CREATED`

```json
{
	"name": "Megabyte",
	"telephone": "1333240499",
	"email": "megaByte@mail.com",
	"cnpj": "63519017/0001-70",
	"address": "Rua Candido Rodrigues - 1082, Centro, São Vicente - SP",
	"employee": "Larissa Regina Sales",
	"employeeCell": "1333240499",
	"id": "857f7533-26a3-4175-a6aa-1188df27de63"
}
```
Necessário administrationNivel 3

<h2 align ='center'> Listar providers </h2>

`GET /provider - Formato da resposta - STATUS 200`

```json
[
	{
		"id": "857f7533-26a3-4175-a6aa-1188df27de63",
		"name": "Megabyte",
		"telephone": "1333240499",
		"email": "megaByte@mail.com",
		"cnpj": "63519017/0001-70",
		"address": "Rua Candido Rodrigues - 1082, Centro, São Vicente - SP",
		"employee": "Larissa Regina Sales",
		"employeeCell": "1333240499"
	}
]
```
Necessário administrationNivel 2+

<h2 align ='center'> Listar um provider </h2>

`GET /provider/:id - Formato da resposta - STATUS 200`

```json
{
	"id": "857f7533-26a3-4175-a6aa-1188df27de63",
	"name": "Megabyte",
	"telephone": "1333240499",
	"email": "megaByte@mail.com",
	"cnpj": "63519017/0001-70",
	"address": "Rua Candido Rodrigues - 1082, Centro, São Vicente - SP",
	"employee": "Larissa Regina Sales",
	"employeeCell": "1333240499"
}
```
Necessário administrationNivel 2+

<h2 align ='center'> Criar um product </h2>

`POST /product - Formato da requisição`

```json
{
	"name": "placa de video",
  "description": "sdsdsdsdsd",
  "value": 5050,
  "saleValue": 6500,
  "stock": 5,
  "criticalStock": 2,
  "provider": "857f7533-26a3-4175-a6aa-1188df27de63",
  "category": "d7263002-5730-439a-8f19-15f8a642ed10"
}
```

`POST /product - Formato da resposta - STATUS 201 CREATED`

```json
{
	"name": "placa de video",
	"description": "sdsdsdsdsd",
	"value": 5050,
	"saleValue": 6500,
	"stock": 5,
	"criticalStock": 2,
	"provider": {
		"id": "857f7533-26a3-4175-a6aa-1188df27de63",
		"name": "Megabyte",
		"telephone": "1333240499",
		"email": "megaByte@mail.com",
		"cnpj": "63519017/0001-70",
		"address": "Rua Candido Rodrigues - 1082, Centro, São Vicente - SP",
		"employee": "Larissa Regina Sales",
		"employeeCell": "1333240499"
	},
	"category": {
		"id": "d7263002-5730-439a-8f19-15f8a642ed10",
		"name": "placas",
		"description": "placas em geral"
	},
	"id": "2b0c98da-39f5-4fcc-9115-6698b15b96cf",
	"isActive": true
}
```
Necessário administrationNivel 3

<h2 align ='center'> Listar products </h2>

`GET /product - Formato da resposta - STATUS 200`

```json
[
	{
		"id": "2b0c98da-39f5-4fcc-9115-6698b15b96cf",
		"name": "placa de video",
		"description": "sdsdsdsdsd",
		"isActive": true,
		"value": 5050,
		"saleValue": 6500,
		"stock": 5,
		"criticalStock": 2,
		"provider": {
			"id": "857f7533-26a3-4175-a6aa-1188df27de63",
			"name": "Megabyte",
			"telephone": "1333240499",
			"email": "megaByte@mail.com",
			"cnpj": "63519017/0001-70",
			"address": "Rua Candido Rodrigues - 1082, Centro, São Vicente - SP",
			"employee": "Larissa Regina Sales",
			"employeeCell": "1333240499"
		},
		"category": {
			"id": "d7263002-5730-439a-8f19-15f8a642ed10",
			"name": "placas",
			"description": "placas em geral"
		}
	}
]
```
Necessário administrationNivel 2+

<h2 align ='center'> Listar um product </h2>

`GET /product/:id - Formato da resposta - STATUS 200` 

```json
{
	"id": "2b0c98da-39f5-4fcc-9115-6698b15b96cf",
	"name": "placa de video",
	"description": "sdsdsdsdsd",
	"isActive": true,
	"value": 5050,
	"saleValue": 6500,
	"stock": 5,
	"criticalStock": 2,
	"provider": {
		"id": "857f7533-26a3-4175-a6aa-1188df27de63",
		"name": "Megabyte",
		"telephone": "1333240499",
		"email": "megaByte@mail.com",
		"cnpj": "63519017/0001-70",
		"address": "Rua Candido Rodrigues - 1082, Centro, São Vicente - SP",
		"employee": "Larissa Regina Sales",
		"employeeCell": "1333240499"
	},
	"category": {
		"id": "d7263002-5730-439a-8f19-15f8a642ed10",
		"name": "placas",
		"description": "placas em geral"
	}
}
```
Necessário administrationNivel 2+

<h2 align ='center'> Listar produtos com estoque crítico </h2>

`GET /product/criticalstock - Formato da resposta - STATUS 200`

```json
[
	{
		"id": "4ca4bc08-6aa0-44e9-bb3b-64d733abd98d",
		"name": "placa de video",
		"description": "sdsdsdsdsd",
		"isActive": true,
		"value": 5050,
		"saleValue": 6500,
		"stock": 1,
		"criticalStock": 2,
		"provider": {
			"id": "bad54751-ca51-46a5-a64c-3807cc19c263",
			"name": "Megabyte",
			"telephone": "1333240499",
			"email": "megaByte@mail.com",
			"cnpj": "63519017/0001-70",
			"address": "Rua Candido Rodrigues - 1082, Centro, São Vicente - SP",
			"employee": "Larissa Regina Sales",
			"employeeCell": "1333240499"
		},
		"category": {
			"id": "76ea0936-e950-4947-9d3e-9e5276b4619e",
			"name": "placas",
			"description": "placas em geral"
		}
	}
]
```
Necessário administrationNivel 2+

<h2 align ='center'> Deletar product </h2>
<ul>
	<li>O produto será permanentemente deletado em 7 dias</li>
</ul>

`DELETE /product/:id - Formato da resposta - STATUS 200`

```json
{
	"message": "Product will be permanently deleted in 7 days"
}
```
Necessário administrationNivel 3

<h2 align ='center'> Criar productEntry </h2>

`POST /productEntry - Formato da requisição`

```json
{
  "name": "placa de video",
  "quantity": 15,
  "productsId": "2b0c98da-39f5-4fcc-9115-6698b15b96cf",
  "providerId": "857f7533-26a3-4175-a6aa-1188df27de63"
}
```

`POST /productEntry - Formato da resposta - STATUS 201 CREATED`

```json
{
	"name": "placa de video",
	"quantity": 20,
	"productsId": "2b0c98da-39f5-4fcc-9115-6698b15b96cf",
	"userId": "296aa1b5-8140-4de4-9cc3-36d4e61f65d9",
	"providerId": "857f7533-26a3-4175-a6aa-1188df27de63"
}
```
Necessário administrationNivel 3

<h2 align ='center'> Listar productEntry </h2>

`GET /productentry - Formato da resposta - STATUS 200` 

```json
[
	{
		"id": "82f4d7f6-b824-4a43-bba7-72cc1a4e7977",
		"name": "placa de video",
		"receivedD": "2022-09-09",
		"quantity": 15,
		"user": {
			"id": "296aa1b5-8140-4de4-9cc3-36d4e61f65d9",
			"name": "Hitalo Silva",
			"cpf": "06053245625",
			"email": "hitaloMenorLucas@gmail.com",
			"password": "$2a$10$MFMtY8yEn/rEgO9Mdk1rnusOL/jF95C.0Qq25jGRoqJX9o9aTU.p6",
			"contractDate": "2022-09-09T13:09:14.874Z",
			"administrationNivel": 3,
			"isActive": true,
			"occupation": "senior",
			"telephone": "6133658755",
			"cell": "61994133544",
			"address": {
				"id": "02a8faeb-c0a2-493f-814e-256bb9c88dc8",
				"district": "Rua Heleodo Pires de camargo",
				"zipCode": "72215093",
				"number": "67",
				"city": "Piedade",
				"state": "SP"
			}
		},
		"product": {
			"id": "2b0c98da-39f5-4fcc-9115-6698b15b96cf",
			"name": "placa de video",
			"description": "sdsdsdsdsd",
			"isActive": true,
			"value": 5050,
			"saleValue": 6500,
			"stock": 5,
			"criticalStock": 2,
			"provider": {
				"id": "857f7533-26a3-4175-a6aa-1188df27de63",
				"name": "Megabyte",
				"telephone": "1333240499",
				"email": "megaByte@mail.com",
				"cnpj": "63519017/0001-70",
				"address": "Rua Candido Rodrigues - 1082, Centro, São Vicente - SP",
				"employee": "Larissa Regina Sales",
				"employeeCell": "1333240499"
			},
			"category": {
				"id": "d7263002-5730-439a-8f19-15f8a642ed10",
				"name": "placas",
				"description": "placas em geral"
			}
		}
	}
]
```
Necessário administrationNivel 2+

<h2 align ='center'> Listar um productEntry </h2>

`GET /productentry/:id - Formato da resposta - STATUS 200`

```json
{
	"id": "82f4d7f6-b824-4a43-bba7-72cc1a4e7977",
	"productId": "2b0c98da-39f5-4fcc-9115-6698b15b96cf",
	"name": "placa de video",
	"quantity": 15,
	"providerId": "857f7533-26a3-4175-a6aa-1188df27de63",
	"userId": "296aa1b5-8140-4de4-9cc3-36d4e61f65d9"
}
```
Necessário administrationNivel 2+

<h2 align ='center'> Criar outputProduct </h2>

`POST /outputproducts - Formato da requisição`

```json
{
"name": "Placa de video",
"descriptio": "RTX 3080 4GB",
"quantity": 1,
"productId": "2b0c98da-39f5-4fcc-9115-6698b15b96cf" 
}
```

`POST /outputproducts - Formato da resposta - STATUS 201 CREATED`

```json
{
	"id": "9482c90b-8c2c-487c-b839-a97dca07404f",
	"name": "Placa de video",
	"descriptio": "RTX 3080 4GB",
	"quantity": "1",
	"userId": "296aa1b5-8140-4de4-9cc3-36d4e61f65d9",
	"productId": "2b0c98da-39f5-4fcc-9115-6698b15b96cf"
}
```
Necessário administrationNivel 3

<h2 align ='center'> Listar outputProducts </h2>

`GET /outputproducts - Formato da resposta - STATUS 200`

```json
[
	{
		"id": "9482c90b-8c2c-487c-b839-a97dca07404f",
		"name": "Placa de video",
		"descriptio": "RTX 3080 4GB",
		"quantity": 1,
		"outputdate": "2022-09-13T13:06:56.205Z",
		"user": {
			"id": "296aa1b5-8140-4de4-9cc3-36d4e61f65d9",
			"name": "Hitalo Silva",
			"cpf": "06053245625",
			"email": "hitaloMenorLucas@gmail.com",
			"password": "$2a$10$MFMtY8yEn/rEgO9Mdk1rnusOL/jF95C.0Qq25jGRoqJX9o9aTU.p6",
			"contractDate": "2022-09-09T13:09:14.874Z",
			"administrationNivel": 3,
			"isActive": true,
			"occupation": "senior",
			"telephone": "6133658755",
			"cell": "61994133544",
			"address": {
				"id": "02a8faeb-c0a2-493f-814e-256bb9c88dc8",
				"district": "Rua Heleodo Pires de camargo",
				"zipCode": "72215093",
				"number": "67",
				"city": "Piedade",
				"state": "SP"
			}
		},
		"product": {
			"id": "2b0c98da-39f5-4fcc-9115-6698b15b96cf",
			"name": "placa de video",
			"description": "sdsdsdsdsd",
			"isActive": true,
			"value": 5050,
			"saleValue": 6500,
			"stock": 4,
			"criticalStock": 2,
			"provider": {
				"id": "857f7533-26a3-4175-a6aa-1188df27de63",
				"name": "Megabyte",
				"telephone": "1333240499",
				"email": "megaByte@mail.com",
				"cnpj": "63519017/0001-70",
				"address": "Rua Candido Rodrigues - 1082, Centro, São Vicente - SP",
				"employee": "Larissa Regina Sales",
				"employeeCell": "1333240499"
			},
			"category": {
				"id": "d7263002-5730-439a-8f19-15f8a642ed10",
				"name": "placas",
				"description": "placas em geral"
			}
		}
	}
]
```
Necessário administrationNivel 2+

<h2 align ='center'> Listar um outputProduct </h2>

`GET /outputproduct/:id - Formato da resposta - STATUS 200`

```json
{
	"id": "9482c90b-8c2c-487c-b839-a97dca07404f",
	"name": "Placa de video",
	"descriptio": "RTX 3080 4GB",
	"quantity": 1,
	"outputdate": "2022-09-13T13:06:56.205Z",
	"user": {
		"id": "296aa1b5-8140-4de4-9cc3-36d4e61f65d9",
		"name": "Hitalo Silva",
		"cpf": "06053245625",
		"email": "hitaloMenorLucas@gmail.com",
		"password": "$2a$10$MFMtY8yEn/rEgO9Mdk1rnusOL/jF95C.0Qq25jGRoqJX9o9aTU.p6",
		"contractDate": "2022-09-09T13:09:14.874Z",
		"administrationNivel": 3,
		"isActive": true,
		"occupation": "senior",
		"telephone": "6133658755",
		"cell": "61994133544",
		"address": {
			"id": "02a8faeb-c0a2-493f-814e-256bb9c88dc8",
			"district": "Rua Heleodo Pires de camargo",
			"zipCode": "72215093",
			"number": "67",
			"city": "Piedade",
			"state": "SP"
		}
	},
	"product": {
		"id": "2b0c98da-39f5-4fcc-9115-6698b15b96cf",
		"name": "placa de video",
		"description": "sdsdsdsdsd",
		"isActive": true,
		"value": 5050,
		"saleValue": 6500,
		"stock": 4,
		"criticalStock": 2,
		"provider": {
			"id": "857f7533-26a3-4175-a6aa-1188df27de63",
			"name": "Megabyte",
			"telephone": "1333240499",
			"email": "megaByte@mail.com",
			"cnpj": "63519017/0001-70",
			"address": "Rua Candido Rodrigues - 1082, Centro, São Vicente - SP",
			"employee": "Larissa Regina Sales",
			"employeeCell": "1333240499"
		},
		"category": {
			"id": "d7263002-5730-439a-8f19-15f8a642ed10",
			"name": "placas",
			"description": "placas em geral"
		}
	}
}
```
Necessário administrationNivel 2+

<h2 align ='center'> Criar productOrder </h2>

`POST /productOrder - Formato da requisição`

```json
{
  "name": "Placa de video",
  "quantityOfProducts": 1,
  "product": "2b0c98da-39f5-4fcc-9115-6698b15b96cf",
  "user": "296aa1b5-8140-4de4-9cc3-36d4e61f65d9"
}
```

`POST /productOrder - Formato da resposta - 201 CREATED`

```json

```
Necessário administrationNivel 3

<h2 align ='center'> Listar product Order </h2>

`GET /productOrder - Formato da resposta - STATUS 200`

```json

```

Necessário administrationNivel 2+

<h2 align ='center'> Listar um product Order </h2>

`GET /productOrder/:id - Formato da resposta - STATUS 200`

```json

```
Necessário administrationNivel 2+

<h2 align ='center'> Deletar um product Order </h2>

`DELETE /productOrder/:id - Formato da resposta - STATUS 200`

```json

```
Necessário administrationNivel 3
