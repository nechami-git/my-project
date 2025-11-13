import { useState, useEffect } from "react";
import { useGetBasketQuery, useAddToBasketMutation, useDeleteInBasketMutation } from "./basketApiSlice";
import { useGetProductQuery } from "../product/productApiSlice";
import { InputNumber } from "primereact/inputnumber";
import { DataView } from "primereact/dataview";
import { classNames } from "primereact/utils";
import { Button } from 'primereact/button';
import "../../CssPages/Basket.css";

const BasketItem = ({ item, index, productDetails, addToBasket, deleteFromBasket }) => {
  const [quantity, setQuantity] = useState(item.quentity);

  useEffect(() => {
    setQuantity(item.quentity);
  }, [item.quentity]);

  const handleQuantityChange = async (newQuantity) => {

    setQuantity(newQuantity);
    if (newQuantity <= 0) {
      await deleteFromBasket({ productId: item.productId }).unwrap();
    } else {
      await addToBasket({ _id: item.productId, quentity: newQuantity, override: true }).unwrap();
    }
  };

  return (
    <div className="col-12" key={item._id}>
      <div
        className={classNames(
          "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
          { "border-top-1 surface-border": index !== 0 }
        )}
      >
        <img
          className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
          src={`http://localhost:2005/images/${productDetails.image}`}
          alt={productDetails.productName}
        />
        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
          <div className="flex flex-column align-items-center sm:align-items-start gap-3">
            <div className="basket-product-title">{productDetails.productName}</div>
            <div className="text-md">תיאור: {productDetails.description}</div>
            <span className="basket-price">₪{productDetails.price}</span>
          </div>
          <div className="flex items-center gap-3">
            <InputNumber
              value={quantity}
              onValueChange={(e) => handleQuantityChange(e.value)}
              showButtons
              buttonLayout="horizontal"
              decrementButtonClassName="p-button-outlined p-button-danger"
              incrementButtonClassName="p-button-outlined p-button-success"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              min={0}
              inputClassName="w-3rem text-center basket-input"
              className="shadow-none"
            />
            <Button
              icon="pi pi-trash"
              className="trash-button"
              onClick={() => {
                deleteFromBasket({ productId: item.productId }).unwrap();
                
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Basket = () => {
  const { data: basketData = [], isLoading, isError } = useGetBasketQuery();
  const { data: allProducts = [] } = useGetProductQuery();
  const [addToBasket] = useAddToBasketMutation();
  const [deleteFromBasket] = useDeleteInBasketMutation();

  if (isLoading) return <div>טוען סל...</div>;
  if (isError) return <div>שגיאה בטעינת הסל </div>;

  const basket = basketData[0];
  const basketProducts = basket?.products || [];

  const itemTemplate = (item, index) => {
    const productDetails = allProducts.find((p) => p._id === item.productId);
    if (!productDetails) return null;

    return (
      <BasketItem
        key={item.productId}
        item={item}
        index={index}
        productDetails={productDetails}
        addToBasket={addToBasket}
        deleteFromBasket={deleteFromBasket}
      />
    );
  };

  const listTemplate = (items) => {
    if (!items || items.length === 0) return <div>הסל שלך ריק</div>;
    return <div className="grid grid-nogutter">{items.map(itemTemplate)}</div>;
  };

  return (
    <div className="basket-page">
      <h1 className="basket-title text-center">🛒 הסל שלך</h1>

      <div className="basket-card">
        <DataView value={basketProducts} listTemplate={listTemplate} />
      </div>
    </div>
  );
};

export default Basket;
