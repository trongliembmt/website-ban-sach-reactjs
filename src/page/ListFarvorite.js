import { useEffect, useState } from "react"
import Footer from "../component/Footer";
import Header from "../component/Header";
import FarvoriteService from "../service/FarvoriteService"
import "../css/favorite.css"


export default function ListFarvorite() {



    const favService = new FarvoriteService();


    const [list, setList] = useState([]);
    const uID = parseInt(localStorage.getItem("userId"));

    useEffect(() => {
        favService.getList(uID).then((data) => {
            setList(data)
        })
    }, [])

    function removeItem(id) {
        favService.deleteFarvoriteBook(id).then((data) => {
            getApi();
        })
    }

    function getApi() {
        favService.getList(uID).then((data) => {
            setList(data)
        })
    }


    const showProduct = list.map((item, index) =>
        <div key={index} className="fav-box col-md-12" >
            <div className="row">
                <div className="col-md-9 fav-content-1">
                    <img src={item.book.image} alt="" />
                    <div className="fav-content-detail">
                        <h3>{item.book.name}</h3>
                        <p>Giá: <span>{item.book.price}đ</span></p>
                        <p>Tác giả: {item.book.author.join(" | ")}</p>
                    </div>

                </div>

                <div className="col-md-3 fav-content-2">
                    <div><button onClick={() => removeItem(item.id)}>xóa</button></div>

                </div>

            </div>
        </div>

    )


    return (
        <div>
            <Header />
            <div>

            </div>
            <div className="container">
                <div className="box-fav">
                    <div className="fav-header">
                        <h1>Danh sách yêu thích</h1>
                    </div>
                    <div className="row">
                        {showProduct}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}