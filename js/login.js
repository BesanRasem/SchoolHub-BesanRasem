const role = document.getElementById("role");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const studentID = document.getElementById("studentID");
const classCode = document.getElementById("classCode");
const loginForm = document.querySelector(".login-form");
const message = document.querySelector(".form-message");
const welcomeTitle = document.getElementById("welcomeTitle");
const roleImage = document.getElementById("roleImage");

const allInputs = [
  loginEmail,
  loginPassword,

];
function disableInputs() {
  allInputs.forEach(input => {
    input.disabled = true;
  });
}
disableInputs();
function enableInputs() {
  loginEmail.disabled = false;
  loginPassword.disabled = false;
}
function addHideField() {
    studentID.classList.add("hide-field");
  classCode.classList.add("hide-field");

}
function removeHideField() {
studentID.classList.remove("hide-field");
 classCode.classList.remove("hide-field");
}


role.addEventListener("change", function () {
  const selectedRole = this.value;
  if(selectedRole === "student" || selectedRole === "parent"){
    enableInputs();
    removeHideField();
     
  }
  else
  {
    enableInputs();
    addHideField();

  }
  if(selectedRole=="student"){
     welcomeTitle.textContent = "Welcome, Student!";
  }
  if(selectedRole=="parent"){
     welcomeTitle.textContent = "Welcome, Parent!";
  }
  if(selectedRole=="admin"){
     welcomeTitle.textContent = "Welcome, Admin!";
  }
  if(selectedRole=="teacher"){
     welcomeTitle.textContent = "Welcome, Teacher!";
  }
})
 loginForm.addEventListener("submit", function (e) {
  e.preventDefault(); 



  if (role.value === "") {
    message.textContent = "Please choose a role first";
    message.classList.add("error");
    return;
  }
   else if (loginEmail.value === "" || loginPassword.value === "") {
    message.textContent = "Please fill in email and password";
    message.classList.add("error");
    return;
  }
    else if (
    (role.value === "student" || role.value === "parent") &&
    (studentID.value === "" || classCode.value === "")
  ) {
    message.textContent = "Please enter Student ID and Class Code";
    message.classList.add("error");
    return;
  }
  else{
    message.textContent = "Login successful!";
  message.classList.add("success");
  loginForm.reset();
  disableInputs();
  addHideField();

  
}

});
/*
function getData(email,password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      if (email==""||password=="") {
               reject("Enter password and email");
      } else {
        resolve("login success");
      }
    }, 2000);
  });}
  async function loadData() {
  try {
    const result = await getData();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  try {
    const result = await getData(
      loginEmail.value,
      loginPassword.value
    );

    message.textContent = result;
    message.classList.add("success");

  } catch (error) {
    message.textContent = error;
    message.classList.add("error");
  }
});
*/