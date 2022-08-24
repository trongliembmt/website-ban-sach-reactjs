import axiosClient from "../api/axiosClient"


class OrderService{

    getOrderByUserId(id){
        let url = "http://localhost:8080/api/order/"+id
        return axiosClient.get(url)
    }

    createOrder(data){
        let url = "http://localhost:8080/api/order"
        return axiosClient.post(url,data)
    }

    updateOrder(data){
        let url = "http://localhost:8080/api/order"
        return axiosClient.put(url,data)
    }

    deleteOrder(id){
        let url = "http://localhost:8080/api/order/"+id
        return axiosClient.delete(url)
    }

}

export default OrderService