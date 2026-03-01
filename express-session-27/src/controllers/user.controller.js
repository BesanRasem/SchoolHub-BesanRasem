const ApiError = require("../utils/ApiError");
let USERS=
[
{id:"1" ,name:"Alaa",email:"alaa@test.com"}
];
async function listUsers(req, res) {
    try {
        const search=String(req.query.search ||"").toLowerCase();
        const data =search 
        ?USERS

    }
}
 function updateUser(req,res,next){
    const{id}=req.params;
    const idx=USERS.findIndex
 }
