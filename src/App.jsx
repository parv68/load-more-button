import { useEffect, useState, useCallback } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  // Function to fetch products with pagination
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const skip = count === 0 ? 0 : count * 20;
      const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${skip}`);
      const result = await response.json();
      console.log(result);  

      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products]);
      } else {
        setDisableButton(true);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [count]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (products && products.length === 100) setDisableButton(true);
  }, [products]);

  return (
    <div className='load-more-container'>
      <div className="product-container">
        {
          products && products.length ? 
          products.map(item => (
            <div key={item.id} className='product'>
              <img src={item.thumbnail} alt={item.title} />  
              <p>{item.title}</p>
            </div>
          )) : <p>No products available</p>
        }
      </div>
      <div className="button-container">
        <button 
          disabled={disableButton || loading} 
          onClick={() => setCount(count + 1)}
        >
          {loading ? "Loading..." : "Load More Products"}
        </button>
        {disableButton && <p>You have reached the end of the products</p>}
      </div>
    </div>
  );
}

export default App;
