import { useAuth } from "../context/AuthContext.jsx";
function Home(){
    const {user} =useAuth();
    return(
        <div>
            <h1>Home</h1>
            <p>
                Current user: <b> { user ?user.name :"Guess"} </b>
            </p>
        </div>
    );
}
export default Home;