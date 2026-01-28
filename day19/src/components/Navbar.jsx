import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
function Navbar(){
    const{user , login}=useAuth();
    return(
        <nav style={{display:"flex",gap:12,marginBottom:16}}>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            {!user && <link to="/login">Login</link>}
            {user &&(
                <button type="button" onClick={logout}>
                    logout
                </button>
            )}

        </nav>
    );
}
export default Navbar;