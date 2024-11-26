#Weapon Store API

##This is a backend API for managing weapons and categories built using Node.js, Express, and MongoDB.

##Installation
To run the project locally, follow these steps:

1. Clone the repository:

git clone <repository-url>
cd <project-directory>

2. Install the required dependencies:

npm install

3. Set up MongoDB (either locally or via MongoDB Atlas), and configure the connection string in the .env file.

4. Start the application

npm run node

#API Endpoints

GET /products
Fetch a list of all products.

URL: /products
Method: GET
Response: Returns a list of all weapons available in the store, including their name, description, price, stock, image, and associated category.
GET /products/query
Fetch products filtered by category ID.

URL: /products/query?categoryId=<categoryId>
Method: GET
Query Parameter: categoryId (The ID of the category)
Response: Returns a list of products that belong to the specified category, including the product details.
GET /product
Fetch a product by its ID.

URL: /product?id=<productId>
Method: GET
Query Parameter: id (The ID of the product)
Response: Returns the product with the matching ID, including its name, description, price, stock, image, and category.
POST /products
Create a new product.

URL: /products
Method: POST
Request Body: Requires the following fields:
name: Name of the product.
description: Description of the product.
price: Price of the product.
stock: Stock quantity of the product.
image: Image URL of the product.
category: The category ID the product belongs to.
Response: Returns the newly created product along with a success message.

License
This project is licensed under the MIT License.
