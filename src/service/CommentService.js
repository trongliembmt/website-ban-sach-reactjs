import axiosClient from "../api/axiosClient"

class CommentService {
   

    sendComment(data){
        let url = "http://localhost:8080/api/cmt"
        return axiosClient.post(url,data)
    }

    getCommentByProductId(id){
        let url = "http://localhost:8080/api/cmt/"+id
        return axiosClient.get(url)
    }


}

export default CommentService