
import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';

import BookService from '../../service/BookService';





export default function NewProductForm() {

    const initialValues = {
        name: "",
        image: [],
        author: "",
        typeOfBook: "",
        description: "",
        price:""
    }
    
    const [formValue,setFormValue] = useState(initialValues);

    const [result, setResult] = useState("");


    const handelChange = (e)=>{
        const {name,value} = e.target;
        setFormValue({...formValue,[name]:value})
    }

    function uploader(e) {
        const imageFile = e.target.files[0];

        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
            setResult(e.target.result);
        });
        reader.readAsDataURL(imageFile);
    }


    const choseFile = (event) => {
        uploader(event)
    }
    const bookService = new BookService();


    function postApi(book){
        return bookService.newBook(book);
    }

    const submitt = ()=>{
        const book ={
            name:formValue.name,
            image:result,
            author:formValue.author,
            typeOfBook:formValue.typeOfBook,
            price:formValue.price,
            description:formValue.description
        }

        

        const formdata = new FormData();
        formdata.append("name",book.name)
        formdata.append("image",book.image)
        formdata.append("author",book.author)
        formdata.append("typeOfBook",book.typeOfBook)
        formdata.append("price",book.price)
        formdata.append("description",book.description)

        postApi(formdata).then(()=>console.log(book));
    }

    return (
        <div className="container">
            <Form>
                <div className="row">
                    <div className="col-md-6">
                        <div className='new-image'>
                            <img src={result} alt=""></img>
                        </div>
                        <div>
                            <Form.Group controlId='image' className='mb-3'>
                                <Form.Control type="file" size="sm" onChange={choseFile} />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div>
                            <Form.Group controlId='name' className='mb-3'>
                                <Form.Label>Tên</Form.Label>
                                <Form.Control type="text" size="sm" name="name" value={formValue.name} onChange={handelChange} />
                            </Form.Group>

                            <Form.Group controlId='author' className='mb-3'>
                                <Form.Label>Tác giả</Form.Label>
                                <Form.Control type="text" size="sm" name="author" value={formValue.author} onChange={handelChange} />
                            </Form.Group>

                            <Form.Group controlId='typeOfBook' className='mb-3'>
                                <Form.Label>Thể loại</Form.Label>
                                <Form.Control type="text" size="sm" name="typeOfBook" value={formValue.typeOfBook} onChange={handelChange} />
                            </Form.Group>

                            <Form.Group controlId='price' className='mb-3'>
                                <Form.Label>Giá</Form.Label>
                                <Form.Control type="text" size="sm" name="price" value={formValue.price} onChange={handelChange} />
                            </Form.Group>

                        </div>

                    </div>
                </div>

                <div >
                    <Form.Group controlId='description' className='mb-3'>
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control type="text" as="textarea" size="sm" name="description" value={formValue.description} onChange={handelChange}  />
                    </Form.Group>
                </div>


            </Form>
            <div>
                <button className='new-btn' onClick={submitt} >Thêm</button>
            </div>

        </div>
    )
}