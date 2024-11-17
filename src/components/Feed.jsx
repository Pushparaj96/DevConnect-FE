import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch , useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {

  const dispatch = useDispatch();
  const feedData = useSelector(store=>store.feed);

  const fetchFeed = async()=>{
    if(feedData) return null;
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


  return (
    <div>
        <h2>This is your Feed</h2>
    </div>
  )
}

export default Feed;