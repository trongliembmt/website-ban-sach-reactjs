import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddressService from "../service/AddressService"
import { removeItem, removeAll } from "../app/ListCartItem"
import OrderService from "../service/OrderService"
import Header from "../component/Header"
import Footer from "../component/Footer"
import Modal from 'react-bootstrap/Modal';
import { RadioButton } from 'primereact/radiobutton';
import "../css/checkout.css"



export default function Checkout() {
    const listCartItem = useSelector(state => state.listCartItem.list)
    const user = JSON.parse(localStorage.getItem("user"))
    const addressService = new AddressService()
    const orderService = new OrderService()
    const dispath = useDispatch()

    const [listAddress, setListAddress] = useState([])
    const [selectAddress, setSelectAddress] = useState(0)
    const [showChangeAddress,setShowChangeAddress] = useState(false);


    useEffect(() => {
        addressService.getAddressByUserId(user.id).then((data) => {
            setListAddress(data)
        })
    }, [])



    function deleteCartItem(item) {
        dispath(removeItem(item))
    }

    function createOrder() {

        if (selectAddress === 0) {
            console.log("hãy chọn địa chỉ nhận hàng")
        }
        const current = new Date();
        const time = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()} | ${current.getHours()}:${current.getMinutes()}`;


        let order = {
            user_id: user.id,
            address_id: selectAddress.id,
            list_products: convertListProductToString(listCartItem),
            status: "Chờ xác nhận",
            create_day: time
        }

        orderService.createOrder(order).then((data) => {
            console.log(data)
        })
    }

    function defaultAddress() {
        if(selectAddress === 0){
            return(<p>Chưa chọn địa chỉ</p>)
        }else{
            return(<p>Đã chọn địa chỉ :  <strong>{selectAddress.name} - {selectAddress.phoneNumber}</strong>  - {selectAddress.detail}, {selectAddress.wards}, {selectAddress.district}, {selectAddress.province}</p>)
        }
    }

    function checkSelectAddress(item){
        if(item === 0){
            return listAddress[0].id;
        }else{
            return item.id;
        }
        
    }

    function convertListProductToString(list) {
        var result = ""
        for (var i = 0; i < list.length; i++) {
            result += list[i].book.id + "-" + list[i].qty + ";"
        }
        return result;
    }



    const showAddress = listAddress.map((item, index) =>
        <div key={index} className="field-radiobutton">
             <RadioButton inputId={item.id} name="address" value={item} onChange={(e) => setSelectAddress(e.value)}  checked={checkSelectAddress(selectAddress) === item.id}/>
                                <label htmlFor={item.id}>
                                    <strong>{item.name} - {item.phoneNumber}</strong> 
                                    - {item.detail}, {item.wards}, {item.district}, {item.province}

                                </label>
        </div>
    )

    const showListProduct = listCartItem.map((item, index) =>
        <tr key={index}>
            <td>
                <div className="img">
                    <a><img style={{ height: '100px', width: '80px' }} src={item.book.image} alt="" /></a>
                    <p>{item.book.name}</p>
                </div>
            </td>
            <td>
               
                <p>{item.book.price}đ</p>
            </td>

            <td>
            <p>{item.qty}</p>
            </td>
            <td>
                <p> {item.book.price * item.qty}đ</p>
            </td>
            <td>
                <button onClick={() => deleteCartItem(item)}><i className="pi pi-trash"></i></button>
            </td>
        </tr>

    )

    function totalOrder(){
        let t = 0
        for (const item of listCartItem) {
            t+= item.book.price * item.qty
        }
        return t;
    }


    return (
        <div>
            <Header></Header>
            <div className="checkout">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="checkout-inner">
                                <div className="chose-address">
                                    <div className="title">
                                        <h4>Địa chỉ nhận hàng</h4>
                                        <button onClick={()=>setShowChangeAddress(true)}>Thay đổi</button>

                                        <Modal
                                            size="md"
                                            show={showChangeAddress}
                                            onHide={() => setShowChangeAddress(false)}
                                            aria-labelledby="model-new-address"
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="model-new-address">
                                                    Thay đổi địa chỉ nhận hàng
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div>
                                                    {showAddress}
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                    {defaultAddress()}
                                </div>

                                <div className="list-pro">
                                    <h4>Sản phẩm</h4>
                                    <div className="table-reponsive">
                                        <table className="table table-bordered">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th>Sản phẩm</th>
                                                    <th>Đơn giá</th>
                                                    <th>Số lượng</th>
                                                    <th>Thành tiền</th>
                                                    <th>Xóa</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {showListProduct}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="voucher">
                                    <div className="t-voucher">
                                        <h4>Mã giảm giá</h4>
                                        <button className="v-btn">Chọn mã giảm giá</button>
                                    </div>
                                    <p className="v-discount">Chưa áp dụng mã giảm giá</p>
                                </div>

                                <div className="payment-method">
                                    <div className="p-title">
                                        <h5>Phương thức thanh toán</h5>
                                    </div>
                                    <div className="p-content">

                                    </div>
                                </div>

                                <div className="cart-total">
                                    <div className="c-content-1">
                                        <p>Tổng tiền sản phẩm</p>
                                        <p>Mã giảm giá:</p>
                                        <p>Phí vận chuyển:</p>
                                        <p>Tổng thanh toán:</p>
                                    </div>
                                    <div className="c-content-2">
                                        <p>{totalOrder()}đ</p>
                                        <p>0</p>
                                        <p>30000đ</p>
                                        <p className="total-price">{totalOrder() + 30000}đ</p>
                                    </div>
                                </div>

                                <div className="checkout-footer">
                                    <p>Nhấn đặt hàng đồng nghĩa với việc bạn đồng ý tuân theo điều khoản của chúng tôi.</p>
                                    <button className="btn-checkout" onClick={createOrder}>Đặt hàng</button>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}