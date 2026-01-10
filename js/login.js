passInput = document.getElementById("pass");
 emailInput = document.getElementById("email");
 loginBtn = document.getElementById("login-button");
 message = document.createElement("p");
 document.querySelector(".login-box").appendChild(message);
 message.style.color = "green";
function checkInputs() {

if (passInput.value !== "" && emailInput.value !== "") {
message.textContent = "";

} else {
   message.textContent = "Please fill in all fields";

}
if(passInput.value==""){
  passInput.style.border = "2px solid green"
}
if(emailInput.value==""){
  emailInput.style.border = "2px solid green"
}
}

loginBtn.addEventListener("click",checkInputs);



