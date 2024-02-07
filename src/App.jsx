
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Category from './pages/Category'
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import User from './pages/User'
import Register from './pages/Register'
import ProtectedRoute from './routes/ProtectedRoute'
import Layout from './pages/Layout'
import Sales from './pages/Sales'
import CreateOrUpdateSale from './pages/CreateOrUpdateSale'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}> {/* Envuelve las rutas protegidas con Layout */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/category" element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          } />
          <Route path="/products" element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          } />
          {/* Sales Page */}
          <Route path="/sales" element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          } />
          {/* Create or Update Sale */}
          <Route path="/sales/new" element={
            <ProtectedRoute>
              <CreateOrUpdateSale  />
            </ProtectedRoute>
          } />

          <Route path="/sales/edit/:saleId" element={
            <ProtectedRoute>
              <CreateOrUpdateSale  />
            </ProtectedRoute>
          } />
        </Route>
        
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App
