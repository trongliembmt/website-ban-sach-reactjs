
import axiosClient from "../api/axiosClient";

class SellingService{
    getAll = ()=>{
        const url="http://localhost:8080/api/selling";
        return axiosClient.get(url);
    }
}

export default SellingService;