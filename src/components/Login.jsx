import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [emailId,setEmailId] = useState("gg@gmail.com");
  const [password,setPassword] = useState("Pass@123");
  const dispatch  = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async ()=>{
      try {
        const response = await axios.post(`${BASE_URL}/login`,{
          emailId,
          password
        },
      {withCredentials:true}
      );
      const {data:{data:loggenInUser}} = response;
      
      dispatch(addUser(loggenInUser));
      navigate("/feed");

      } catch (error) {
        console.log(error.message);
        
      }
  }

  return (
      <div className="flex justify-center">
        <div className="mt-[22%] sm:mt-[18%] md:mt-[10%] lg:mt-[6%] bg-base-300 p-8 rounded-xl w-9/12 sm:w-6/12 md:w-5/12 tablet:w-4/12 lg:w-1/4 shadow-md shadow-gray-600">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="text-xl font-medium flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span className="ms-1 text-2xl">Login</span>
            </div>
            <dl className="space-y-3">
              <dt className="font-medium">Email ID</dt>
              <dd>
                <input
                  type="text"
                  className="input input-bordered input-primary w-full max-w-xs"
                  value={emailId}
                  onChange={(e)=>setEmailId(e.target.value)}
                />
              </dd>
              <dt className="font-medium">Password</dt>
              <dd>
               <input
                  type="text"
                  className="input input-bordered input-primary w-full max-w-xs"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </dd>
            </dl>
              <div className="flex justify-center">
              <button className="mt-8 bg-primary py-2 w-3/4 rounded-md text-lg font-medium hover:opacity-80 text-slate-950" onClick={handleLogin}>LogIn</button>
              </div>
          </form>
        </div>
      </div>
  );
};

export default Login;
