import './CssPages/App.css';
import "./CssPages/flags.css"
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Layout from './components/Layout';
import Product from './features/product/Product';
import ProductDetails from "./features/product/ProductDetails";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Manager from './features/product/Manager';
import Basket from './features/basket/Basket';
import Home from './components/Home'
import PromoBanner from './components/PromoBanner'

function App() {
  return (
    <>
     <PromoBanner
        messages={[
          "🌟 !מבצע! את/ה קונה שתי מצעים השלישי חינם",
          "! משלוח חינם בקנייה מעל ₪200",
          " !מתנה בכל רכישה מעל ₪500 – שווה",
          "!מצעים חדשים באתר – כנסו להציץ"
        ]}
        delay={4000} 
      />
    <div className="App">
      <img
        src={`http://localhost:2005/images/לוגו.png`}
        alt="13 Avenue"
        style={{ height: '50px' }}
      />
     
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/basket" element={<Basket />} />
        </Route>
      </Routes>
    </div>
    </>
  );
}

export default App;
