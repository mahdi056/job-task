import { Outlet } from "react-router";
import Header from "./Header";


const Root = () => {
    return (
        <div>

            <Header></Header>

            <Outlet></Outlet>
            
        </div>
    );
};

export default Root;