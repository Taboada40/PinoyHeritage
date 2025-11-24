import React, { useState, useEffect } from 'react';
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
import salakotImg from "../assets/imgs/salakot.jpg"; 
import camisaImg from "../assets/imgs/camisa.jpg";
import bakyaImg from "../assets/imgs/bakya.jpg";
import tnalakImg from "../assets/imgs/tnalak.jpg";

export default function ProductCatalog() {
  const navigate = useNavigate(); // 
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();

        // Map backend fields to what the UI expects. Backend uses `imageUrl`.
        const mapped = data.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          rating: item.rating || 4,
          description: item.description || '',
          // prefer absolute/remote imageUrl from backend; otherwise fallback to local images
          image: item.imageUrl || clothingImg,
        }));

        setProducts(mapped);
      } catch (err) {
        console.error('Error fetching products:', err);
        // If fetch fails, keep products empty so UI gracefully degrades.
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => console.log('Category changed:', category);
  const handlePriceChange = (priceSort) => console.log('Price sort changed:', priceSort);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('Page changed:', page);
  };

  return (
    <div className="product-catalog-page">      
      <Header showNav={true} />
      
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
