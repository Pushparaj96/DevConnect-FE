import { addReceivedRequests , removeReviewedRequest } from "../utils/requestsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Requests = () => {

  const dispatch = useDispatch();
  const receivedRequests = useSelector(store=>store.requests);

  const fetchReceivedRequests = async()=>{
    try {
      const response = await axios.get(`${BASE_URL}/user/requests/received`,{withCredentials:true});
      dispatch(addReceivedRequests(response?.data?.data))
      
    } catch (error) {
      console.log(error.message);
      
    }
  }

  const reviewRequest = async (status,requestId)=>{
      try {
        await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`,{},{withCredentials:true});
        dispatch(removeReviewedRequest(requestId));
      } catch (error) {
        console.log(error.message);
        
      }
  }

  useEffect(()=>{
    fetchReceivedRequests();
  },[]);

  if(!receivedRequests) return ;

  if(receivedRequests.length === 0) return <div className="flex justify-center my-5 min-h-screen text-xl font-semibold"><h2>You Have 0 Requests!</h2></div>

  return (
    <div className="min-h-screen">
        <h2 className="text-center my-5 text-2xl font-semibold">Pending Requests...</h2>
        <div className="flex flex-col gap-5 items-center">
            {
                receivedRequests.map(request=>{
                    const { _id:reqId , senderId:{firstName,lastName,gender,age,bio,photoUrl,skills} } = request;
                    return (
                        <div key={reqId} className="w-11/12 sm:w-9/12 md:w-7/12 lg:w-6/12 flex bg-base-300 rounded-lg shadow-lg shadow-slate-700 whitespace-nowrap overflow-hidden text-ellipsis">
                            <div className="w-3/12 sm:w-3/12 md:w-3/12 p-3 flex justify-center">
                                <img alt="profile-pic" className="w-[100px] md:w-[130px] h-[100px] md:h-[130px] object-cover rounded-full" src={photoUrl}/>
                            </div>
                            <div className="w-5/12 sm:w-6/12 md:w-6/12 p-3 flex flex-col gap-1 justify-center">
                                {
                                    firstName && lastName && 
                                    <h2 className="text-lg md:text-xl font-semibold text-rose-700">{`${firstName} ${lastName}`}</h2>
                                }
                                {
                                    gender && age && 
                                    <p className="text-base">{`${age} , ${gender.charAt(0).toUpperCase()+gender.slice(1).toLowerCase()}`}</p>
                                }
                                {
                                    skills && 
                                    <p className="text-base hidden md:block overflow-hidden text-ellipsis">{skills.toString()}</p>
                                }
                                {
                                    bio && 
                                    <p className="text-base hidden md:block overflow-hidden text-ellipsis">{bio}</p>
                                }
                            </div>
                            <div className="w-4/12 sm:w-3/12 md:w-3/12 p-3 flex justify-start md:justify-center items-center gap-4 flex-shrink-0">
                                <button onClick={()=>reviewRequest("rejected",reqId)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} className="size-7 sm:size-8 md:size-10 stroke-red-700">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                  </svg>
                                </button>
                                <button onClick={()=>reviewRequest("accepted",reqId)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} className="size-7 sm:size-8 md:size-10 stroke-green-700">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                  </svg>
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Requests;