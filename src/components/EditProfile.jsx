import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useState } from "react";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    photoUrl: user.photoUrl,
    bio: user.bio,
  });
  const { firstName, lastName, age, gender, photoUrl, bio } = formData;
  const [ editStatus , setEditStatus ] = useState(false);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditProfile = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          bio,
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
      console.log(error.message);
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
            <dt className="font-medium">Gender</dt>
            <dd>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-xs"
                value={gender}
                name="gender"
                onChange={handleFieldChange}
              />
            </dd>
            <dt className="font-medium">Bio</dt>
            <dd>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-xs"
                value={bio}
                name="bio"
                onChange={handleFieldChange}
              />
            </dd>
          </dl>
          <div className="flex justify-center">
            <button
              className="mt-6 bg-primary py-2 w-3/4 rounded-md text-lg font-medium hover:opacity-80 text-slate-950"
              onClick={handleEditProfile}
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
