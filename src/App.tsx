
import './App.css'
import { Footer } from './components/shared/Footer'
import { Header } from './components/shared/header'
import Home from './components/shared/home/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProductListPage from './pages/ProductListPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-1 container mx-auto px-4 py-4 mt-28'>
        <Routes>
          <Route path='/' element={<><Home /><ProductListPage /></>} />
          <Route path='/search' element={<ProductListPage />} />
          <Route path='/product/:id' element={<ProductDetailPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
