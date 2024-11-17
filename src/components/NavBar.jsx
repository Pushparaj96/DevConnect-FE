import { useSelector , useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const NavBar = () => {

  const user = useSelector(store=>store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogout = async ()=>{
    try {
      await axios.post(`${BASE_URL}/logout`,{},{withCredentials:true});
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
        console.log(error.message);
    }
  }


  return (
    <div className="navbar bg-base-300 p-4">
  <div className="flex-1 ml-3">
    <Link to="/" className="btn btn-ghost text-xl hover:text-green-500">DevConnect</Link>
  </div>
  {
    user &&
    <div className="flex-none gap-2">
    <div>
      <p className="text-base font-medium">Welcome ,<span className="text-green-500 font-semibold text-lg ps-1">{user.firstName}</span></p>
    </div>
    <div className="dropdown dropdown-end mr-4">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="profile-pic"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-32 p-2 shadow">
        <li>
          <Link to="/profile" className="hover:text-green-500">
            Profile
          </Link>
        </li>
        <li><p className="hover:text-green-500" onClick={handleLogout}>Logout</p></li>
      </ul>
    </div>
  </div>
  }
</div>
  )
}

export default NavBar;