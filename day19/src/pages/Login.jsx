import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

function Login(){
    const [name,setName]=useState("");
        const {login} = useAuth();
        const Navigate = useNavigate();



        function submit (e){
            e.preventDefault();
            if(!name.trim()) return;
            login(name.trim());
            Navigate("/profile");
        }
        return(
            <dev>
                <h1>login</h1>
                <form onSubmit={submit} style={{display:"grid",gap:10,maxWidth:320}}>
                    <input
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    placeholder="Enter your name.."
                    />
                </form>
            </dev>
        )
   
}
export default Login;
