import axiosClient from "../api/axiosClient"

class CartService{

    getCartByIdUser(id){
        let url = "http://localhost:8080/api/cartitem/"+id
        return axiosClient.get(url)
    }

    addItemToCart(data){
        let url = "http://localhost:8080/api/cartitem"
        return axiosClient.post(url,data)
    }

    removeItem(id){
        let url = "http://localhost:8080/api/cartitem/"+id
        return axiosClient.delete(url)
    }

    updateCartItem(item){
        let url = "http://localhost:8080/api/cartitem/"+item.id
        return axiosClient.put(url,item);

    }
}

export default CartService