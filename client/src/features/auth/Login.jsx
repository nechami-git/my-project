import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setToken } from "./authSlice";
import { useDispatch } from "react-redux";
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../../CssPages/Login.css'


const Login = () => {
    const dispatch = useDispatch()
    const [loginFunc, { isError, error, isSuccess, data }] = useLoginMutation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })


    const handleSignUp = (e) => {
        navigate("/register")
    }
    const handleSumbit = (e) => {
        e.preventDefault();
        loginFunc(formData)
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken({ token: data.accessToken }));
            console.log("Login response:", data);
            navigate("/")
        }
    }, [data, isSuccess, dispatch, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }

    return (

        <div className="login-page">
            <h2 className="text-center text-brown mb-3">התחברות</h2>
            {isError && (
                <div className="error-message">
                    {error?.data?.messege || "קרתה שגיאה, נסה שוב מאוחר יותר."}
                </div>
            )}
            <form className="login-card">
                <div className="flex justify-content-center">
                    <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                        <div className="flex flex-column gap-2 w-12rem">
                            <label className="login-label" htmlFor="username">שם משתמש</label>
                            <InputText
                                onChange={handleChange}
                                id="username"
                                type="text"
                                className="w-12rem"
                                name="username"
                                required
                            />
                        </div>
                        <div className="flex flex-column gap-2 w-12rem">
                            <label className="login-label" htmlFor="password">סיסמה</label>
                            <InputText
                                onChange={handleChange}
                                id="password"
                                type="password"
                                className="w-12rem"
                                name="password"
                                required
                            />
                        </div>
                        <Button
                            onClick={handleSumbit}
                            label="התחבר"
                            icon="pi pi-user"
                            className="w-10rem mx-auto login-button"
                        />
                    </div>

                    <div className="w-full md:w-2">
                        <Divider layout="vertical" className="hidden md:flex">
                            <b>או</b>
                        </Divider>
                    </div>

                    <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                        <Button
                            onClick={handleSignUp}
                            label="הרשמה"
                            icon="pi pi-user-plus"
                            className="w-10rem login-register-button"
                        />
                    </div>
                </div>
            </form>
        </div>
    )

}


export default Login;