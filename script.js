// Highlight active menu link
document.addEventListener("DOMContentLoaded", () => {

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    const links = document.querySelectorAll(".nav-links a");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    links.forEach(link => {
        const linkPage = link.getAttribute("href");
        if(linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
            link.classList.add("active");
        }
    });

    // Smooth scroll for anchors
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // Contact form handler
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const nom = document.getElementById('nom').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const messageDiv = document.getElementById('form-message');

            if (!nom || !email || !message) {
                messageDiv.textContent = "❌ Veuillez remplir tous les champs !";
                messageDiv.style.color = "red";
                messageDiv.style.display = "block";
                return;
            }

            if (!email.includes("@")) {
                messageDiv.textContent = "❌ Email invalide";
                messageDiv.style.color = "red";
                messageDiv.style.display = "block";
                return;
            }

            const formData = new FormData();
            formData.append('access_key', 'e6f4a8b0-3c9d-4e2f-8b1a-7c5d9e3f2a1b');
            formData.append('name', nom);
            formData.append('email', email);
            formData.append('message', message);

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });
                const data = await response.json();

                if (data.success) {
                    messageDiv.textContent = "✅ Message envoyé avec succès ! Merci.";
                    messageDiv.style.color = "green";
                    contactForm.reset();
                } else {
                    messageDiv.textContent = "❌ Erreur lors de l'envoi. Réessayez.";
                    messageDiv.style.color = "red";
                }
            } catch (error) {
                messageDiv.textContent = "❌ Impossible de se connecter. Essayez plus tard.";
                messageDiv.style.color = "red";
                console.error(error);
            }

            messageDiv.style.display = "block";
            setTimeout(() => { messageDiv.style.display = "none"; }, 5000);
        });
    }

    // Other features like animations, quiz, memory game can remain untouched

});
