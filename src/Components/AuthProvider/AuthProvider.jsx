import { createContext, useEffect, useState } from "react";
import app from "../../../firebase.init";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";




export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const provider = new GoogleAuthProvider()


    const signinWithgoogle = () => {
        return signInWithPopup(auth, provider);
    }

    const logout = () => {
        return signOut(auth);
    }

    const authInfo = {
        user,
        setUser,
        logout,
        signinWithgoogle,
        loading,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
            if(currentuser){
                const userdata = {
                    displayName : currentuser.displayName,
                    email: currentuser.email,
                    photourl: currentuser.photoURL
                };
                setUser(userdata)
            }

            else {
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    },[])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }


    return <AuthContext.Provider value={authInfo} >{children}</AuthContext.Provider>
};

export default AuthProvider;