import { useEffect, useState } from "react"
import UserService from "../service/UserService";
import jwt_decode from "jwt-decode";
import AddressService from "../service/AddressService";
import Modal from 'react-bootstrap/Modal';
import OrderService from "../service/OrderService";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Header from "../component/Header";
import Footer from "../component/Footer";

import '../css/my-account.css'
import OrderCard from "../component/OrderCard";


export default function MyAccount() {

    const addressService = new AddressService()
    const userservice = new UserService()
    const orderService = new OrderService()

    var username = jwt_decode(userservice.getToken()).sub;
    var userID = parseInt(localStorage.getItem("userId"))


    const initUser = {
        admin: false,
        birthday: "",
        full_name: "",
        id: 0,
        passWord: "",
        userName: ""
    }

    const initAddress = {
        name: "",
        user_id: userID,
        phoneNumber: "",
        province: "",
        district: "",
        wards: "",
        detail: ""
    }



    const [user, setUser] = useState(initUser);
    const [listAddress, setListAddress] = useState([])
    const [address, setAddress] = useState(initAddress)
    const [listOrder, setListOrder] = useState([])
    const [showNewAddress, setShowNewAddress] = useState(false);







    useEffect(() => {
        userservice.getUserByUserName(username).then((data) => {
            setUser(data)
        })
        orderService.getOrderByUserId(userID).then((data) => {
            setListOrder(data)
        })
        addressService.getAddressByUserId(userID).then((data) => {
            setListAddress(data)
        })
    }, [])

    function getAddressApi() {
        addressService.getAddressByUserId(userID).then((data) => {
            setListAddress(data)
        })
    }


    function createAddress() {
        addressService.addAddress(address).then((data) => {
            getAddressApi()
        })
        setShowNewAddress(false)
    }

    function deleteAddress(id) {
        addressService.deleteAddress(parseInt(id)).then((data) => {
            getAddressApi()
        })

    }

    const [statusOrder, setStatusOrder] = useState("all");


    function choseShowListOrder(status){
       let t = [];
    //    for (const iterator of listOrder) {
    //         if(iterator.status === status){
    //             t.push(iterator);
    //         }
    //    }

       for (let index = 0; index < listOrder.length; index++) {
            const element = listOrder[index];
            if(element.status === status){
                t.push(element)
            }
        
       }

       if(status === "all"){
        return listOrder;
       }

       return t;
    }



    const showListAddress = listAddress.map((item, index) =>
        <div key={index} className="address-item">
            <div className="address-detail-header">
                <p><span>{item.name}</span> | {item.phoneNumber}</p>
                <div>
                    <button className="address-btn">S???a</button>
                    <button className="address-btn" onClick={() => deleteAddress(item.id)}>X??a</button>
                </div>
            </div>
            <p>{item.detail}</p>
            <p>X?? {item.wards}, Huy???n {item.district}, {item.province}</p>
        </div>

    )

    function totalPrice(list) {
        let total = 0;
        for (const item of list) {
            total += item.qty * item.book.price;
        }
        return total + 30000;
    }



    const showListOrder = listOrder.map((item) =>
        <div key={item.id} className=" box-order row">
            <div className="order-header col-md-12">
                <h5>Tr???ng th??i | <span>{item.status}</span></h5>
            </div>
            <div className="order-body-1 col-md-6">
                <p>M?? ????n h??ng: {item.id}</p>
                <p>M?? gi???m gi??: (Kh??ng)</p>
                <p>Th???i gian: {item.create_day}</p>
                <p>Chi ti???t ????n h??ng: <button>xem chi ti???t</button></p>
            </div>
            <div className="order-body-2 col-md-6">
                <p>Ng?????i nh???n: {item.address.name}</p>
                <p>S??? ??i???n tho???i: {item.address.phoneNumber}</p>
                <p>?????a ch???: {item.address.detail}
                    <br></br>
                    {item.address.wards}, {item.address.district}, {item.address.province}
                </p>
            </div>
            <div className="order-footer col-md-12">
                <p>T???ng:<span> {totalPrice(item.list_product)}??</span> </p>
            </div>

        </div>
    )

    return (
        <div>
            <Header />
            <div className="container account">
                <div className="row">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <div className="col-md-2 content-box-1">
                            <div className="nav-account-button">
                                <Nav variant="pills" >
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Th??ng tin t??i kho???n</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">????n h??ng</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="three">?????a ch???</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </div>

                        <div className="col-md-9 content-box-2">
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div className="container">
                                        <div>
                                            <h2>Th??ng tin t??i kho???n</h2>
                                            <p>Qu???n l?? th??ng tin t??i kho???n ????? b???o m???t</p>
                                        </div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <h4>Th??ng tin chi ti???t</h4>
                                                        <div className="col-md-2">
                                                            <p>T??n ????ng nh???p</p>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <p>{user.userName}</p>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <p>T??n</p>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <p>{user.full_name}</p>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <p>Ng??y sinh</p>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <p>{user.birthday}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <div>
                                        <div className="nav-order">

                                            <Nav variant="pills" defaultActiveKey="event-1">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-1" onClick={()=>setStatusOrder("alls")}>T???t c???</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-2" onClick={()=>setStatusOrder("Ch??? x??c nh???n")}>Ch??? x??c nh???n</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-3"  onClick={()=>setStatusOrder("???? x??c nh???n")}>???? x??c nh???n</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-4"  onClick={()=>setStatusOrder("??ang giao")}>??ang giao</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-5"  onClick={()=>setStatusOrder("???? giao")}>???? giao</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-6"  onClick={()=>setStatusOrder("???? h???y")}>???? h???y</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </div>


                                        <div>
                                            {showListOrder}
                                        </div>

                                    </div>
                                </Tab.Pane>

                                <Tab.Pane eventKey="three">
                                    <div className="container">
                                        <div className="m-address-header">
                                            <div className="address-header-1" >
                                                <h2>?????a ch??? c???a t??i</h2>
                                                <p>Qu???n l?? th??ng ?????a ch??? nh???n h??ng</p>
                                            </div>
                                            <div className="address-header-2" >
                                                <button className="account-btn" onClick={() => setShowNewAddress(true)}>Th??m ?????a ch???</button>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="m-address-detail">
                                                {showListAddress}
                                            </div>
                                        </div>
                                        <Modal
                                            size="md"
                                            show={showNewAddress}
                                            onHide={() => setShowNewAddress(false)}
                                            aria-labelledby="model-new-address"
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="model-new-address">
                                                    Th??m ?????a ch???
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <Form.Group controlId='name' className='mb-3'>
                                                                <Form.Label>T??n ng?????i nh???n</Form.Label>
                                                                <Form.Control type="text" size="sm" name="name" onChange={(e) => setAddress({ ...address, name: e.target.value })} />
                                                            </Form.Group>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <Form.Group controlId='name' className='mb-3'>
                                                                <Form.Label>S??? ??i???n tho???i</Form.Label>
                                                                <Form.Control type="text" size="sm" name="sdt" onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })} />
                                                            </Form.Group>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <Form.Group controlId='name' className='mb-3'>
                                                                <Form.Label>T???nh/Th??nh ph???</Form.Label>
                                                                <Form.Control type="text" size="sm" onChange={(e) => setAddress({ ...address, province: e.target.value })} />
                                                            </Form.Group>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <Form.Group controlId='name' className='mb-3'>
                                                                <Form.Label>Qu???n/Huy???n</Form.Label>
                                                                <Form.Control type="text" size="sm" onChange={(e) => setAddress({ ...address, district: e.target.value })} />
                                                            </Form.Group>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <Form.Group controlId='name' className='mb-3'>
                                                                <Form.Label>Ph?????ng/X??</Form.Label>
                                                                <Form.Control type="text" size="sm" onChange={(e) => setAddress({ ...address, wards: e.target.value })} />
                                                            </Form.Group>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <Form.Group controlId='name' className='mb-3'>
                                                                <Form.Label>?????a ch??? chi ti???t</Form.Label>
                                                                <Form.Control type="textarea" size="sm" onChange={(e) => setAddress({ ...address, detail: e.target.value })} />
                                                            </Form.Group>
                                                        </div>
                                                        <div className="btn-new-address col-md-12">
                                                            <button onClick={() => createAddress()}>Th??m</button>
                                                        </div>
                                                    </div>
                                                </Form>

                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                    </Tab.Container>
                </div>
            </div>

            <Footer />
        </div >
    )
}