// src/pages/api/produk/index.js
import { getProducts, createProduct } from "@/utils/mockData";

export default function handler(req, res) {
  if (req.method === "GET") {
    const products = getProducts();
    res.status(200).json(products);
  } else if (req.method === "POST") {
    const newProduct = createProduct(req.body);
    res.status(201).json(newProduct);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
