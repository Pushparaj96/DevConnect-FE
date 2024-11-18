import { addReceivedRequests , removeReviewedRequest } from "../utils/requestsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Requests = () => {

  const fetchReceivedRequests = async()=>{
    try {
      const response = await axios.get(`${BASE_URL}/user/requests/received`,{withCredentials:true});
      console.log(response?.data?.data);
      
    } catch (error) {
      console.log(error.message);
      
    }
  }

  useEffect(()=>{
    fetchReceivedRequests();
  },[])

  return (
    <div>Requests</div>
  )
}

export default Requests;