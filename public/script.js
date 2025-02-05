document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");

    // Form Validation
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
        form.addEventListener("submit", function (event) {
            let valid = true;
            const inputs = form.querySelectorAll("input[required]");

            inputs.forEach((input) => {
                if (input.value.trim() === "") {
                    valid = false;
                    input.classList.add("error");
                    showMessage("Please fill all fields!", "error");
                } else {
                    input.classList.remove("error");
                }
            });

            // Email Validation
            const emailField = form.querySelector("input[type='email']");
            if (emailField && !validateEmail(emailField.value)) {
                valid = false;
                emailField.classList.add("error");
                showMessage("Enter a valid email!", "error");
            }

            if (!valid) {
                event.preventDefault();
            }
        });
    });

    // Password Toggle
    const togglePassword = document.querySelectorAll(".toggle-password");
    togglePassword.forEach((toggle) => {
        toggle.addEventListener("click", function () {
            const passwordField = this.previousElementSibling;
            if (passwordField.type === "password") {
                passwordField.type = "text";
                this.innerText = "👁️";
            } else {
                passwordField.type = "password";
                this.innerText = "🔒";
            }
        });
    });

    // Dark Mode Toggle
    const darkModeBtn = document.getElementById("dark-mode-toggle");
    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
        });

        // Remember Dark Mode Preference
        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark-mode");
        }
    }
});

// Email Validation Function
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Show Message Function
function showMessage(message, type) {
    const msgDiv = document.createElement("div");
    msgDiv.innerText = message;
    msgDiv.className = `message ${type}`;
    document.body.appendChild(msgDiv);

    setTimeout(() => {
        msgDiv.remove();
    }, 3000);
}