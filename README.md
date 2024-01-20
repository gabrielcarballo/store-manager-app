# Project README - Sales Management API

## Project Overview

This project involves developing a Sales Management API using the MSC (Model-Service-Controller) architecture. The API allows for the management of dropshipping sales, including operations like creating, viewing, deleting, and updating products and sales. MySQL is used for data management, and the API follows RESTful principles.

## Development

### Technologies
- Node.js
- Express.js
- MySQL
- JavaScript
- Jest
- Chai
- Mocha
- Sinon
- ESLint

## Project Structure
The project is structured around multiple endpoints, each serving a specific function. Below are the key endpoints:

- `GET /products`: Retrieve all products.
- `GET /products/:id`: Retrieve a specific product by ID.
- `POST /products`: Create a new product.
- `PUT /products/:id`: Update an existing product.
- `DELETE /products/:id`: Delete a product.
- `POST /sales`: Register a new sale.
- `GET /sales`: Retrieve all sales.
- `GET /sales/:id`: Retrieve a specific sale by ID.
- `PUT /sales/:id`: Update an existing sale.
- `DELETE /sales/:id`: Delete a sale.
- `GET /products/search?q=searchTerm`: Search for products by name.

## Project Requirements

## 1. Create endpoints to list products ## 

  Accessible through `/products` and `/products/:id`.
  - /products should return all products.
  - /products/:id should return the product with the specified id.
  
  Results should be sorted in ascending order by the id field.

## 2. Develop tests covering at least 5% of the layers of your application ## 

  Test files in the tests/unit directory.
  - Model tests must mock the database.

## 3. Create endpoint to register products ## 

  Accessible through `/products`.
  - Products sent should be saved in the products table.    
    
  Request body format:

  ```json
  {
    "name": "ProductX"
  }
  ```

## 4. Create validations for products ## 

  Accessible through `/products`.
  - Initial validations of the request body should not access the database.

## 5. Develop tests covering at least 10% of the layers of your application ## 

  Test files in the tests/unit directory.
  - Model tests must mock the database.

## 6. Create endpoint to validate and register sales ## 

  Accessible through `/sales`.
  - Sales sent should be saved in the sales and sales_products tables.
  - Possible to register the sale of various products in a single request.
    
  Request body format:

  ```json
  [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]  
  ```

## 7. Develop tests covering at least 15% of the layers of your application ## 

  Test files in the tests/unit directory.
  - Model tests must mock the database.

## 8. Create endpoints to list sales ## 

  Accessible through `/sales` and `/sales/:id`.
  - /sales should return all sales.
  - /sales/:id should return the sale with the specified id.
  
  Results should be sorted in ascending order by the saleId field, and in case of a tie, also by the productId field.

## 9. Develop tests covering at least 20% of the layers of your application ## 

  Test files in the tests/unit directory.
  - Model tests must mock the database.


## 10. Create endpoint to update a product ## 

Accessible through `/products/:id`.
- Only the product with the specified id should be updated.
- Request body should be validated similarly to the registration.
  
Request body format:

```json
{
  "name": "Batman's Hammer"
}
```

## 11.Develop tests covering at least 25% of the layers of your application ## 
  Test files in the tests/unit directory.
  - Model tests must mock the database.


## 12.Create endpoint to delete a product ## 
  Accessible through `/products/:id`.
  - Only the product with the specified id should be deleted.

## 13. Develop tests covering at least 30% of the layers of your application ##

Test files in the `tests/unit` directory.
- Tests must mock the database.

## 14. Create endpoint to delete a sale ##

Accessible through `/sales/:id`.
- Only the sale with the specified id should be deleted.

## 15. Develop tests covering at least 35% of the layers of your application ##

Test files in the `tests/unit` directory.
- Tests must mock the database.

## 16. Create endpoint to update a sale ##

Accessible through `/sales/:id`.
- Only the sale with the specified id should be updated.
- Request body should be validated similarly to the registration.

**Request body format:**

```json
[
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
]
```

## 17. Develop tests covering at least 40% of the layers of your application ##

- Test files in the `tests/unit` directory.
- Tests must mock the database.

## Create endpoint `products/search?q=searchTerm`

- Accessible through the URL `/products/search`.
- Should bring products based on `q` from the database, if it exists.
- Should return an array of products containing the term passed in the URL.


## Installation and Setup Instructions

1. Clone this repository:

```bash
git clone https://github.com/gabrielcarballo/store-manager-app.git
```

2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
MYSQL_HOST=localhost
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=store_manager
PORT=3000
HOST=localhost
```

Replace your_username and your_password with your MySQL username and password.

4. To start the server, run:
```bash
npm start
```

## Usage Instructions

Since this project is an API, interact with it using API calls. Use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to make requests following the **Project Structure**.

Remember to replace `http://localhost:3000` with the URL of your API if it's hosted somewhere else.

Here are some examples:

1. To retrieve all products:

`GET /products`

2. To retrieve a specific product by ID:

`GET /products/:id`

3. To create a new product:

`POST /products`

## Feedback ##

Your feedback is crucial! Please provide insights and suggestions regarding the project. I'm eager to incorporate any improvements you may suggest.

## Portfolio ##

Check out my [portfolio](https://my-folio-weld.vercel.app/) for more of my work!


