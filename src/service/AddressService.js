
import axiosClient from "../api/axiosClient"


class AddressService{


    getAddressByUserId(id){
        let url = "http://localhost:8080/api/address/"+id
        return axiosClient.get(url)
    }

    addAddress(data){
        let url = "http://localhost:8080/api/address"
        return axiosClient.post(url, data)
    }

    deleteAddress(id){
        let url = "http://localhost:8080/api/address/"+id
        return axiosClient.delete(url)
    }

    updateAddress(id,data){
        let url = "http://localhost:8080/api/address/"+id
        return axiosClient.put(url,data)
    }
}

export default AddressService