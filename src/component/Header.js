import React from 'react';
import '../css/header.css';
import logo from '../img/logo.webp';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Link, NavLink } from 'react-router-dom';
import UserService from '../service/UserService';
import { useSelector, useDispatch } from 'react-redux'
import { notAdmin, logout } from '../app/isLogin'
import jwt_decode from "jwt-decode";


import { useNavigate } from 'react-router-dom';






export default function Header() {
    const userservice = new UserService();
    const navigate = new useNavigate()
    const count = useSelector(state => state.isLogin.value)
    const admin = useSelector(state => state.isLogin.admin)
    const dispatch = useDispatch()



    function clicklogOut() {
        userservice.logOut()
        dispatch(logout())
        dispatch(notAdmin())
        navigate("/login", { replace: true });
    }


    function Display() {
        if (count === true || userservice.getToken()!== null) {
            const token = userservice.getToken();
            const user = jwt_decode(token).fullName
            if (admin === true) {
                return (
                    <nav>
                        <ul>
                            <li><Link to="/farvorite" className='favorite'><i className='pi pi-heart'></i></Link></li>
                            <li>
                                <Link to='/cart'> <Avatar className="p-overlay-badge" icon="pi pi-shopping-cart" size="large" shape="circle"> </Avatar></Link>
                            </li>
                            <li className='dropdown'><Link to="/account" className=""><i className='pi pi-user'></i> {user}</Link>
                                <div className="nav-dropdown">
                                    <Link to="/account">Tài khoản của tôi</Link>
                                    <Link to="/admin"> Sang trang admin </Link>
                                    <a onClick={() => clicklogOut()} >Đăng xuất</a>
                                </div>
                            </li>

                        </ul>
                    </nav>
                )
            } else
                return (
                    <nav>
                        <ul>
                            <li><Link to="/farvorite" className='favorite'><i className='pi pi-heart'></i></Link></li>
                            <li>
                                <Link to='/cart'> <Avatar className="p-overlay-badge" icon="pi pi-shopping-cart" size="large" shape="circle"> </Avatar></Link>
                            </li>
                            <li className='dropdown'><Link to="/account" className=""><i className='pi pi-user'></i> {user}</Link>
                                <div className="nav-dropdown">
                                    <Link to="/account">Tài khoản của tôi</Link>
                                    <a onClick={() => clicklogOut()} >Đăng xuất</a>
                                </div>
                            </li>
                        </ul>
                    </nav>
                )

        }
        else {
            return (
                <nav>
                    <ul>
                        <li><Link to="/login" className="btn header-btn">Đăng nhập</Link></li>
                    </ul>
                </nav>
            )
        }

    }








    return (
        <div className='header-area'>
            <div className='header-top'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-12'>
                            <div className='d-flex justify-content-between align-items-center flex-sm'>
                                <div className='header-info-left d-flex align-items-center'>
                                    <div className='logo'>
                                        <nav><Link to='/'> <img src={logo} alt='logo' /></Link></nav>
                                    </div>
                                </div>
                                <div className="header-info-right d-flex align-items-center">
                                    <Display />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='header-bottom header-stickey'>
                <div className='container'>
                    <div className="row align-items-center">
                        <div className='col-md-12'>
                            <div className="main-menu text-center d-none d-lg-block">
                                <nav>
                                    <ul id="navigation">
                                        <li><NavLink to="/">Trang chủ</NavLink></li>
                                        <li><NavLink to="/products">Sản phẩm</NavLink></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}