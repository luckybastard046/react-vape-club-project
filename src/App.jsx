import React from "react"
import { Route, Routes } from "react-router-dom"

import AppLayout from "./layout/AppLayout/AppLayout"

import Home from "./pages/Home/Home"
import SignIn from "./pages/Auth/SignIn/SignIn"
import SignUp from "./pages/Auth/SignUp/SignUp"

import Cart from "./pages/Cart/Cart"
import Profile from "./pages/Profile/Profile"
import Food from "./pages/Shop/Shop"

import ProductsList from "./pages/Shop/ShopList/ShopList"

import Notepad from "./pages/Notepad/Notepad"
import NotFound from "./pages/NotFound/NotFound"
import Contact from "./pages/Contact/Contact"

import NotepadProtectedRoute from "./routes/NotepadProtectedRoute"
import ShopProtectedRoute from "./routes/FoodProtectedRoute"

function App() {
    return (
        <>
            <div className='app'>
                <Routes>
                    <Route path='/' element={<AppLayout />}>
                        <Route index element={<Home />} />
                        <Route path='/sign-in' element={<SignIn />} />
                        <Route path='/sign-up' element={<SignUp />} />

                        <Route path='/cart' element={<Cart />} />
                        <Route path='/profile' element={<Profile />} />

                        <Route element={<ShopProtectedRoute />}>
                            <Route path='/pub' element={<Food />} />
                        </Route>
                    
                        <Route element={<NotepadProtectedRoute />}>
                            <Route path="/notepad" element={<Notepad />} />
                        </Route>

                        <Route path="/contact" element={<Contact />} />

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </div>
        </>
    )
}

export default App