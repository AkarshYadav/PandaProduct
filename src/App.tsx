import { ProductProvider } from './Context/ProductContext'
import ProductList from './pages/ProductList'
// import Counter from './pages/Counter'
function App() {
  return (
   <ProductProvider>
    <ProductList />
   </ProductProvider>
  )
}

export default App