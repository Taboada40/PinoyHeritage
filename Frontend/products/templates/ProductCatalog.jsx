import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../landing_page/components/Header';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import '../assets/styles/ProductCatalog.css';
import clothingImg from "../../landing_page/assets/imgs/clothing.jpg";
import barotSayaImg from "../assets/imgs/barotsaya.png";
import filipinianaImg from "../assets/imgs/filipiniana.jpg";
import malongImg from "../assets/imgs/malong.jpg";

export default function ProductCatalog() {
  const navigate = useNavigate(); // 
  const [currentPage, setCurrentPage] = useState(2);
  const [products] = useState([
    {
      id: 1,
      name: 'Barong Tagalog',
      price: 1000.00,
      rating: 4,
      description: 'A traditional Filipino formal wear made from lightweight, sheer fabric such as piña or jusi, featuring intricate embroidery.',
      image: clothingImg
    },
    {
      id: 2,
      name: "Baro't Saya",
      price: 1800.00,
      rating: 4,
      description: 'A traditional Filipino dress for women, featuring a blouse and skirt often made with light, embroidered fabrics.',
      image: barotSayaImg
    },
    {
      id: 3,
      name: "Modern Filipiniana",
      price: 2500.00,
      rating: 5,
      description: 'A modern Filipiniana featuring a crop top paired with a long fitted skirt, combining contemporary style with traditional Filipino elements.',
      image: filipinianaImg
    },
    {
      id: 4,
      name: "Malong",
      price: 200.00,
      rating: 3,
      description: 'A traditional tubular garment from the Philippines, often made of colorful woven or printed fabric. It’s versatile and can be worn as a skirt, dress, shawl, or blanket, symbolizing Filipino creativity and cultural identity.',
      image: malongImg
    }
  ]);

  const handleCategoryChange = (category) => console.log('Category changed:', category);
  const handlePriceChange = (priceSort) => console.log('Price sort changed:', priceSort);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('Page changed:', page);
  };

  return (
    <div className="product-catalog-page">      
      <Header showNav={false} />
      
        <div className="catalog-header">
            <div className="catalog-header-top">
                <button 
                className="back-btn"
                onClick={function() { navigate('/'); }}
                >
                ← Back
                </button>

                <FilterBar 
                onCategoryChange={handleCategoryChange}
                onPriceChange={handlePriceChange}
                />
            </div>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onClick={() => navigate(`/product/${product.id}`)} // 👈 navigate to product detail
            />
          ))}
        </div>
    </div>
  );
}
