const express = require("express");
const app = express();
const port = 3001;
const path = require("path");
const logger = require("./logger");

app.use(logger);

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
  { id: 3, name: "Tablet", price: 600 },
];

const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

app.use(express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "contact.html"));
});

app.get("/products", (req, res) => res.json(products));
app.get("/users", (req, res) => {
  const age = parseInt(req.query.age);
  res.json(isNaN(age) ? users : users.filter((user) => user.age > age));
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("<h1>Product not found</h1>");
  res.send(`<h1>Product: ${product.name}</h1><p>Price: ${product.price}</p>`);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("<h1>User not found</h1>");
  res.send(`<h1>User: ${user.name}</h1><p>Age: ${user.age}</p>`);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "assets", "404.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
