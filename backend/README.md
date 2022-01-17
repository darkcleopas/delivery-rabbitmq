<p align="center">

  <h3 align="center">Market SD</h3>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Lincense&message=MIT&color=0000ff " alt="License" />
</p>

<p align="center">
    Este projeto vale nota parcial da cadeira de Sistemas Distribuídos
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->
## 🗂 Table of Contents

* [Sobre o projeto](#book-sobre-o-projeto)
* [Instalação](#bricks-instalação)
  * [Pré-requisitos](#construction-pre-requisitos)
  * [Instalando dependências](#construction-instalando-dependencias)
  * [Rodando o Projeto](#arrow_forward-rodando-o-projeto)
  * [RabbitMQ](#arrow_forward-rabbitmq)
* [Documentação](#bookmark_tabs-documentacao)
* [Deploy](#arrow_forward-deploy)
* [Licença](#page_facing_up-licença)
* [Autores](#woman_technologist-man_technologist-autores)

## :book: Sobre o projeto

Foi proposto a criação de um projeto em Node.js com MQTT que simulasse um sistema de supermercado delivery com as operações:  

  - [x] Listar os produtos disponível
  - [x] Colocar um produto no carrinho
  - [x] Remover um produto do carrinho
  - [x] Pagar o pedido
  - [x] Solicitar a entrega

## :bricks: Instalação

Este projeto usa [Node.js](https://nodejs.org/en/) e[Yarn](https://yarnpkg.com), você precisará deles para instalar as dependências. Ao final deste tópico está as instruções para testar com o projeto "deployado".

### :construction: Pré-requisitos

Clone este repositório:
```bash

$ git clone https://github.com/DarkCleopas/delivery-rabbitmq.git

# Entre na pasta `delivery-rabbitmq/backend`:

$ cd delivery-rabbitmq/backend
```

🚨 Se você não possui git instalado em sua máquina, você pode instalá-lo [aqui](https://git-scm.com/downloads).
🚨 Se você não possui docker instalado em sua máquina, você pode instalá-lo [aqui](https://docs.docker.com/engine/install/).


### :construction: Instalando dependências

Na pasta delivery-rest, instale as dependências pelo seguinte comando:

```bash
$ yarn install
```

### :arrow_forward: Rodando o Projeto

Rode os seguintes comando:

```bash

# Para o servidor

$ yarn start

```

A aplicação funcionará em `http://localhost:4000`.

### :arrow_forward: RabbitMQ

Para ativar o broker RabbitMQ, rode esse comando docker `docker run -d -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management`. Após isso, rode o arquivo `subscriber.js`. 
A cada finalização de pedido feita (`/finish_orders`), será mostrado uma nova atualização no subscriber (além dos pedidos feitos anteriormente), assim:
```bash
Conectado ao broker RabbitMQ
 [*] Esperando por pedidos em delivery-rabbitmq.
Um novo pedido apareceu!
{
  orders: [
    {
      productId: 2,
      productName: 'Café',
      productPrice: 14.9,
      productAmount: 3,
      orderValue: 44.7
    }
  ],
  ordersValue: 44.7,
  address: 'Rua das Mangas Azedas'
}
```

## :bookmark_tabs: Documentação

- Listar produtos
  
  > GET /products

  Retorna um JSON com a lista de produtos cadastrados

    ```json
    [
        {
            "id": 1,
            "name": "Água",
            "price": 1.9,
            "category": "BEBIDAS"
        },
        {
            "id": 2,
            "name": "Café",
            "price": 14.9,
            "category": "BEBIDAS"
        },
        {
            "id": 3,
            "name": "Nikito",
            "price": 2,
            "category": "LANCHES"
        },
        {
            "id": 4,
            "name": "Fini",
            "price": 4.45,
            "category": "LANCHES"
        },
        {
            "id": 5,
            "name": "Arroz",
            "price": 17.89,
            "category": "ALIMENTOS"
        },
        {
            "id": 6,
            "name": "Feijão",
            "price": 6.9,
            "category": "ALIMENTOS"
        }
    ]
    ```
- Fazer um pedido
  
  > POST /add_order

  Envia uma requisição no seguinte formato:

    ```json
    {
        "productId": 3,
        "productAmount": 1
    }
    ```

  E retorna a seguinte resposta:

    ```json
    {
        "productId": 3,
        "productName": "Nikito",
        "productPrice": 2,
        "productAmount": 1,
        "orderValue": 2
    }
    ```

- Remover um pedido

  > DELETE /remove_order

  Envia uma requisição no seguinte formato:

  ```json

    {
        "productId": 5
    }

  ```

  E recebe uma nova lista de pedidos.

- Consultar os pedidos no carrinho

  > GET /orders

  Retorna um JSON com a lista de pedidos no carrinho:

  ```json
    [
        {
            "productId": 1,
            "productName": "Água",
            "productPrice": 1.9,
            "productAmount": 2,
            "orderValue": 3.8
        },
        {
            "productId": 5,
            "productName": "Arroz",
            "productPrice": 17.89,
            "productAmount": 1,
            "orderValue": 17.89
        }
    ]
  ```

- Consultar o valor total do carrinho

  > GET /orders_value

  Retorna um JSON com o valor do carrinho:

  ```json
    {
        "ordersValue": 21.69
    }
  ```

- Esvaziar o carrinho e solicitar entrega

  > POST /finish_orders

  Envia uma requisição no seguinte formato:

  ```json

  {
    "address": "Ceilandia, em frente ao lote 14"
  }

  ```

  E retorna status 200.


## ▶️ Deploy

Foi feito o deploy deste projeto no Heroku. Você pode usar essa url `https://darkcleopas-delivery-rabbitmq.herokuapp.com/` para realizar os testes sem precisar rodar a api principal. Porém, não foi possível rodar uma instância do RabbitMQ no deploy, então não será possível finalizar o pedido com `/finish_orders`, apenas as outras rotas.


## :page_facing_up: Licença

Este projeto usa a licença [MIT](https://github.com/DarkCleopas/user-crud/blob/main/LICENSE).

## :woman_technologist: :man_technologist: Autores

[Beatriz Salles](https://github.com/3salles)
<br/>
[Lucas Cléopas](https://github.com/DarkCleopas)



<p align="center">Developed with 💜</p>
