import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [ formData , setFormData ] = useState({
    emailId:"gg@gmail.com",
    password:"Pass@123"
  });
  const [ formError , setFormError ] = useState({});
  const [authError,setAuthError] = useState(null);
  const dispatch  = useDispatch();
  const navigate = useNavigate();

  const handleFormChange = (e) =>{
    const { name , value } = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  };

  const validateLoginForm = ()=>{

    const { emailId , password } = formData;
    const errors = {};

    const emailPattern = /^[a-zA-Z0-9.-]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/ ;

    // email Validation
    if(!emailId){
      errors.emailId = "Required";
    }else if(!emailPattern.test(emailId)){
      errors.emailId = "Invalid Email Id";
    }

    // password validation
    if(!password){
      errors.password = "Required";
    }

    setFormError(errors);

    // returns true if no error , otherwise return false
    return Object.keys(errors).length === 0 ;

  }

  const handleLogin = async ()=>{

    if(!validateLoginForm()) return;

    const { emailId , password } = formData;

      try {
        const response = await axios.post(`${BASE_URL}/login`,{
          emailId,
          password
        },
      {withCredentials:true}
      );
      const {data:{data:loggenInUser}} = response;
      
      dispatch(addUser(loggenInUser));
      navigate("/");

      } catch (error) {
        setAuthError(error?.response?.data);
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
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleFormChange}
                />
              </dd>
              {formError.emailId && 
              <dd className="text-red-600">
                {formError.emailId}
              </dd>
              }
              <dt className="font-medium">Password</dt>
              <dd>
               <input
                  type="text"
                  className="input input-bordered input-primary w-full max-w-xs"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                />
              </dd>
              {formError.password && 
              <dd className="text-red-600">
                {formError.password}
              </dd>
              }
              <dd className="text-red-600 my-1">{authError}</dd>
            </dl>
              <div className="flex justify-center">
              <button className="mt-6 bg-primary py-2 w-3/4 rounded-md text-lg font-medium hover:opacity-80 text-slate-950" onClick={handleLogin}>LogIn</button>
              </div>
          </form>
        </div>
      </div>
  );
};

export default Login;
