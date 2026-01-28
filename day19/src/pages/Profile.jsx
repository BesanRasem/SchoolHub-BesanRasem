import { useAuth } from "../context/AuthContext.jsx";
function Profile(){
    const {user}=useAuth();
    return(
        <div>
            <h1>Profile</h1>
            <p>Welcome, <b>{user.name}</b></p>
            <p>This page is protected (only logged-in users can see it ).</p>
        </div>
    )
}
export default Profile;