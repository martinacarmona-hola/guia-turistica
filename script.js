const questions = {
    extraversion: [
        "Me gusta socializar con mucha gente.",
        "Soy el centro de atención en las fiestas.",
        "Prefiero actividades solitarias a las grupales.",
        "Hablo mucho en reuniones.",
        "Me siento cómodo con extraños."
    ],
    agreeableness: [
        "Ayudo a los demás sin esperar nada a cambio.",
        "Soy compasivo con las personas.",
        "Me cuesta decir no a las peticiones.",
        "Me preocupo por los sentimientos de los demás.",
        "Prefiero cooperar que competir."
    ],
    conscientiousness: [
        "Soy organizado y meticuloso.",
        "Cumplo con mis responsabilidades.",
        "Me cuesta empezar tareas difíciles.",
        "Planeo mis actividades con anticipación.",
        "Soy disciplinado en mi trabajo."
    ],
    neuroticism: [
        "Me preocupo mucho por las cosas.",
        "Me siento ansioso fácilmente.",
        "Soy emocionalmente estable.",
        "Reacciono intensamente a situaciones estresantes.",
        "Me cuesta controlar mis emociones."
    ],
    openness: [
        "Me gusta probar cosas nuevas.",
        "Soy creativo e imaginativo.",
        "Prefiero rutinas a aventuras.",
        "Me interesan las ideas abstractas.",
        "Disfruto del arte y la cultura."
    ]
};

const sections = Object.keys(questions);
let currentSectionIndex = 0;
let scores = { extraversion: 0, agreeableness: 0, conscientiousness: 0, neuroticism: 0, openness: 0 };

document.getElementById('start-btn').addEventListener('click', startTest);
document.getElementById('next-btn').addEventListener('click', nextSection);
document.getElementById('finish-btn').addEventListener('click', finishTest);

function startTest() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('test').style.display = 'block';
    showSection(currentSectionIndex);
}

function showSection(index) {
    const section = sections[index];
    const sectionDiv = document.getElementById('sections');
    sectionDiv.innerHTML = `<h2>${capitalize(section)}</h2>`;
    questions[section].forEach((q, i) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <p>${q}</p>
            <div class="options">
                <label class="option"><input type="radio" name="q${i}" value="1">1</label>
                <label class="option"><input type="radio" name="q${i}" value="2">2</label>
                <label class="option"><input type="radio" name="q${i}" value="3">3</label>
                <label class="option"><input type="radio" name="q${i}" value="4">4</label>
                <label class="option"><input type="radio" name="q${i}" value="5">5</label>
            </div>
        `;
        sectionDiv.appendChild(questionDiv);
    });
    if (index < sections.length - 1) {
        document.getElementById('next-btn').style.display = 'block';
        document.getElementById('finish-btn').style.display = 'none';
    } else {
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('finish-btn').style.display = 'block';
    }
}

function nextSection() {
    calculateScore(currentSectionIndex);
    currentSectionIndex++;
    if (currentSectionIndex < sections.length) {
        showSection(currentSectionIndex);
    }
}

function finishTest() {
    calculateScore(currentSectionIndex);
    showResults();
}

function calculateScore(index) {
    const section = sections[index];
    let total = 0;
    questions[section].forEach((_, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected) {
            total += parseInt(selected.value);
        }
    });
    scores[section] = total / questions[section].length;
}

function showResults() {
    document.getElementById('test').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = '';
    Object.keys(scores).forEach(trait => {
        const score = scores[trait];
        const percentage = (score / 5) * 100;
        const traitDiv = document.createElement('div');
        traitDiv.className = 'trait';
        traitDiv.innerHTML = `
            <h3>${capitalize(trait)}</h3>
            <p>Puntuación: ${score.toFixed(2)} / 5</p>
            <div class="progress-bar">
                <div class="progress" style="width: 0%"></div>
            </div>
        `;
        profileDiv.appendChild(traitDiv);
        // Animar la barra después de un pequeño delay
        setTimeout(() => {
            traitDiv.querySelector('.progress').style.width = `${percentage}%`;
        }, 200);
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
