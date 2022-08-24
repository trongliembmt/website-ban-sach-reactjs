import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/productdetail.css"
import { Toast } from 'primereact/toast';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import BookService from "../service/BookService";
import CartService from "../service/CartService";
import FarvoriteService from "../service/FarvoriteService";
import { useSelector } from "react-redux";
import { Rating } from 'primereact/rating';
import CommentService from "../service/CommentService";
import Header from "../component/Header";
import Footer from "../component/Footer";





export default function ProductDetail() {

    let { id } = useParams();
    const toast = useRef(null);
    const islogin = useSelector(state => state.isLogin.value)

    const bookService = new BookService();
    const cartItemService = new CartService();
    const favoriteService = new FarvoriteService();
    const commentService = new CommentService()

    const initProduct = {
        name: "",
        id: 0,
        author: [],
        image: "",
        typeOfBook: [],
        price: 0,
        descripton: ""
    }


    const [countCmt, setCountCmt] = useState(0)
    const [qty, setQty] = useState(1)
    const [product, setProduct] = useState(initProduct);
    const [listComment, setListComment] = useState([])


    useEffect(() => {
        commentService.getCommentByProductId(id).then((data) => {
            setListComment(data)
            setCountCmt(data.length)
        })

        bookService.getBookById(parseInt(id)).then((data) => {
            setProduct(data)
        })
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    function getListComment(){
        commentService.getCommentByProductId(id).then((data) => {
            setListComment(data)
            setCountCmt(data.length)
        })
    }

    function addCartItem(product_id) {
        const initcartItem = {
            book_id: product_id,
            user_id: parseInt(localStorage.getItem("userId")),
            qty: qty
        }
        cartItemService.addItemToCart(initcartItem).then((data) => {
            if (data.check === true) {
                toast.current.show({ severity: 'success', summary: 'Thành công!', detail: data.acessToken, life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Thất bại!', detail: data.acessToken, life: 3000 });
            }
        })
    }

    function addFarvorite(book_id) {
        const current = new Date();
        const time = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()} | ${current.getHours()}:${current.getMinutes()}`;

        let fav = {
            book_id: book_id,
            user_id: parseInt(localStorage.getItem("userId")),
            date_add: time
        }

        favoriteService.addToFarvoriteList(fav).then((data) => {
            if (data.check === true) {
                toast.current.show({ severity: 'success', summary: 'Thành công!', detail: data.acessToken, life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Thất bại!', detail: data.acessToken, life: 3000 });
            }
        })
    }


    function clickMinus() {
        if (qty > 1) {
            setQty(qty - 1)
        }
    }

    function clickPlus() {
        setQty(qty + 1)
    }

    const [comment, setComment] = useState()
    const [rates, setRate] = useState(null);

    function sendComment() {

        const current = new Date();
        const time = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()} - ${current.getHours()}:${current.getMinutes()}`;


        let datasend = {
            user_id: parseInt(localStorage.getItem("userId")),
            book_id: parseInt(id),
            content: comment,
            time_create: time,
            rate: rates
        }
        if (islogin === true) {
               commentService.sendComment(datasend).then((data)=>{
                getListComment()
               })

        } else {
            toast.current.show({ severity: 'error', summary: 'Thất bại!', detail: "Vui lòng đăng nhập và thử lại", life: 1500 });
        }

    }

    const showListComment = listComment.map((item, index) =>
        <div key={index} className="cmt-box">
            <div className="cmt-header">
                <div className="cmt-title">
                    <p><strong>{item.user.full_name}</strong></p>
                    <Rating value={item.rate} cancel={false}/>
                </div>
                <p>{item.time_create}</p>
            </div>
            <p className="cmt-content">{item.content}</p>
        </div>
    )




    return (
        <div>
            <Header />
            <div className="services-area2">
                <Toast ref={toast} />
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="row">
                                <div className="single-services">
                                    <div className=" col-md 3 features-img">
                                        <img src={product.image} alt="" />
                                    </div>
                                    <div className=" col-md-9 features-caption">
                                        <h3>{product.name}</h3>
                                        <p><span >Tác giả: </span>{product.author.join(" | ")}</p>
                                        <div className="price">
                                            <p>Price:</p><span>{product.price}đ</span>
                                        </div>
                                        <div className="review">
                                            <p>({countCmt} Bình luận)</p>
                                        </div>
                                        <div className="qty">
                                            <button className="btn-minus" onClick={() => clickMinus()} ><i className="pi pi-minus"></i></button>
                                            <input type="text" value={qty} onChange={(e) => setQty(e.target.value)} />
                                            <button className="btn-plus" onClick={() => clickPlus()}><i className="pi pi-plus"></i></button>
                                        </div>

                                        <div className="add-to-cart">
                                            <a onClick={() => addCartItem(product.id)} className="white-btn mr-10">Thêm vào giỏ hàng</a>
                                            <a onClick={() => addFarvorite(product.id)} title="Thêm vào danh sách yêu thích" className="border-btn share-btn"><i className="pi pi-heart"></i></a>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="our-client section-padding best-selling">

                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <div className="nav-button">
                                <Nav variant="pills" >
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Mô tả</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Bình luận</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>


                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div>
                                        {product.descripton}
                                    </div>

                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <div>
                                        <div>
                                            <h2>Các bình luận về sách</h2>
                                        </div>
                                        <div className="container">
                                            {showListComment}
                                        </div>

                                        <div className="send-cmt">
                                            <h4>Gửi bình luận</h4>
                                            <Rating value={rates} cancel={false} onChange={(e) => setRate(e.value)} />
                                            <div>
                                                <input type="text" onChange={(e) => setComment(e.target.value)} />
                                                <button className="cmt-btn" onClick={() => sendComment()}><i className="pi pi-send"></i></button>
                                            </div>

                                        </div>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>


                        </Tab.Container>


                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

}

