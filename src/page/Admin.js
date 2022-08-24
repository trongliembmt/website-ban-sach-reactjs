
import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import '../css/admin.css';

import NewProductForm from '../component/admin/newProductForm';

import BookService from '../service/BookService';

import dataproducts from '../asset/listbook'
import Footer from '../component/Footer';
import logo from '../img/logo.webp';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'








export default function AdminPage() {

    const admin = useSelector(state => state.isLogin.admin)
    const [usershow, setNewUserShow] = useState(false);
    const [productshow, setNewProductShow] = useState(false);



    const fakedata = [
        {
            id: 1,
            userName: "Baokaka",
            fullName: "Pham The Bao",
            birthday: "12/2/2000"
        },
        {
            id: 2,
            userName: "Nomal",
            fullName: "Pham The Bao",
            birthday: "12/2/2000"
        }

    ]

    const bookService = new BookService();

    function getApi() {
        const data = bookService.getAll();
        return data;
    }

    const deleteProduct = (id) => {
        bookService.deleteBook(id).then(() => console.log(id));
    }


    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        setUsers(fakedata)
        getApi().then((data) => setProducts(data));
        // BookService.getAll().then((data)=>setProducts(data))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const UserItem = (props) => props.data.map((item, index) =>
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.userName}</td>
            <td>{item.fullName}</td>
            <td>{item.birthday}</td>
            <td><i className="pi pi-info-circle" /> <i className='pi pi-trash' />
            </td>
        </tr>
    )

    const ProductItem = (props) => props.data.map((item) =>
        <tr key={item.id}>
            <td>{item.id}</td>
            <td><img src={item.image} alt="" /></td>
            <td>{item.name}</td>
            <td>{item.author}</td>
            <td>{item.typeOfBook}</td>
            <td>{item.price}</td>
            <td><i className="pi pi-info-circle" /> <i className='pi pi-trash' onClick={function () { deleteProduct(item.id) }} />
            </td>
        </tr>
    )

    if (admin == true) {
        return (
            <div>
                <div className="header-admin">
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
                                                <nav>
                                                    <ul>
                                                        <li><Link to="/login" className="btn header-btn">Mua sắm</Link></li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div>
                        <h2>Admin page</h2>
                    </div>
                    <div className="row">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <div className="col-md-2">
                                <div>
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Users</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Products</Nav.Link>
                                    </Nav.Item>
                                </div>
                            </div>

                            <div className="col-md-10">
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <div>
                                            <div>
                                                <button className='new-btn' onClick={() => setNewUserShow(true)}>Thêm</button>

                                                <Modal
                                                    size="lg"
                                                    show={usershow}
                                                    onHide={() => setNewUserShow(false)}
                                                    aria-labelledby="example-modal-sizes-title-lg"
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title id="example-modal-sizes-title-lg">
                                                            New user
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>

                                                    </Modal.Body>

                                                </Modal>
                                            </div>
                                            <div className='table-body'>
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>User name</th>
                                                            <th>Full name</th>
                                                            <th>Birth day</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <UserItem data={users} />
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <div>
                                            <div>
                                                <button className='new-btn' onClick={() => setNewProductShow(true)}>Thêm</button>
                                                <Modal
                                                    size="lg"
                                                    show={productshow}
                                                    onHide={() => setNewProductShow(false)}
                                                    aria-labelledby="model-new-product"
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title id="model-new-product">
                                                            New product
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <NewProductForm />
                                                    </Modal.Body>
                                                </Modal>
                                            </div>
                                            <div className='table-body'>
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Hình ảnh</th>
                                                            <th>Tên</th>
                                                            <th>Tác giả</th>
                                                            <th>Thể loại</th>
                                                            <th>Giá</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <ProductItem data={products} />
                                                    </tbody>

                                                </Table>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </Tab.Container>
                    </div>

                </div>

                <Footer />
            </div>
        )
    } else {
        <div>
            ko co gi
        </div>
    }


}