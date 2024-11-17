import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const NavBar = () => {

  const user = useSelector(store=>store.user);


  return (
    <div className="navbar bg-base-300 p-4">
  <div className="flex-1 ml-3">
    <Link to="/" className="btn btn-ghost text-xl hover:text-green-500">DevConnect</Link>
  </div>
  {
    user &&
    <div className="flex-none gap-2">
    <div>
      <p className="text-base font-medium">Welcome ,<span className="text-green-700 font-semibold text-lg ps-1">{user.firstName}</span></p>
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
        <li><a className="hover:text-green-500">Settings</a></li>
        <li><a className="hover:text-green-500">Logout</a></li>
      </ul>
    </div>
  </div>
  }
</div>
  )
}

export default NavBar;