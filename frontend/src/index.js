// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();






import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
// import Home from "./page/Home";
import Home from './components/page/Home';
import Menu from "./components/page/Menu";
import About from "./components/page/About";
import Contact from "./components/page/Contact";
import Login from "./components/page/Login";
import Newproduct from "./components/page/Newproduct";
import Signup from "./components/page/Signup";
// import { store } from "./redux/index";
// import { store } from './redux/index';
import { store } from './components/redux';
import { Provider } from "react-redux";
import Cart from "./components/page/Cart";
import Success from "./components/page/Success";
import Cancel from "./components/page/Cancel";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index element={<Home/>} />
      {/* <Route path='menu' element={<Menu/>}/> */}
      <Route path="menu/:filterby" element={<Menu />} />
      <Route path='about' element={<About/>} />
      <Route path='contact' element={<Contact/>} />
      <Route path="Login" element={<Login />} />
      <Route path="newproduct" element={<Newproduct />} />
      <Route path="signup" element={<Signup />} />
      <Route path="cart" element={<Cart />} />
      <Route path="success" element={<Success/>}/>
      <Route path="cancel" element={<Cancel/>}/>
    </Route>
  )
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
   </Provider>
);

reportWebVitals();