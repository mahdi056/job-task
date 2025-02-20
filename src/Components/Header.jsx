import { useContext } from "react";
import { AuthContext } from "./AuthProvider/AuthProvider";
import { Link } from "react-router";

const Header = () => {
   
    const {user, logout} = useContext(AuthContext);
    
    return (
        <div className="flex justify-between items-center px-4 mt-2">

            <div><h2>Task Management</h2></div>



            <div className="flex gap-x-2"> 

                <div className="flex flex-col">

                    <img className="rounded-full w-12" src={user?.photourl} alt="" />
                    {/* <span>{user.displayName}</span> */}

                </div>
                {
                    user ? ( <div onClick={logout} className="btn btn-outline btn-error">Logout</div>)
                    :
                    ( <Link to='/login'><div className="btn btn-outline btn-info">Login</div></Link>)
                }

               
            </div>
            
        </div>
    );
};

export default Header;