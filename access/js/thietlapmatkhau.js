const showPassword = document.querySelector("#show-password");
const passwordField = document.querySelector ("#password");

showPassword.addEventListener("click", function(){
    this.classList.toggle("fa-eye-slash");
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
})


const showPassword1 = document.querySelector("#show-password1");
const passwordField1 = document.querySelector ("#password1");

showPassword1.addEventListener("click", function(){
    this.classList.toggle("fa-eye-slash");
    const type = passwordField1.getAttribute("type") === "password" ? "text" : "password";
    passwordField1.setAttribute("type", type);
})
