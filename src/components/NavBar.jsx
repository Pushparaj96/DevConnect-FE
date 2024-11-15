

const NavBar = () => {
  return (
    <div className="navbar bg-base-300 p-4">
  <div className="flex-1 ml-3">
    <a className="btn btn-ghost text-xl hover:text-green-500">DevConnect</a>
  </div>
  <div className="flex-none gap-2">
    <div className="dropdown dropdown-end mr-4">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-32 p-2 shadow">
        <li>
          <a className="hover:text-green-500">
            Profile
          </a>
        </li>
        <li><a className="hover:text-green-500">Settings</a></li>
        <li><a className="hover:text-green-500">Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default NavBar;