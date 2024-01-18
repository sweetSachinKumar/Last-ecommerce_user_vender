import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider} from "@react-oauth/google"
import {Provider} from "react-redux"
import store from './api/store.js'

ReactDOM.createRoot(document.getElementById('root')).render( 
    <Provider store={store} >
    <GoogleOAuthProvider clientId='762796259773-d5trnii2u12eiltjbrge3b5g9ln70cqk.apps.googleusercontent.com' >
    <App />
    </GoogleOAuthProvider>
    </Provider>
  
)
