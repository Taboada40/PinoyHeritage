import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import FilterBar from '../../components/products/FilterBar';
import ProductCard from '../../components/products/ProductCard';
import '../../styles/products/ProductCatalog.css';

// Image Imports
import clothingImg from "../../assets/imgs/landing/clothing.jpg";
import barotSayaImg from "../../assets/imgs/products/barotsaya.png";
import filipinianaImg from "../../assets/imgs/products/filipiniana.jpg";
import malongImg from "../../assets/imgs/products/malong.jpg";
import salakotImg from "../../assets/imgs/products/salakot.jpg"; 
import camisaImg from "../../assets/imgs/products/camisa.jpg";
import bakyaImg from "../../assets/imgs/products/bakya.jpg";
import tnalakImg from "../../assets/imgs/products/tnalak.jpg";

export default function ProductCatalog() {
  const navigate = useNavigate(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceSort, setPriceSort] = useState("");

  // --- 1. SAMPLE DATA ---
  const sampleProducts = [
    { id: 1, name: 'Barong Tagalog', price: 1000, rating: 4, description: 'A traditional Filipino formal wear made from lightweight, sheer fabric such as piña or jusi, featuring intricate embroidery.', image: clothingImg, category: 'clothing' },
    { id: 2, name: "Baro't Saya", price: 1800, rating: 4, description: 'A traditional Filipino dress for women, featuring a blouse and skirt often made with light, embroidered fabrics.', image: barotSayaImg, category: 'clothing' },
    { id: 3, name: "Modern Filipiniana", price: 2500, rating: 5, description: 'A modern Filipiniana featuring a crop top paired with a long fitted skirt, combining contemporary style with traditional Filipino elements.', image: filipinianaImg, category: 'clothing' },
    { id: 4, name: "Malong", price: 200, rating: 3, description: 'A traditional tubular garment from the Philippines, often made of colorful woven or printed fabric. It’s versatile and can be worn as a skirt, dress, shawl, or blanket, symbolizing Filipino creativity and cultural identity.', image: malongImg, category: 'textile' },
    { id: 5, name: "Salakot", price: 350, rating: 4, description: 'A traditional wide-brimmed hat usually made of rattan or reeds, used by farmers and iconic in Filipino culture.', image: salakotImg, category: 'accessories' },
    { id: 6, name: "Camisa de Chino", price: 450, rating: 3, description: 'A simple, collarless cotton shirt usually worn underneath the Barong Tagalog or as casual wear.', image: camisaImg, category: 'clothing' },
    { id: 7, name: "Bakya", price: 250, rating: 4, description: 'Traditional Filipino wooden clogs with a strap, often made from native lightweight wood like santol or laniti.', image: bakyaImg, category: 'accessories' },
    { id: 8, name: "T'nalak Vest", price: 1500, rating: 5, description: '=A vest woven from T\'nalak fabric, a sacred cloth of the T\'boli people made from abaca fibers.', image: tnalakImg, category: 'textile' }
  ];

  // --- 2. STATE ---
  // Initialize with empty array - fetch from backend
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 3. BACKEND FETCH ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const API_BASE = 'http://localhost:8080';
        const res = await fetch(`${API_BASE}/api/admin/products`);
        
        if (!res.ok) throw new Error('Failed to fetch products');
        
        const data = await res.json();

        // Handle both array and object with 'value' property
        const productsArray = Array.isArray(data) ? data : (data?.value || data);

        // Map backend fields
        const mapped = productsArray.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          rating: item.rating || 4,
          description: item.description || '',
          category: item.category ? (typeof item.category === 'string' ? item.category.toLowerCase() : item.category.name?.toLowerCase()) : 'clothing', 
          image: item.imageUrl || clothingImg, 
        }));

        setProducts(mapped);
      } catch (err) {
        console.warn('Error fetching products:', err);
        // Use sample data as fallback only if fetch fails
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- 4. FILTER LOGIC ---
  const filteredProducts = useMemo(() => {
    let updated = [...products];

    if (selectedCategory) {
      updated = updated.filter(p => p.category === selectedCategory);
    }

    if (priceSort === 'low-high') {
      updated.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'high-low') {
      updated.sort((a, b) => b.price - a.price);
    }

    return updated;
  }, [products, selectedCategory, priceSort]);

  return (
    <div className="product-catalog-page">      
      <Header showNav={true} />
      
      <div className="catalog-header">
        <div className="catalog-header-top">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Back
          </button>

          <FilterBar 
            onCategoryChange={setSelectedCategory}
            onPriceChange={setPriceSort}
          />
        </div>
      </div>

      <div className="products-grid">
        {loading ? (
          <div style={{width: '100%', textAlign: 'center', padding: '2rem'}}>Loading...</div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
              />
          ))
        ) : (
          <div style={{width: '100%', textAlign: 'center', padding: '2rem'}}>No products found.</div>
        )}
      </div>
    </div>
  );
}