import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const UserCard = ({user}) => {

    const dispatch = useDispatch();
    const { _id:feedUserId , firstName , lastName , gender , age , photoUrl ,skills , bio} = user;

    // to find the Route 
    const location = useLocation();
    const isProfileRoute = location.pathname === "/profile" ;

    const handleFeedUserClick = async (status,userId)=>{
      // disabled api calls because it's user card , he can't send ignore/interest to himself
      if(isProfileRoute) return; 
      try {
        await axios.post(`${BASE_URL}/request/send/${status}/${userId}`,{},{withCredentials:true});
        dispatch(removeUserFromFeed(feedUserId));
      } catch (error) {
        console.log(error.message);
        
      }
    }

  return (
    <div className="card card-compact bg-base-300 w-96 shadow-xl mb-10">
    <figure>
    <img
      src={photoUrl}
      alt="pics" 
      className="h-72 w-full p-3"
      />
    </figure>
     <div className="card-body">
    <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
    { age && gender && <p>{`${age} , ${gender.charAt(0).toUpperCase()+gender.slice(1).toLowerCase()}`}</p>}
    { bio && <p>{bio}</p>}
    { skills && <p>{skills.toString()}</p>}
    <div className="card-actions justify-center mt-2">
        <button
         className={`btn btn-error text-base ${isProfileRoute?"cursor-not-allowed":""}`} onClick={()=>handleFeedUserClick("ignored",feedUserId)}
         >Ignore</button>
        <button
         className={`btn btn-success text-base ${isProfileRoute?"cursor-not-allowed":""}`} onClick={()=>handleFeedUserClick("interested",feedUserId)}
         >Interested</button>
    </div>
     </div>
    </div>
  )
}

export default UserCard;