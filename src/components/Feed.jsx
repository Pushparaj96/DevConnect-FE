import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch , useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {

  const dispatch = useDispatch();
  const feedData = useSelector(store=>store.feed);

  const fetchFeed = async()=>{

    if(feedData) return;

    try {
      const response = await axios.get(`${BASE_URL}/user/feed`,{withCredentials:true});
      dispatch(addFeed(response?.data?.data));
      
    } catch (error) {
      console.log(error.message);
      
    }
  }

  useEffect(()=>{
    fetchFeed();
  },[])


  return feedData && (
    <div className="flex justify-center mt-12">
        <UserCard user={feedData[1]}/>
    </div>
  )
}

export default Feed;