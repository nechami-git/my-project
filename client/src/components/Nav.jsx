import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../features/auth/authSlice";
import apiSlice from "../app/apiSlice"
import { Menubar } from 'primereact/menubar';
import Manager from '../features/product/Manager';
import { useState } from 'react';



const Nav = () => {
    const { isUserLoggedIn } = useSelector((state) => state.auth);
    const user = useSelector((state) => state.auth.user);
    const isManager = user?.roles?.includes('manager');

    const [showManager, setShowManager] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        dispatch(removeToken());
        dispatch(apiSlice.util.resetApiState());
        navigate("/");
    };
    const handleManagerClick = () => {
        navigate("/manager");
    };
    const items = [
        {
            url: "/basket",
            icon: 'pi pi-cart-plus'
        },
        {
            url: "/login",
            icon: 'pi pi-user'
        },
        ...(isUserLoggedIn
            ? [
                {
                    label: 'התנתק',
                    icon: 'pi pi-sign-out',
                    command: handleLogoutClick,
                    className: 'p-button-danger'
                }
            ]
            : []),
        ...(isManager
            ? [
                {
                    label: 'ניהול המוצרים',
                    icon: 'pi pi-cog',
                    command: handleManagerClick,
                }
            ]
            : [])

    ];
    const end = (<div style={{ display: "flex", direction: "row", gap: "0.8rem" }}>

        <NavLink to="/product" className="p-menuitem-link" style={{ color: "inherit" }} onClick={() => setShowManager(false)}>
            <span style={{ marginInlineEnd: "0.5rem" }}>מוצרים</span>
            <span className="pi pi-shopping-bag p-menuitem-icon" />
        </NavLink>
        <NavLink to="/" className="p-menuitem-link" style={{ color: "inherit" }} onClick={() => setShowManager(false)}>
            <span style={{ marginInlineEnd: "0.5rem" }}>בית</span>
            <span className="pi pi-home p-menuitem-icon" />
        </NavLink>

    </div>
    );
    return (
        <>

            <div className="card">
                <Menubar model={items} end={end} className="main-menubar" />
            </div>
            {showManager && <Manager />}
        </>
    );
};

export default Nav;





