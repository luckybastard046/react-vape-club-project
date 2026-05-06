import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import axios from "axios";

import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './appwrite/context/AuthContext'

import { Provider } from 'react-redux'
import store from './store/store'

import App from './App'
import ScrollToTop from "react-scroll-to-top";
import { ToastContainer } from "react-toastify";

import './scss/styles.scss';

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
          <Provider store={store}>
            <App />
            <ScrollToTop
              color="white"
              smooth
              style={{
                backgroundColor: "brown",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: '5px 10px'
              }}
            />
            <ToastContainer
              position="top-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </Provider>
      </AuthProvider>
    </Router>
  </StrictMode>,
)
