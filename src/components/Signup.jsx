import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate , Link } from "react-router-dom";

const Signup = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ formData , setFormData ] = useState({
        firstName:"",
        lastName:"",
        emailId:"",
        password:""
    });

    const { firstName , lastName , emailId , password } = formData;
    const [ formErrors , setFormErrors ] = useState({});


    const handleFormChange = (e)=>{
        const { name , value } = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    };

    const validationSchema = Yup.object({
        firstName:Yup.string().matches(/[a-zA-Z.]+/,"Invalid firstname").required("Fill this field"),
        lastName:Yup.string().matches(/[a-zA-Z.]+/,"Invalid lastname").required("Fill this field"),
        emailId:Yup.string().matches(/^[a-zA-Z0-9.-]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/,"Invalid Email").required("Fill this field"),
        password:Yup.string().matches(/(?=.*[a-z])/,"min one lowercase").matches(/(?=.*[A-Z])/,"min one Upper case").matches(/(?=.*[0-9])/,"min one number").matches(/(?=.*[\W])/,"min one Special char").matches(/^(?!.*\s)/,"Space not allowed").min(8,"min 8 char long").max(12,"max 12 char long").required("Fill this field")
    })

    const validateSignupForm = async()=>{
        try {
            await validationSchema.validate(formData,{abortEarly:false});
            // if validation is successfull , reseting errors and returning true
            setFormErrors({});
            return true;
        } catch (errors) {
            const newErrors = {};
            errors.inner.map(error=>newErrors[error.path]=error.message);
            setFormErrors(newErrors);
        }
    };

    const handleSignupClick = async()=>{
        try {
            const isValidSignup = await validateSignupForm();
            if(!isValidSignup) return ;

            const response = await axios.post(`${BASE_URL}/signup`,{
              firstName,
              lastName,
              emailId,
              password
            },{withCredentials:true});

            const { data } = response?.data;
            dispatch(addUser(data));
            navigate("/profile");


        } catch (error) {
            setFormErrors({
                ...formErrors,
                ["serverError"]:error.message
            })
            console.log(error.message);
        }
    }



  return (
    <div className="flex justify-center mb-28">
      <div className="mt-[18%] sm:mt-[15%] md:mt-[7%] lg:mt-[3%] bg-base-300 p-8 rounded-xl w-9/12 sm:w-6/12 md:w-5/12 tablet:w-4/12 lg:w-1/4 shadow-md shadow-gray-600">
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
            <span className="ms-1 text-2xl">SignUp</span>
          </div>
          <dl className="space-y-3">
          <dt className="font-medium">First Name</dt>
            <dd>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-xs"
                name="firstName"
                value={firstName}
                onChange={handleFormChange}
              />
            </dd>
            {
                formErrors.firstName && 
                <dd className="text-red-600">{formErrors.firstName}</dd>
            }
            <dt className="font-medium">Last Name</dt>
            <dd>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-xs"
                name="lastName"
                value={lastName}
                onChange={handleFormChange}
              />
            </dd>
            {
                formErrors.lastName && 
                <dd className="text-red-600">{formErrors.lastName}</dd>
            }
            <dt className="font-medium">Email ID</dt>
            <dd>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-xs"
                name="emailId"
                value={emailId}
                onChange={handleFormChange}
              />
            </dd>
            {
                formErrors.emailId && 
                <dd className="text-red-600">{formErrors.emailId}</dd>
            }
            <dt className="font-medium">Password</dt>
            <dd>
             <input
                type="password"
                className="input input-bordered input-primary w-full max-w-xs"
                name="password"
                value={password}
                onChange={handleFormChange}
              />
            </dd>
            {
                formErrors.password && 
                <dd className="text-red-600">{formErrors.password}</dd>
            }
            {
                formErrors.serverError && 
                <dd className="text-red-600">{formErrors.serverError}</dd>
            }
            <dd className="pt-1 text-base font-semibold">Existing User ! <span className="hover:underline"><Link to="/login">Login Here</Link></span></dd>
          </dl>
            <div className="flex justify-center">
            <button className="mt-6 bg-primary py-2 w-3/4 rounded-md text-lg font-medium hover:opacity-80 text-slate-950" onClick={handleSignupClick} >SignUp</button>
            </div>
        </form>
      </div>
    </div>
);
}

export default Signup;