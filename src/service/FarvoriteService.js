import axiosClient from "../api/axiosClient"

class FarvoriteService {

    getList(id){
        let url = "http://localhost:8080/api/favorite/"+id
        return axiosClient.get(url);
    }
    

    addToFarvoriteList(data){
        let url = "http://localhost:8080/api/favorite"
        return axiosClient.post(url,data);
    }

    deleteFarvoriteBook(id){
        let url = "http://localhost:8080/api/favorite/"+id
        return axiosClient.delete(url)
    }


}

export default FarvoriteService