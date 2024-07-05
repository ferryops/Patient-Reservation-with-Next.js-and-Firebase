// src/pages/api/produk/[id].js
import { getProductById, updateProduct, deleteProduct } from "@/utils/mockData";

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const product = getProductById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else if (req.method === "PUT") {
    const updatedProduct = updateProduct(id, req.body);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else if (req.method === "DELETE") {
    deleteProduct(id);
    res.status(204).end();
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
