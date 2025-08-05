const wrapper = document.querySelector(".wrapper");
const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");

registerLink.onclick = () => {
  wrapper.classList.add("active");
};
loginLink.onclick = () => {
  wrapper.classList.remove("active");
};

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function login(event) {
  event.preventDefault();
  const usernameInput = document.getElementById("loginUsername");
  const passwordInput = document.getElementById("loginPassword");

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  [usernameInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim() !== "") {
        input.style.border = "";
      }
    });
  });

  if (!username || !password) {
    if (!username) usernameInput.style.border = "2px solid red";
    if (!password) passwordInput.style.border = "2px solid red";
    showToast("All fields are required!", "error");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.username === username);

  if (!user) {
    usernameInput.style.border = "2px solid red";
    showToast("Username not found!", "error");
    return;
  }

  if (user.password !== password) {
    passwordInput.style.border = "2px solid red";
    showToast("Incorrect password!", "error");
    return;
  }

  showToast("Login Successful!", "success");
  usernameInput.value = "";
  passwordInput.value = "";

}
// function loginLinkClick() {
//   const signupUsername = document.getElementById("signupUsername");
//   const signupEmail = document.getElementById("signupEmail");
//   const signupPassword = document.getElementById("signupPassword");

//   if (signupUsername) signupUsername.value = "";
//   if (signupEmail) signupEmail.value = "";
//   if (signupPassword) signupPassword.value = "";

//   if (signupUsername) signupUsername.style.border = "";
//   if (signupEmail) signupEmail.style.border = "";
//   if (signupPassword) signupPassword.style.border = "";
// }



function register(event) {
  event.preventDefault();
  const usernameInput = document.getElementById("signupUsername");
  const emailInput = document.getElementById("signupEmail");
  const passwordInput = document.getElementById("signupPassword");

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  [usernameInput, emailInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim() !== "") {
        input.style.border = "";
      }
    });
  });

  if (!username || !email || !password) {
    if (!username) usernameInput.style.border = "2px solid red";
    if (!email) emailInput.style.border = "2px solid red";
    if (!password) passwordInput.style.border = "2px solid red";
    showToast("All fields are required!", "error");
    return;
  }

  if (!isValidEmail(email)) {
    emailInput.style.border = "2px solid red";
    showToast("Please enter a valid email address.", "error");
    return;
  }
  if (password.length < 6) {
    passwordInput.style.border = "2px solid red";
    showToast("Password must be at least 6 characters.", "error");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const emailExists = users.some((user) => user.email === email);
  if (emailExists) {
    showToast("Email already registered.", "error");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  showToast("Signup successful!", "success");
  usernameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}

// function registerLinkClick() {

//   document.getElementById("loginUsername").value = "";
//   document.getElementById("loginPassword").value = "";

//   document.getElementById("loginUsername").style.border = "";
//   document.getElementById("loginPassword").style.border = "";

// }




function showToast(message, type = "success") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor:
      type === "success"
        ? "linear-gradient(to right, #00b09b, #96c93d)"
        : "linear-gradient(to right, #ff5f6d, #ffc371)",
  }).showToast();
}
