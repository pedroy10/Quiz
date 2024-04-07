var currentQuestion = 0;
var correctAnswers = 0; // Corrigido nome da variável

showQuestion();

document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

function showQuestion() {
    if (questions[currentQuestion]) {
        var q = questions[currentQuestion];
        var pct = Math.floor((currentQuestion / questions.length) * 100); // Corrigido nome da propriedade

        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none'; // Corrigido acesso ao estilo
        document.querySelector('.questionArea').style.display = 'block'; // Corrigido acesso ao estilo

        document.querySelector('.question').innerHTML = q.question;
        var optionsHtml = ''; // Corrigida declaração de variável
        for (var i in q.options) {
            optionsHtml += `<div class="option" data-op="${i}"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`; // Corrigido construção de HTML para opções
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    var clickedOption = parseInt(e.target.getAttribute('data-op')); // Corrigido nome da variável
    if (questions[currentQuestion].answer === clickedOption) {
        correctAnswers++; // Incrementado o número de respostas corretas
    }
    currentQuestion++; // Avança para a próxima questão
    showQuestion(); // Mostra a próxima questão
}

function finishQuiz() {
    var points = (correctAnswers / questions.length) * 100; // Corrigido nome da variável

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim ein, fela da puta';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns';
        document.querySelector('.scorePct').style.color = '#00630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você acertou ${correctAnswers} questões de ${questions.length}`;

    document.querySelector('.scoreArea').style.display = 'block'; // Corrigido acesso ao estilo
    document.querySelector('.questionArea').style.display = 'none'; // Corrigido acesso ao estilo
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}