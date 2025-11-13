import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./authApiSlice";
import { useEffect, useState } from "react";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import '../../CssPages/Register.css'

const Register = () => {

  const [registerUser, { isError, isSucces, error }] = useRegisterMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    phone: ''
  })

  const handleSignUp = (e) => {
    navigate("/login")
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    })
  }
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };
  useEffect(() => {
    if (isSucces) {
      navigate("/login")
    }
  }, [isSucces, handleSumbit, handleSignUp])

  return (
    <div className="register-page">
      <h2 className="text-center text-brown mb-3">הרשמה</h2>

      {isError && (
        <div className="error-message">
          {error?.data?.messege || "קרתה שגיאה, נסה שוב מאוחר יותר."}
        </div>
      )}

      <form className="register-card">
        <div className="flex justify-content-center">
          <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
            <div className="flex flex-column gap-2 w-12rem">
              <label className="register-label" htmlFor="username">שם משתמש</label>
              <InputText value={formData.username} onChange={handleChange} id="username" type="text" name="username" className="w-12rem" required />
            </div>
            <div className="flex flex-column gap-2 w-12rem">
              <label className="register-label" htmlFor="fullname">שם מלא</label>
              <InputText value={formData.fullname} onChange={handleChange} id="fullname" type="text" name="fullname" className="w-12rem" required />
            </div>
            <div className="flex flex-column gap-2 w-12rem">
              <label className="register-label" htmlFor="password">סיסמה</label>
              <InputText value={formData.password} onChange={handleChange} id="password" type="password" name="password" className="w-12rem" required />
            </div>
            <div className="flex flex-column gap-2 w-12rem">
              <label className="register-label" htmlFor="email">אימייל</label>
              <InputText value={formData.email} onChange={handleChange} id="email" type="email" name="email" className="w-12rem" required />
            </div>
            <div className="flex flex-column gap-2 w-12rem mb-2">
              <label className="register-label" htmlFor="phone">טלפון</label>
              <InputMask
                value={formData.phone}
                onChange={handleChange}
                id="phone"
                name="phone"
                mask="999-999-9999"
                placeholder="999-999-9999"
                className="w-12rem"
                required
              />
            </div>
            <Button
              onClick={handleSumbit}
              label="הרשמה"
              icon="pi pi-user-plus"
              className="w-10rem mx-auto register-button"
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
              label="התחברות"
              icon="pi pi-user"
              className="w-10rem register-login-button"
            />
          </div>
        </div>
      </form>
    </div>
  );





}
export default Register;