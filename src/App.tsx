import { ItemPage, MaterialPage, OrderPage, TypePage } from '$pages'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Route, Routes } from 'react-router-dom'

function App() {
   const navigate = useNavigate()
   const location = useLocation()

   useEffect(() => {
      if (location.pathname === '/') {
         navigate('/orders')
      }
   }, [])

   return (
      <>
         <Routes>
            <Route element={<OrderPage />} path={'/orders'} />
            <Route element={<ItemPage />} path={'/items'} />
            <Route element={<TypePage />} path={'/types'} />
            <Route element={<MaterialPage />} path={'/materials'} />
         </Routes>
      </>
   )
}

export default App
