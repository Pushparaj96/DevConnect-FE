import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useSelector , useDispatch } from "react-redux";
import { useEffect } from "react";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {

    const dispatch = useDispatch();
    const userConnections = useSelector(store=>store.connections);

    const fetchConnections = async()=>{
        try {
            const response = await axios.get(`${BASE_URL}/user/connections`,{withCredentials:true});
            dispatch(addConnections(response?.data?.data));
        } catch (error) {
            console.log(error.message);
            
        }
    }

    useEffect(()=>{
        fetchConnections();
    },[]);

    if(!userConnections) return ;

    if(userConnections.length === 0) return <div className="flex justify-center mt-5 min-h-screen"><h2>No Connections Found!</h2></div>

  return (
    <div className="min-h-screen">
        <h2 className="text-center my-5 text-2xl font-semibold">Your Connections...</h2>
        <div className="flex flex-col gap-5 items-center">
            {
                userConnections.map(connection=>{
                    const { _id , firstName , lastName , gender , age , bio , photoUrl , skills } = connection;
                    return (
                        <div key={_id} className="w-11/12 sm:w-9/12 md:w-7/12 lg:w-6/12 flex bg-base-300 rounded-lg shadow-lg shadow-slate-700 whitespace-nowrap overflow-hidden text-ellipsis">
                            <div className="w-5/12 sm:w-4/12 md:w-3/12 p-3 flex justify-center">
                                <img alt="profile-pic" className="w-[130px] h-[130px] object-cover rounded-full" src={photoUrl}/>
                            </div>
                            <div className="w-7/12 sm:w-8/12 md:w-9/12 p-3 flex flex-col gap-1 justify-center">
                                {
                                    firstName && lastName && 
                                    <h2 className="text-xl font-semibold">{`${firstName} ${lastName}`}</h2>
                                }
                                {
                                    gender && age && 
                                    <p className="text-base">{`${age} , ${gender.charAt(0).toUpperCase()+gender.slice(1).toLowerCase()}`}</p>
                                }
                                {
                                    skills && 
                                    <p className="text-base">{skills.toString()}</p>
                                }
                                {
                                    bio && 
                                    <p className="text-base">{bio}</p>
                                }
                            </div>
                            
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Connections;