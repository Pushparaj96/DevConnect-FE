import { Outlet , useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch , useSelector } from 'react-redux';
import { addUser } from "../utils/userSlice";
import { useEffect } from 'react';

const Body = () => {

  const dispatch = useDispatch();
  const userData = useSelector(store=>store.user);
  const navigate = useNavigate();

  const fetchUser = async ()=>{
    try {
      if(userData) return null; // if the user data already present in store return the function

      const response = await axios.get(`${BASE_URL}/profile/view`,{withCredentials:true});
      const {data} = response;
      dispatch(addUser(data));
    } catch (error) {
        if(error.status === 401){
          navigate("/login");
        }
        console.log(error);
        
    }
  }

  useEffect(()=>{
    fetchUser();
  },[])

  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body;