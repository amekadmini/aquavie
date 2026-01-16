// Highlight active menu link based on current URL
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

    // Smooth scroll for navigation links
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // Form validation and submission handler
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nom = contactForm.querySelector('input[name="nom"]').value.trim();
            const email = contactForm.querySelector('input[name="email"]').value.trim();
            const message = contactForm.querySelector('textarea[name="message"]').value.trim();
            const messageDiv = document.getElementById("form-message");

            // Basic validation
            if (!nom || !email || !message) {
                messageDiv.textContent = "❌ Veuillez remplir tous les champs";
                messageDiv.classList.remove("success");
                messageDiv.classList.add("error");
                return;
            }

            if (!email.includes("@")) {
                messageDiv.textContent = "❌ Email invalide";
                messageDiv.classList.remove("success");
                messageDiv.classList.add("error");
                return;
            }

            const formData = new FormData(contactForm);

            try {
                const response = await fetch("contact.php", {
                    method: "POST",
                    body: formData
                });

                if (response.ok) {
                    messageDiv.textContent = "✅ Message envoyé avec succès!";
                    messageDiv.classList.remove("error");
                    messageDiv.classList.add("success");
                    contactForm.reset();
                } else {
                    messageDiv.textContent = "❌ Erreur lors de l'envoi du message";
                    messageDiv.classList.remove("success");
                    messageDiv.classList.add("error");
                }
            } catch (error) {
                messageDiv.textContent = "❌ Erreur de connexion";
                messageDiv.classList.remove("success");
                messageDiv.classList.add("error");
                console.error("Error:", error);
            }

            // Show message
            messageDiv.style.display = "block";

            // Hide message after 5 seconds
            setTimeout(() => {
                messageDiv.classList.remove("success", "error");
                messageDiv.style.display = "none";
            }, 5000);
        });
    }

    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = "slideUp 0.8s ease-out";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll("section, .card, .eco-card").forEach(el => {
        observer.observe(el);
    });

    // Animate stats numbers
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const strong = entry.target.querySelector('strong');
                const target = parseInt(strong.textContent);
                animateNumber(strong, 0, target, 2000);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stats div').forEach(div => {
        statsObserver.observe(div);
    });

    function animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current + (end > 100 ? '' : '%');
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }
});
const symbols = ["🐳","🐳","🐠","🐠","🦀","🦀","🐢","🐢","🌊","🌊","🐙","🐙"];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

const gameBoard = document.getElementById("memory-game");
const movesText = document.getElementById("moves");

function startGame() {
    gameBoard.innerHTML = "";
    moves = 0;
    movesText.textContent = "Coups : 0";
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    const shuffled = symbols.sort(() => 0.5 - Math.random());

    shuffled.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("memory-card");
        card.dataset.symbol = symbol;
        card.textContent = "❓";
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.textContent = this.dataset.symbol;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesText.textContent = "Coups : " + moves;

    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        resetTurn();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.textContent = "❓";
            secondCard.textContent = "❓";
            resetTurn();
        }, 900);
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

startGame();

const questions = [
    {
        question: "Quel pourcentage de la surface de la Terre est couvert par les océans ?",
        answers: ["50%", "60%", "70%", "80%"],
        correct: 2
    },
    {
        question: "Quelle est la principale cause de la pollution plastique des océans ?",
        answers: [
            "Les volcans sous-marins",
            "Les déchets humains",
            "Les algues",
            "Les tempêtes"
        ],
        correct: 1
    },
    {
        question: "Quel écosystème protège naturellement les côtes contre l’érosion ?",
        answers: ["Déserts", "Mangroves", "Glaciers", "Lacs"],
        correct: 1
    },
    {
        question: "Pourquoi les coraux sont-ils importants ?",
        answers: [
            "Ils produisent du pétrole",
            "Ils décorent les océans",
            "Ils abritent de nombreuses espèces",
            "Ils réchauffent l’eau"
        ],
        correct: 2
    },
    {
        question: "Quelle action aide le plus à protéger les océans ?",
        answers: [
            "Utiliser plus de plastique",
            "Ignorer le problème",
            "Réduire les déchets",
            "Pêcher sans limite"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const buttons = document.querySelectorAll(".answer-btn");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-question");
const scoreEl = document.getElementById("score");

function loadQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;

    buttons.forEach((btn, index) => {
        btn.textContent = q.answers[index];
        btn.classList.remove("correct", "wrong");
        btn.disabled = false;
    });

    feedback.textContent = "";
    nextBtn.style.display = "none";
}

function selectAnswer(index) {
    const correctIndex = questions[currentQuestion].correct;

    buttons.forEach(btn => btn.disabled = true);

    if (index === correctIndex) {
        buttons[index].classList.add("correct");
        feedback.textContent = "✅ Bonne réponse !";
        score++;
    } else {
        buttons[index].classList.add("wrong");
        buttons[correctIndex].classList.add("correct");
        feedback.textContent = "❌ Mauvaise réponse";
    }

    scoreEl.textContent = "Score : " + score;
    nextBtn.style.display = "inline-block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        questionEl.textContent = "🎉 Quiz terminé !";
        document.getElementById("answers").style.display = "none";
        feedback.textContent = `Ton score final est ${score} / ${questions.length}`;
        nextBtn.style.display = "none";
    }
}

loadQuestion();
