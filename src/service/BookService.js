import axiosClient from "../api/axiosClient"

class BookService {

    


    getAll = ()=>{
        const url = 'http://localhost:8080/api/book'
        return axiosClient.get(url);
    }

    newBook = (book)=>{
        const url = 'http://localhost:8080/api/book'
        return axiosClient.post(url,book);
    }

    deleteBook=(id)=>{
        const url = 'http://localhost:8080/api/book/'+id;
        return axiosClient.delete(url);
    }

    getByPagination(filter){
        const url = 'http://localhost:8080/api/book/pagination';
        return axiosClient.post(url,filter);
    }   

    getBookById= (id)=>{
        const url = 'http://localhost:8080/api/book/'+id;
        return axiosClient.get(url);
    }
    
}


export default BookService;