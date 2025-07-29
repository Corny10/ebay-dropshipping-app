
import React, { useState, useEffect } from 'react';
import './App.css';

interface Product {
  title: string;
  price: number;
  image: string;
  link: string;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const mockProducts = [
      {
        title: 'Bluetooth Kopfhörer',
        price: 39.99,
        image: 'https://m.media-amazon.com/images/I/61v6K8UNb7L._AC_SL1500_.jpg',
        link: 'https://www.amazon.de/dp/B08XYZ1234',
      },
      {
        title: 'USB-C Ladegerät',
        price: 24.95,
        image: 'https://m.media-amazon.com/images/I/61D7bJ+ZC5L._AC_SL1500_.jpg',
        link: 'https://www.amazon.de/dp/B08ABC5678',
      },
      {
        title: 'Powerbank 20000mAh',
        price: 29.95,
        image: 'https://m.media-amazon.com/images/I/71M1-A3h6vL._AC_SL1500_.jpg',
        link: 'https://www.amazon.de/dp/B07POWER999',
      },
    ];
    setProducts(mockProducts);
  }, []);

  const copyToClipboard = (product: Product, index: number) => {
    const ebayPrice = (product.price * 2).toFixed(2);
    const text = `🛒 ${product.title}\n✅ Amazon: ${product.price.toFixed(2)} €\n💰 eBay: ${ebayPrice} €\n📦 Link: ${product.link}\n📋 Beschreibung: Hochwertige Qualität, sofort versandbereit!`;

    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="container">
      <h1 className="title">📈 Amazon → eBay Tool</h1>
      <p className="subtitle">Finde Bestseller, kopiere eBay-Beschreibung mit 1 Klick</p>
      <div className="grid">
        {products.map((p, index) => (
          <div key={index} className="card">
            <img src={p.image} alt={p.title} className="product-image" />
            <h2>{p.title}</h2>
            <p>Amazon: {p.price.toFixed(2)} €</p>
            <p>eBay: <strong>{(p.price * 2).toFixed(2)} €</strong></p>
            <a href={p.link} target="_blank" rel="noopener noreferrer">🔗 Amazon ansehen</a>
            <button onClick={() => copyToClipboard(p, index)}>
              {copiedIndex === index ? '✅ Kopiert!' : '📋 eBay-Text kopieren'}
            </button>
            <button className="upload-disabled" disabled>⬆️ eBay veröffentlichen (in Vorbereitung)</button>
          </div>
        ))}
      </div>
    </div>
  );
}
