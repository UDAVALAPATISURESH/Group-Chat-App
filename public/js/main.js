// SIGNUP
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value,
  };

  const res = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  alert(data.message);
  if (res.ok) window.location.href = "login.html";
});


sendBtn.addEventListener("click", async () => {
  const msg = messageInput.value.trim();
  if (msg !== "") {
    addMessage(msg, "sent");

    // Example userId (you can use logged-in user's ID)
    const userId = "user123";

    // Save message to backend
    await fetch("http://localhost:5000/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, message: msg }),
    });

    messageInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});




// LOGIN
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = {
    emailOrPhone: document.getElementById("emailOrPhone").value,
    password: document.getElementById("password").value,
  };

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  alert(data.message);
  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
});
