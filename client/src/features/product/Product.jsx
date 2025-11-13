import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useGetProductQuery } from './productApiSlice';
import { useAddToBasketMutation } from '../basket/basketApiSlice';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import '../../CssPages/Product.css';

const Product = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const { data: products = [] } = useGetProductQuery();
  const [addToBasket] = useAddToBasketMutation();

  const handleImageClick = (_id) => {
    navigate(`/product/${_id}`);
  };

  const handleAddToCart = async (product) => {
    try {
      await addToBasket({ _id: product._id, quentity: 1 }).unwrap();
      toast.current.show({
        severity: "success",
        summary: "הוספה לסל",
        detail: `${product.productName} נוסף בהצלחה`,
        life: 3000
      });
    } catch {
      toast.current.show({
        severity: "error",
        summary: "שגיאה",
        detail: "שגיאה בהוספת המוצר לסל",
        life: 3000
      });
    }
  };

  return (
    <div className="product-page">
      <Toast ref={toast} />
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              className="product-image"
              src={`http://localhost:2005/images/${product.image}`}
              alt={product.productName}
              onClick={() => handleImageClick(product._id)}
            />
            <div className="product-name">{product.productName}</div>
            <Rating value={product.rating} readOnly cancel={false} />
            <div className="product-price">₪{product.price}</div>
            <Button
              icon="pi pi-shopping-cart"
              className="add-button"
              disabled={product.inventoryStatus === 'OUTOFSTOCK' || !isUserLoggedIn}
              onClick={() => handleAddToCart(product)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
