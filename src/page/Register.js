import '../css/register.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import { Toast } from 'primereact/toast';

import UserService from '../service/UserService'
import Header from '../component/Header';
import Footer from '../component/Footer';


export default function Register() {
    const navigate = useNavigate();
    const toast = useRef(null);

    const userService = new UserService();

    const style = {
        display: "none"
    }

    const [styles, setStyles] = useState(style);

    const [styleError, setStyleError] = useState([])

    const initForm = {
        userName: "",
        passWord: " ",
        full_name: " ",
        birthday: " ",
        admin: false
    }


    const [registerForm, setRegisterForm] = useState(initForm)

    function checkComfirm(event) {
        if (event.target.value !== registerForm.passWord) {
            setStyleError(["form-error"]);
        } else {
            setStyleError(["form-comfirm"]);
        }
    }

    useEffect(() => {
        if (registerForm.userName !== "") {
            userService.checkExistUser(registerForm.userName).then((data) => {
                if (data !== true) {
                    setStyles({ ...styles, display: "block" })
                } else {
                    setStyles({ ...styles, display: "none" })
                }
            })
        }
    }, [registerForm, styles]) // eslint-disable-line react-hooks/exhaustive-deps

    function submit() {
        userService.register(registerForm).then((data) => {
            if (data.check === true) {
                navigate("/login", { replace: true });
            } else {
                toast.current.show({ severity: 'error', summary: 'Thất bại', detail: data.acessToken, life: 3000 });
            }
        })

    }

    function checkUSerExist(event) {
        setRegisterForm({ ...registerForm, userName: event.target.value })
    }





    return (
        <div>
            <Header />
            <Toast ref={toast} />
            <div className="register-form-area">
                <div className="register-form text-center">
                    <div className="register-heading">
                        <span>Đăng ký</span>
                        <p>Đăng ký tài khoản để trải nghiệm tốt hơn</p>
                    </div>

                    <div className="input-box">
                        <div className="single-input-fields">
                            <label>Họ và tên</label>
                            <input type="text" placeholder="Nhập họ và tên"
                                onChange={(e) => setRegisterForm({ ...registerForm, full_name: e.target.value })} />
                        </div>
                        <div className="single-input-fields">
                            <label>Tên đăng nhập <span style={styles} className='error-username'>Tên đăng nhập đã được sử dụng</span></label>
                            <input type="text" placeholder="Tên đăng nhập"
                                onChange={(e) => checkUSerExist(e)}
                            />

                        </div>


                        <div className="single-input-fields">
                            <label>Ngày sinh</label>
                            <input type="date" placeholder="dd/mm/yyyy" pattern='dd-mm-yyyy'
                                onChange={(e) => setRegisterForm({ ...registerForm, birthday: e.target.value })} />
                        </div>

                        <div className="single-input-fields">
                            <label>Mật khẩu</label>
                            <input type="password" placeholder="Enter Password" className={styleError}
                                onChange={(e) => setRegisterForm({ ...registerForm, passWord: e.target.value })} />
                        </div>
                        <div className="single-input-fields">
                            <label>Nhập lại mật khẩu</label>
                            <input type="password" placeholder="Confirm Password" className={styleError}
                                onChange={(e) => checkComfirm(e)} />
                        </div>
                    </div>

                    <div className="register-footer">
                        <p> Bạn đã có tài khoản? <Link to="/login"> Đăng nhập</Link> </p>
                        <button className="submit-btn3" onClick={() => submit()} >Đăng ký</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

}