import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useState } from "react";
import UserCard from "./UserCard";
import * as Yup from "yup";

const EditProfile = ({ user }) => {

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    photoUrl: user.photoUrl,
    bio: user.bio,
    skills:user.skills
  });
  const { firstName, lastName, age, gender, photoUrl, bio , skills } = formData;
  const [formErrors,setFormError] = useState({});
  const [ editStatus , setEditStatus ] = useState(false);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillsField = (e) =>{
    let { name , value } = e.target;
      value = value.split(",");
      setFormData({
        ...formData,
        [name]:value
      })
  }

  const validationSchema = Yup.object({
    firstName:Yup.string().matches(/[a-zA-Z]+/,"invalid firstname"),
    lastName:Yup.string().matches(/[a-zA-Z]+/,"invalid lastname"),
    age:Yup.number().min(18,"min age 18").max(80,"max age 80"),
    gender:Yup.string().required("Please Select Gender"),
    photoUrl:Yup.string(),
    bio:Yup.string(),
    skills:Yup.array().max(25,"can't mention more than 25 skills")
  });

  const validateEditForm = async()=>{
    try {
      await validationSchema.validate(formData,{abortEarly:false});
      return true;
    } catch (errors) {
      const newErrors = {};
      errors.inner.map(error=>newErrors[error.path]=error.message);
      setFormError(newErrors);
    }
  }

  const handleEditSubmit = async () => {
    try {
      
      // validating Form 
     const isValidSubmit = await validateEditForm();
      if(!isValidSubmit) return;

      const response = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          bio,
          skills
        },
        { withCredentials: true }
      );
      const { data } = response?.data;
      dispatch(addUser(data));
      setEditStatus(true);
      setTimeout(()=>{
        setEditStatus(false);
      },3000)
    } catch (error) {
      setFormError({
        ...formErrors,
        ["serverError"]:error.message
      });
    }
  };

  
  return (
    <div className="flex justify-center gap-10 flex-wrap">
      <div className="mt-10 bg-base-300 p-8 rounded-xl w-[90%] sm:w-[380px]  flex-shrink-0 shadow-md shadow-gray-600">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="text-xl font-medium flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="size-6 stroke-blue-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            <span className="ms-1 text-2xl text-blue-700">Edit Profile</span>
          </div>
          <dl className="space-y-3">
            <dt className="font-medium">First Name</dt>
            <dd>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-xs"
                value={firstName}
                name="firstName"
                onChange={handleFieldChange}
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
                value={lastName}
                name="lastName"
                onChange={handleFieldChange}
              />
            </dd>
            {
              formErrors.lastName &&
              <dd className="text-red-600">{formErrors.lastName}</dd>
            }
            <dt className="font-medium">Photo URL</dt>
            <dd>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-xs"
                value={photoUrl}
                name="photoUrl"
                onChange={handleFieldChange}
              />
            </dd>
            {
              formErrors.photoUrl &&
              <dd className="text-red-600">{formErrors.photoUrl}</dd>
            }
            <dt className="font-medium">Age</dt>
            <dd>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-xs"
                value={age}
                name="age"
                onChange={handleFieldChange}
              />
            </dd>
            {
              formErrors.age &&
              <dd className="text-red-600">{formErrors.age}</dd>
            }
            <dt className="font-medium">Gender</dt>
            <dd>
            <select className="select select-primary w-full max-w-xs" value={gender} name="gender" onChange={handleFieldChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </dd>
            {
              formErrors.gender &&
              <dd className="text-red-600">{formErrors.gender}</dd>
            }
            <dt className="font-medium">Bio</dt>
            <dd>
            <textarea className="textarea textarea-primary textarea-md w-full max-w-xs" placeholder="Bio" name="bio" value={bio} onChange={handleFieldChange}>
            </textarea>
            </dd>
            {
              formErrors.bio &&
              <dd className="text-red-600">{formErrors.bio}</dd>
            }
            <dt className="font-medium">Skills</dt>
            <dd>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-xs"
                value={skills}
                name="skills"
                onChange={handleSkillsField}
              />
            </dd>
            {
              formErrors.skills &&
              <dd className="text-red-600">{formErrors.skills}</dd>
            }
            {
              formErrors.serverError &&
              <dd className="text-red-600">{formErrors.serverError}</dd>
            }
          </dl>
          <div className="flex justify-center">
            <button
              className="mt-6 bg-primary py-2 w-3/4 rounded-md text-lg font-medium hover:opacity-80 text-slate-950"
              onClick={handleEditSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="mt-10 flex-shrink-0">
        <h2 className="text-xl font-semibold text-center bg-base-300 p-3 text-blue-700 mb-4">
          Profile Will Look Like
        </h2>
        <UserCard user={formData} />
      </div>
      {editStatus && 
        <div className="toast toast-center toast-top">
        <div className="alert alert-success">
          <span>Profile Saved Successfully ...</span>
        </div>
      </div>
      }
    </div>
  );
};

export default EditProfile;
