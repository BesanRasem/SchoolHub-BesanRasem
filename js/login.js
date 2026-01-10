passInput = document.getElementById("pass");
 emailInput = document.getElementById("email");
 loginBtn = document.getElementById("login-button");
 message = document.createElement("p");
 document.querySelector(".login-box").appendChild(message);
 message.style.color = "green";
loginBtn.disabled = true;
function checkInputs() {

if (passInput.value !== "" && emailInput.value !== "") {
loginBtn.disabled = false;
message.textContent = "";

} else {
  loginBtn.disabled = true;
   message.textContent = "Please fill in all fields";

}
}
passInput.addEventListener("input", checkInputs);
emailInput.addEventListener("input", checkInputs);

let userRoles = [
  {role:"student",message:"Welcome Student! You can view your grades and homework."}
  ,
  {role:"teacher",message:"Welcome teacher! You can view your grades and homework."}
  , {role:"parent",message:"Welcome parent! You can view your grades and homework."}
  ,
];

function checkRole(){
  let selectedRole = document.querySelector('input[name="role"]:checked');
  if (selectedRole.value === "student") {
  message.textContent = userRoles[0].message;
} else if (selectedRole.value === "teacher") {
  message.textContent = userRoles[1].message;
} else if (selectedRole.value === "parent") {
  message.textContent = userRoles[2].message;
}
}

let roleRadios = document.querySelectorAll('input[name="role"]');

roleRadios.forEach(radio => {
  radio.addEventListener("change", function() {
    userRoles.map(user => {
      if (user.role === this.value) {
        message.textContent=user.message;
      }
    });
  });
});
const students = userRoles.filter(user => user.role === "student");
console.log(students);
