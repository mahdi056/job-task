
import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "./AuthProvider/AuthProvider";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {

  const { setUser, signinWithgoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signinWithgoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate("/");
        toast.success("Google Sign-In Successful!", {
          position: "top-center",
        });
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
        toast.error("Google Sign-In Failed. Please try again.", {
          position: "top-center",
        });
      });
  };



  return (
    <div>
      <ToastContainer></ToastContainer>

      <h1 className="text-4xl font-bold text-center mt-20">Please Signup or Signin</h1>
      
      <div className="flex justify-center items-center mt-8">
       
        <button type="button" className="btn btn-outline btn-accent" onClick={handleGoogleSignIn}>
          Sign In With Google <FaGoogle className="ml-2" />
        </button>
      </div>



    </div>
  );
};

export default Login;