import React, { useState, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import '../../CssPages/Manager.css'; 
import { useGetProductQuery, useDeleteProductMutation, useAddProductMutation, useUpDateProductMutation } from './productApiSlice'

const Manager = () => {
    let emptyProduct = {
        _id: '',
        productName: '',
        image: '',
        description: '',
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };
    const { data: GetProducts = [], refetch } = useGetProductQuery();
    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductApi] = useDeleteProductMutation();
    const [addProduct] = useAddProductMutation();
    const [upProduct] = useUpDateProductMutation();
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);


    const formatCurrency = (value) => {
        return value.toLocaleString('he-IL', { style: 'currency', currency: 'ILS' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = async () => {
        setSubmitted(true);

        if (
            product.productName.trim() &&
            product.description.trim() &&
            product.price > 0
        ) {

            if (product._id) {
                await upProduct({
                    _id: product._id,
                    productName: product.productName,
                    price: product.price,
                    description: product.description,
                    summary: product.summary,
                    rating: product.rating,
                    category: product.category,
                    image: product.image,
                    inventoryStatus: product.inventoryStatus
                })
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                await addProduct({
                    productName: product.productName,
                    price: product.price,
                    description: product.description,
                    summary: product.summary,
                    rating: product.rating,
                    category: product.category,
                    image: product.image,
                    inventoryStatus: product.inventoryStatus
                })
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }
            setProductDialog(false);
            setProduct(emptyProduct);
            refetch();
        }
    };


    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };


    const deleteProduct = async () => {
        await deleteProductApi(product._id).unwrap();
        let _products = (products || []).filter((val) => val.id !== product._id);
        refetch();
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };


    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };
    const deleteSelectedProducts = () => {
        (GetProducts || []).filter((val) => !selectedProducts.includes(val));
        refetch();
        setSelectedProducts(null);
        setDeleteProductsDialog(false);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        selectedProducts.forEach(p => {
            deleteProductApi(p._id);

        });
    };
    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, productName) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${productName}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, productName) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${productName}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (product) => {
        return <img src={`http://localhost:2005/images/${product.image}`} alt={product.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (product) => {
        return formatCurrency(product.price);
    };

    const ratingBodyTemplate = (product) => {
        return <Rating value={product.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (product) => {
        return <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>;
    };

    const actionBodyTemplate = (product) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(product)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(product)} />
            </React.Fragment>
        );
    };

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={GetProducts} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="_id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="productName" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="category" header="Category" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="image" className="font-bold">
                        Image
                    </label>
                    <InputText id="image" value={product.image} onChange={(e) => onInputChange(e, 'image')} autoFocus />
                    {product.image && <img src={`http://localhost:2005/images/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" style={{ width: '150px' }} />}
                </div>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={product.productName} onChange={(e) => onInputChange(e, 'productName')} autoFocus required className={classNames({ 'p-invalid': submitted && !product.productName })} />
                    {submitted && !product.productName && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} className={classNames({ 'p-invalid': submitted && !product.description })} />
                    {submitted && !product.description.trim() && <small className="p-error">Description is required.</small>}

                </div>
                <div className="field">
                    <label htmlFor="summary" className="font-bold">
                        Summary
                    </label>
                    <InputTextarea id="summary" value={product.summary} onChange={(e) => onInputChange(e, 'summary')} rows={2} cols={20} />
                </div>
                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value='מיקי מאוס' onChange={onCategoryChange} checked={product.category === 'מיקי מאוס'} />
                            <label htmlFor="category1"> מיקי מאוס</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="חדר שינה" onChange={onCategoryChange} checked={product.category === 'חדר שינה'} />
                            <label htmlFor="category2">חדר שינה</label>
                        </div>

                    </div>
                </div>
                <div className="field">
                    <label htmlFor="inventoryStatus" className="font-bold">
                        InventoryStatus
                    </label>
                    <InputTextarea id="inventoryStatus" value={product.inventoryStatus} onChange={(e) => onInputChange(e, 'inventoryStatus')} rows={1} cols={13} />
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber
                            id="price"
                            value={product.price}
                            onValueChange={(e) => onInputNumberChange(e, 'price')}
                            mode="currency"
                            currency="ILS"
                            locale="he-IL"
                            required
                            className={classNames({ 'p-invalid': submitted && !product.price })}
                        />
                        {submitted && (!product.price || product.price <= 0) && <small className="p-error">Price is required.</small>}
                    </div>
                    <div className="field col">
                        <label htmlFor="rating" className="font-bold">
                            Rating
                        </label>
                        <InputNumber id="rating" value={product.rating} onValueChange={(e) => onInputNumberChange(e, 'rating')} />
                    </div>
                </div>
            </Dialog >

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            אתה בטוח שאתה רוצה למחוק <b>{product.productName}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>האם אתה בטוח שברצונך למחוק את המוצרים שנבחרו?</span>}
                </div>
            </Dialog>
        </div >
    );
}
export default Manager;
