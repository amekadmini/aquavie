<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aquavie | Contact</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>

<!-- NAVBAR -->
<nav>
    <a href="index.html" class="nav-logo">
        <img src="logo (1).png" alt="Aquavie Logo">
    </a>

    <div class="nav-links">
        <a href="index.html">Accueil</a>
        <a href="oceans.html">Océans</a>
        <a href="ecosystemes.html">Écosystèmes</a>
        <a href="faune.html">Faune</a>
        <a href="flore.html">Flore</a>
        <a href="menaces.html">Menaces</a>
        <a href="solutions.html">Solutions</a>
        <a href="Aquajeux.html">AquaJeux</a>
        <a href="apropos.html">À propos</a>
        <a href="contact.html" class="active">Contact</a>
    </div>
</nav>

<!-- CONTACT SECTION -->
<section id="contact">
    <h2>Contact</h2>

    <div class="contact-container">

        <!-- TELEPHONE -->
        <div class="contact-card">
            <h3>📞 Téléphone</h3>
            <p>
                <a href="tel:+21623178622">+216 23178622</a>
            </p>
        </div>

        <!-- EMAIL -->
        <div class="contact-card">
            <h3>✉️ Email</h3>
            <p>
                <a href="mailto:amekadmini.eleve@ec-tunis.com">
                    amekadmini.eleve@ec-tunis.com
                </a>
            </p>
        </div>

        <!-- FORM -->
        <div class="contact-card form-card">
            <h3>📧 Envoyer un message</h3>

            <form id="contactForm">
                <input type="text" id="nom" name="nom" placeholder="Nom" required>
                <input type="email" id="email" name="email" placeholder="Votre Email" required>
                <textarea id="message" name="message" rows="4" placeholder="Votre message" required></textarea>
                <button type="submit">Envoyer</button>
            </form>

            <div id="form-message" style="display:none; margin-top:10px;"></div>
        </div>

    </div>
</section>

<!-- SCRIPT -->
<script>
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const messageDiv = document.getElementById('form-message');

    // Basic validation
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
    formData.append('access_key', 'e6f4a8b0-3c9d-4e2f-8b1a-7c5d9e3f2a1b'); // Your Web3Forms key
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
            this.reset();
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

    // Hide after 5s
    setTimeout(() => {
        messageDiv.style.display = "none";
    }, 5000);
});
</script>

<!-- FOOTER -->
<footer>
    © 2025–2026 - Aquavie
</footer>

</body>
</html>

