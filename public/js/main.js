// SIGNUP
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      password: document.getElementById("password").value,
    };
    localStorage.setItem(user.email, JSON.stringify(user));
    alert("Signup successful! Please login.");
    window.location.href = "login.html";
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailOrPhone = document.getElementById("emailOrPhone").value;
    const password = document.getElementById("password").value;

    let user = localStorage.getItem(emailOrPhone);
    if (!user) {
      // check if phone matches any user
      const keys = Object.keys(localStorage);
      user = keys.map((k) => JSON.parse(localStorage.getItem(k)))
                 .find((u) => u.phone === emailOrPhone);
    } else {
      user = JSON.parse(user);
    }

    if (user && user.password === password) {
      alert("Login successful!");
      // save logged-in user info
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    } else {
      alert("Invalid credentials!");
    }
  });
}
