import { useEffect, useState } from 'react'

function App() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  async function fetchProducts() {
    try{
      const respone = await fetch(
        'https://fakestoreapi.com/products'
      )
    }
    catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    fetchProducts()
  },[])
  return (
    <div className='container'>
         
    </div>
  )
}

export default App
