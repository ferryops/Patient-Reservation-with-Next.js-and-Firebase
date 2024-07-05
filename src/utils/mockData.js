// src/utils/mockData.js

let products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
];

let users = [
  { id: 1, name: "User 1", email: "user1@example.com" },
  { id: 2, name: "User 2", email: "user2@example.com" },
];

export function getProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((product) => product.id === parseInt(id));
}

export function createProduct(data) {
  const newProduct = { id: products.length + 1, ...data };
  products.push(newProduct);
  return newProduct;
}

export function updateProduct(id, data) {
  const index = products.findIndex((product) => product.id === parseInt(id));
  if (index !== -1) {
    products[index] = { ...products[index], ...data };
    return products[index];
  }
  return null;
}

export function deleteProduct(id) {
  products = products.filter((product) => product.id !== parseInt(id));
}

export function getUsers() {
  return users;
}

export function getUserById(id) {
  return users.find((user) => user.id === parseInt(id));
}

export function createUser(data) {
  const newUser = { id: users.length + 1, ...data };
  users.push(newUser);
  return newUser;
}

export function updateUser(id, data) {
  const index = users.findIndex((user) => user.id === parseInt(id));
  if (index !== -1) {
    users[index] = { ...users[index], ...data };
    return users[index];
  }
  return null;
}

export function deleteUser(id) {
  users = users.filter((user) => user.id !== parseInt(id));
}
