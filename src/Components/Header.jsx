import { useContext } from "react";
import { AuthContext } from "./AuthProvider/AuthProvider";
import { Link, NavLink } from "react-router";

const Header = () => {

    const { user, logout } = useContext(AuthContext);

    return (
        <div>

            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                           <NavLink to='/'> <li>Home</li></NavLink>

                           {
                            user? ( <NavLink to="/task"><li>Manage Task</li></NavLink>)
                            :
                            ( <NavLink to="/login"><li>Manage Task</li></NavLink>)
                           }
                           
                          
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Task Management</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1  space-x-2">

                    <NavLink to='/'> <li>Home</li></NavLink>

                           {
                            user? ( <NavLink to="/task"><li>Manage Task</li></NavLink>)
                            :
                            ( <NavLink to="/login"><li>Manage Task</li></NavLink>)
                           }
                       
                    </ul>
                </div>
                <div className="navbar-end">
                    <img className="max-w-12 rounded-full" src={user?.photourl} alt="" />
                    {
                        user? ( <Link to='/'><button onClick={logout} className="btn btn-outline btn-error">Logout</button></Link>)
                        :
                        (<Link to='/login'> <button className="btn btn-outline btn-info">Login</button> </Link>)
                    }
                   
                </div>
            </div>

        </div>
    );
};

export default Header;