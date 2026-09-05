const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const user = {
        email: email,
        password: password
    };

    try {

        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {

            const loggedInUser = await response.json();

            console.log("Login User:", loggedInUser);

            message.textContent =
                "✅ Login successful! Welcome " + loggedInUser.name;

            message.style.color = "green";

            // Save user information
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(loggedInUser)
            );

            // Redirect to home page
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);

        } else {

            const errorText = await response.text();

            message.textContent =
                " " + errorText;

            message.style.color = "red";
        }

    } catch (error) {

        console.error("Login Error:", error);

        message.textContent =
            " Server error. Please try again.";

        message.style.color = "red";
    }
});