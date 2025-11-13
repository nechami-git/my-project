import { useParams } from 'react-router-dom';
import { useGetByProductQuery } from './productApiSlice';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { useAddToBasketMutation } from '../basket/basketApiSlice';
import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { InputNumber } from "primereact/inputnumber";
import { useSelector } from "react-redux";
import '../../CssPages/ProductDetails.css'

const ProductDetails = () => {
    const { id } = useParams();
    const { data: product, isLoading, error } = useGetByProductQuery(id);
    const [addToBasket] = useAddToBasketMutation();
    const [quantity, setQuantity] = useState(1);
    const { isUserLoggedIn } = useSelector((state) => state.auth);
    const toast = useRef(null);
    const icon = <i className="pi pi-search"></i>;

    if (isLoading) return <div>טוען...</div>;
    if (error || !product) return <div>מוצר לא נמצא</div>;

    const handleAddToBasket = async () => {
        const res = await addToBasket({ _id: product._id, quentity: quantity });

        if ('error' in res) {
            toast.current.show({
                severity: "error",
                summary: "שגיאה",
                detail: "אירעה שגיאה בהוספת המוצר לסל",
                life: 3000,
            });
        } else {
            toast.current.show({
                severity: "success",
                summary: "הוספה לסל",
                detail: `${product.productName} נוסף בהצלחה`,
                life: 3000,
            });
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="grid product-details-container">
                <div className="col-12 md:col-6 text-right">
                    <h1 className="text-900 text-2xl font-bold mb-4">{product.productName}</h1>
                    <h3 className="text-900 text-xl font-bold mb-3">{product.description}</h3>
                    <p className="mb-3">{product.summary}</p>
                    <p>{product.inventoryStatus} זמינות</p>
                    <p className="text-xl font-semibold mt-2">מחיר: ₪{product.price}</p>
                    <ul className="list-disc pr-4 rtl-list">
                        <li>2 סדינים 200×90</li>
                        <li>2 ציפיות 150×200</li>
                        <li>2 ציפיות מעוצבות 70×50</li>
                    </ul>


                    <div className="flex rtl-list mt-4 gap-3 align-items-center">
                        <InputNumber
                            value={quantity}
                            onValueChange={(e) => setQuantity(e.value)}
                            showButtons
                            buttonLayout="vertical"
                            incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus"
                            min={1}
                            inputClassName="w-4rem"
                            className="my-inputnumber"
                        />

                        <Button
                            label=" הוספה לסל "
                            icon="pi pi-shopping-cart"
                            className="basket-button"
                            disabled={product.inventoryStatus === "OUTOFSTOCK" || !isUserLoggedIn}
                            onClick={handleAddToBasket}
                        />

                    </div>
                </div>

                <div className="col-12 md:col-6 flex justify-content-center align-items-center">
                    <Image
                        src={`http://localhost:2005/images/${product.image}`}
                        alt={product.productName}
                        className="border-round shadow-2 w-full md:w-11"
                        indicatorIcon={icon}
                        preview
                        width="500"
                    />
                </div>

            </div>
        </>
    );
};

export default ProductDetails;
