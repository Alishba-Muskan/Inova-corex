const words = {
    english: [
        { word: "Hello", translation: "Hola", difficulty: "beginner" },
        { word: "Goodbye", translation: "Adiós", difficulty: "beginner" },
        { word: "Thank you", translation: "Gracias", difficulty: "beginner" },
        { word: "Please", translation: "Por favor", difficulty: "beginner" },
        { word: "Water", translation: "Agua", difficulty: "beginner" },
        { word: "Yes", translation: "Sí", difficulty: "beginner" },
        { word: "No", translation: "No", difficulty: "beginner" },
        { word: "Good morning", translation: "Buenos días", difficulty: "intermediate" },
        { word: "Good night", translation: "Buenas noches", difficulty: "intermediate" },
        { word: "How are you?", translation: "¿Cómo estás?", difficulty: "intermediate" },
        { word: "Delicious", translation: "Delicioso", difficulty: "advanced" },
        { word: "Philosophy", translation: "Filosofía", difficulty: "advanced" },
        { word: "Constitution", translation: "Constitución", difficulty: "advanced" },
        { word: "Hypothetical", translation: "Hipotético", difficulty: "advanced" }
    ],
    turkish: [
        { word: "Merhaba", translation: "Hello", difficulty: "beginner" },
        { word: "Teşekkür ederim", translation: "Thank you", difficulty: "beginner" },
        { word: "Lütfen", translation: "Please", difficulty: "beginner" },
        { word: "Su", translation: "Water", difficulty: "beginner" },
        { word: "Evet", translation: "Yes", difficulty: "beginner" },
        { word: "Hayır", translation: "No", difficulty: "beginner" },
        { word: "Günaydın", translation: "Good morning", difficulty: "intermediate" },
        { word: "İyi geceler", translation: "Good night", difficulty: "intermediate" },
        { word: "Nasılsın?", translation: "How are you?", difficulty: "intermediate" },
        { word: "Felsefe", translation: "Philosophy", difficulty: "advanced" },
        { word: "Kuvvetli", translation: "Strong", difficulty: "advanced" },
        { word: "Konstitüsyon", translation: "Constitution", difficulty: "advanced" }
    ],
    german: [
        { word: "Hallo", translation: "Hello", difficulty: "beginner" },
        { word: "Danke", translation: "Thank you", difficulty: "beginner" },
        { word: "Bitte", translation: "Please", difficulty: "beginner" },
        { word: "Wasser", translation: "Water", difficulty: "beginner" },
        { word: "Ja", translation: "Yes", difficulty: "beginner" },
        { word: "Nein", translation: "No", difficulty: "beginner" },
        { word: "Guten Morgen", translation: "Good morning", difficulty: "intermediate" },
        { word: "Gute Nacht", translation: "Good night", difficulty: "intermediate" },
        { word: "Wie geht’s?", translation: "How are you?", difficulty: "intermediate" },
        { word: "Philosophie", translation: "Philosophy", difficulty: "advanced" },
        { word: "Stark", translation: "Strong", difficulty: "advanced" },
        { word: "Verfassung", translation: "Constitution", difficulty: "advanced" }
    ]
};

let currentLanguage = localStorage.getItem("selectedLanguage") || "english";
let currentDifficulty = "beginner";
let currentIndex = 0;

const languageSelector = document.getElementById("language");
const difficultySelector = document.getElementById("difficulty");
const themeToggleBtn = document.getElementById("toggle-mode");
const flashcard = document.getElementById("flashcard");
const front = document.getElementById("front");
const back = document.getElementById("back");
const progress = document.getElementById("progress");

const body = document.body;



const updateCard = () => {
    const filteredWords = words[currentLanguage].filter(word => word.difficulty === currentDifficulty);
    front.textContent = filteredWords[currentIndex].word;
    back.textContent = filteredWords[currentIndex].translation;
    progress.textContent = `Card ${currentIndex + 1}/${filteredWords.length}`;

    body.classList.remove("english-theme", "turkish-theme", "german-theme");
    if (currentLanguage === "english") body.classList.add("english-theme");
    if (currentLanguage === "turkish") body.classList.add("turkish-theme");
    if (currentLanguage === "german") body.classList.add("german-theme");

    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        themeToggleBtn.textContent = "🌕";
    } else {
        body.classList.remove("dark-mode");
        themeToggleBtn.textContent = "🌙";
    }
};

themeToggleBtn.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        themeToggleBtn.textContent = "🌙";
        localStorage.setItem("darkMode", "disabled");
    } else {
        body.classList.add("dark-mode");
        themeToggleBtn.textContent = "🌕";
        localStorage.setItem("darkMode", "enabled");
    }
});

languageSelector.addEventListener("change", (e) => {
    currentLanguage = e.target.value;
    localStorage.setItem("selectedLanguage", currentLanguage);
    currentIndex = 0;
    updateCard();
});

difficultySelector.addEventListener("change", (e) => {
    currentDifficulty = e.target.value;
    currentIndex = 0;
    updateCard();
});

document.getElementById("flip").addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
});

document.getElementById("next").addEventListener("click", () => {
    const filteredWords = words[currentLanguage].filter(word => word.difficulty === currentDifficulty);
    if (currentIndex < filteredWords.length - 1) {
        currentIndex++;
        updateCard();
    }
});

document.getElementById("prev").addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCard();
    }
});

document.getElementById("shuffle").addEventListener("click", () => {
    const filteredWords = words[currentLanguage].filter(word => word.difficulty === currentDifficulty);
    filteredWords.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    updateCard();
});

document.getElementById("reset").addEventListener("click", () => {
    currentIndex = 0;
    updateCard();
});

document.getElementById("add-word").addEventListener("click", () => {
    const customWord = document.getElementById("custom-word").value.trim();
    const customTranslation = document.getElementById("custom-translation").value.trim();

    if (customWord && customTranslation) {
        words[currentLanguage].push({
            word: customWord,
            translation: customTranslation,
            difficulty: "beginner"
        });

        document.getElementById("custom-word").value = '';
        document.getElementById("custom-translation").value = '';

        updateCard();
    } else {
        alert("Dono fields bharna zaroori hai!");
    }
});
updateCard();
