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
  // Initialize with sampleProducts so the user sees data immediately
  const [products, setProducts] = useState(sampleProducts);
  const [loading, setLoading] = useState(false); // Set to false initially since we have sample data

  // --- 3. BACKEND FETCH ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Optional: Uncomment this if you want to show a loading spinner over the sample data
        // setLoading(true); 

        const res = await fetch('/api/admin/products');
        
        if (!res.ok) throw new Error('Failed to fetch products');
        
        const data = await res.json();

        // Map backend fields
        const mapped = data.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          rating: item.rating || 4,
          description: item.description || '',
          category: item.category ? item.category.toLowerCase() : 'clothing', 
          image: item.imageUrl || clothingImg, 
        }));

        // Only update state if we successfully got data
        if (mapped.length > 0) {
          setProducts(mapped);
        }
      } catch (err) {
        console.warn('Backend offline or error. Using sample data:', err);
        // We do NOTHING here, so the 'products' state remains as 'sampleProducts'
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