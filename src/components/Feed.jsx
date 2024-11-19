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
  },[]);

  if(!feedData) return ;

  if(feedData.length === 0) return <div className="flex justify-center mt-5 text-rose-400 text-xl"><h2>No New Users Found...</h2></div>


  return(
    <div className="flex justify-center mt-12">
        <UserCard user={feedData[0]}/>
    </div>
  )
}

export default Feed;