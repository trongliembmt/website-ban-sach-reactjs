import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { useDispatch } from 'react-redux'
import { isAdmin, login } from '../app/isLogin'
import '../css/login.css';
import UserService from '../service/UserService';
import { Toast } from 'primereact/toast';
import Header from '../component/Header';
import Footer from '../component/Footer';


export default function Login() {

    const userService = new UserService();
    const navigate = useNavigate();
    const toast = useRef(null);
    const dispatch = useDispatch()

    const initLogin = {
        userName: "",
        passWord: ""
    }

    const [loginForm, setLoginForm] = useState(initLogin);

    function submit() {
        userService.login(loginForm).then((data) => {
            if (data.check === true) {
                userService.setToken(data.acessToken);
                userService.setUserId(loginForm.userName)
                checkUserAdmin()
                dispatch(login())
                navigate("/", { replace: true });
            } else {
                toast.current.show({ severity: 'error', summary: 'Thất bại!', detail: data.acessToken, life: 3000 });
            }
        })
    }

    function checkUserAdmin() {
        userService.getUserByUserName(loginForm.userName).then((dt) => {
            if (dt.admin === true) {
                dispatch(isAdmin())
            }
        })
    }



    return (
        <div>
            <Header />
            <Toast ref={toast} />
            <div className="login-form-area">
                <div className="login-form">
                    <div className="login-heading">
                        <span>Đăng nhập</span>
                        <p>Điền thông tin tài khoản để đăng nhập</p>
                    </div>

                    <div className="input-box">
                        <div className="single-input-fields">
                            <label>Tên đăng nhập</label>
                            <input type="text" placeholder="Tên đăng nhập" onChange={(e) => setLoginForm({ ...loginForm, userName: e.target.value })} />
                        </div>
                        <div className="single-input-fields">
                            <label>Mật khẩu</label>
                            <input type="password" placeholder="Mật khẩu" onChange={(e) => setLoginForm({ ...loginForm, passWord: e.target.value })} />
                        </div>
                    </div>

                    <div className="login-footer">
                        <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
                        <button type='submit' className="submit-btn3" onClick={() => submit()}>Đăng nhập</button>
                    </div>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
