const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    // Check passwords
    if (password !== confirmPassword) {
        message.textContent = "❌ Passwords do not match";
        message.style.color = "red";
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    try {

        const response = await fetch("/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {

            const savedUser = await response.json();

            console.log("Registered User:", savedUser);

            message.textContent =
                "✅ Registration successful! Redirecting to login...";

            message.style.color = "green";

            registerForm.reset();

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);

        } else {

            const errorText = await response.text();

            message.textContent =
                " " + errorText;

            message.style.color = "red";
        }

    } catch (error) {

        console.error("Registration Error:", error);

        message.textContent =
            " Server error. Please try again.";

        message.style.color = "red";
    }
});