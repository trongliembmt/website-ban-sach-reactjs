import axiosClient from "../api/axiosClient"



class UserService{

    login(datalogin){
        let url = "http://localhost:8080/api/login"
        return axiosClient.post(url, datalogin);
    }

    logOut(){
        localStorage.removeItem('accessToken');
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
    }

    register(data){
        let url = "http://localhost:8080/api/register"
        return axiosClient.post(url,data);
    }

    setToken(data){
        localStorage.setItem('accessToken',JSON.stringify(data));
    }

    getToken(){
        return JSON.parse(localStorage.getItem("accessToken"));
    }

    checkExistUser(username){
        let url = "http://localhost:8080/api/register/check/"+username;        
        return axiosClient.get(url);
    }

    getUserByUserName(username){
        let url ="http://localhost:8080/api/user/"+username
        return axiosClient.get(url);
    }

    setUserId(username){
        const userService = new UserService();
        userService.getUserByUserName(username).then((data)=>{
            localStorage.setItem("userId",data.id)
            localStorage.setItem("user",JSON.stringify(data))
        })
    }


}

export default UserService;