import React, { useState, useEffect } from "react"
import "../css/product.css";

import { Paginator } from 'primereact/paginator';

import BookCard from "../component/BookCard";
import CheckBox from "../component/CheckBox";
import BookService from "../service/BookService";
import Header from "../component/Header";
import Footer from "../component/Footer";


export default function Products() {




    const [first, setFirst] = useState(0);
    const onBasicPageChange = (event) => {
        setFilter({ ...filter, page: event.page + 1 })
        setFirst(event.first);
    }


    const initFilter = {
        typeOfBook: [],
        author: [],
        page: 1,
        size: 8,
        name: ""
    }

    const author = [
        {
            display: "Loại 1",
            author: "bao-kaka"
        },
        {
            display: "Loại 2",
            author: "nomal"
        },
        {
            display: "Loại 3",
            author: "Special"
        }
    ]

    const category = [
        {
            display: "Kinh dị",
            type: "Kinh dị"
        },
        {
            display: "Tiểu thuyết",
            type: "Tiểu thuyết"
        },
        {
            display: "Văn học",
            type: "Văn học"
        }
    ]



    const bookService = new BookService();

    const [products, setProduct] = useState([]);
    const [filter, setFilter] = useState(initFilter)
    const [totalProduct, setTotalProduct] = useState(0);


    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case "TYPE":
                    setFilter({ ...filter, typeOfBook: [...filter.typeOfBook, item.type] })
                    break
                case "AUTHOR":
                    setFilter({ ...filter, author: [...filter.author, item.author] })
                    break
                default:
            }
        } else {
            switch (type) {
                case "TYPE":
                    const newCategory = filter.typeOfBook.filter(e => e !== item.type)
                    setFilter({ ...filter, typeOfBook: newCategory })
                    break
                case "AUTHOR":
                    const newAuthor = filter.author.filter(e => e !== item.author)
                    setFilter({ ...filter, author: newAuthor })
                    break
                default:
            }
        }
    }

    function Update() {
        return filter;
    }

    useEffect(() => {
        bookService.getByPagination(Update()).then((data) => {
            setProduct(data.list)
            setTotalProduct(data.numberOfItems)
        })
    }, [filter])// eslint-disable-line react-hooks/exhaustive-deps



    const showProduct = products
        .map((item, index) =>
            <div key={index} className="col-md-3">
                <BookCard  book={item}></BookCard>
            </div>
        )

    const clearFilter = () => setFilter(initFilter)


    return (
        <div>
            <Header />
            <div className="listing-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="category-listing">
                                <div className="single-listing">
                                    <div className="select-Categories pb-30">
                                        <div className="small-tittle mb-20">
                                            <h4>Lọc theo thể loại</h4>
                                        </div>
                                        {category.map((item, index) =>
                                            <div key={index}>
                                                <CheckBox
                                                    label={item.display}
                                                    onChange={(input) => filterSelect("TYPE", input.checked, item)}
                                                    checked={filter.typeOfBook.includes(item.type)}
                                                />
                                            </div>
                                        )}

                                        <div className="small-tittle mb-20">
                                            <h4>Lọc theo tác giả</h4>
                                        </div>
                                        {author.map((item, index) =>
                                            <div key={index}>
                                                <CheckBox
                                                    label={item.display}
                                                    onChange={(input) => filterSelect("AUTHOR", input.checked, item)}
                                                    checked={filter.author.includes(item.author)}
                                                />
                                            </div>
                                        )}

                                        <div className="small-tittle">
                                            <button className="btn" onClick={clearFilter}>Xóa bộ lọc</button>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-9">
                            <div className="row">
                                <div className="product-view-top">
                                    <div className="col-md-12">
                                        <div className="product-search">
                                            <input type="text" placeholder="Nhập tên sách để tìm kiếm" onChange={(e) => setFilter({ ...filter, name: e.target.value })} />
                                            <button><i className="pi pi-search" ></i></button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="row">
                                {showProduct}
                            </div>
                            <div>

                                <Paginator first={first} rows={8} totalRecords={totalProduct} onPageChange={onBasicPageChange}></Paginator>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>




    )
}