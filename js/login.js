import { validateRegister } from "./function.js";

const loginForm = document.querySelector('#loginForm');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const button = document.querySelector('#button');

async function sendUserData(user) {
    try {
        const response = await fetch("https://auth-rg69.onrender.com/api/auth/signup", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const data = await response.json(); 
         
        if (data.message == "User not found" || data.message == "invalid password!") {
            alert(data.message)
            return;
        }

        if (data.id && data.accessToken) {
            localStorage.setItem('user', JSON.stringify(data))
            localStorage,setItem('token', data.accessToken)
            window.location.href = '/index.html';
        }
       
    } catch (error) {
        console.error("Error:", error);
    }
}

button && button.addEventListener('click', function () {
    const isValid = validateRegister(); 
    if (!isValid) {
        return;
    }

    const user = {
        username: username.value,
        password: password.value
    };

    sendUserData(user);
});
