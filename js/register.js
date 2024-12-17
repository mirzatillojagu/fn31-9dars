import { validateRegister } from "./function.js";

const registerForm = document.querySelector('#registerForm');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const button = document.querySelector('#button');

async function sendUserData(user) {
   try {
      const response = await fetch('https://auth-rg69.onrender.com/api/auth/signup', {
         method: "POST",
         headers: {
            'Content-type': "application/json"
         },
         body: JSON.stringify(user)
      });

      const data = await response.json();
      console.log("response data", data);

      if (data.message === "Failed! Username is already in use" || data.message === "Failed! email is already in use") {
         alert(data.message);
         return;
      }

      if (data.message === "User registered successfully") {
         window.location.href = '/login.html';
         registerForm.reset();
      }

   } catch (error) {
      console.log(error);
   }
}

button && button.addEventListener('click', function () {
   const isValid = validateRegister();

   if (!isValid) {
      return;
   }

   const user = {
      username: username.value,
      email: email.value,
      password: password.value
   };

   sendUserData(user); 
});
