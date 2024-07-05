// se inicia el tablero y el primer jugador
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
const cells = document.querySelectorAll("td"); //contiene todas las celdas del tablero
let currentCell; //almacena la celda actual

// URL de la API del proyecto en mockapi
fetch('https://666c325d49dbc5d7145d127c.mockapi.io/preguntas')
    .then(response => response.json())
    .then(data => {
        window.questions = data; //se almacenan en wind quest
        console.log('Preguntas obtenidas:', data); // Verifica que las preguntas se obtienen correctamente
    });

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(index)); // se agrega el evento a cada celda para manejar los clicks
});

function handleClick(index) {
    if (board[index] !== "") return; //si la celda esta ocupada no hace nada,sino almacena el indice de la celda actual y llama a showQuestion para mostrar una pregunta.
    currentCell = index;
    showQuestion();
}

function showQuestion() { //selecciona una pregunta aleatoria
    let question = window.questions[Math.floor(Math.random() * window.questions.length)];
    document.getElementById('questionText').textContent = question.Pregunta;
    
    let answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';

    [question.Respuesta1, question.Respuesta2, question.Respuesta3].forEach((answer, i) => {
        let answerElement = document.createElement('button');
        answerElement.className = 'list-group-item list-group-item-action';
        answerElement.textContent = answer;
        answerElement.onclick = () => checkAnswer(question, i + 1);
        answersContainer.appendChild(answerElement);
    });

    $('#questionModal').modal('show');
}

function checkAnswer(question, selected) { //verifica si la respuesta es correcta, se actualiza el tablero y la celda correspondiente con el jugador actual y se verifica si hay un ganador. Si la respuesta es incorrecta, se muestra una alerta
    $('#questionModal').modal('hide');
    if (question.Verdadera === selected) {
        board[currentCell] = currentPlayer;
        cells[currentCell].textContent = currentPlayer;
        if (checkWin()) {
            setTimeout(() => alert("¡Ganaste!"), 100);
        }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    } else {
        alert('Respuesta incorrecta. Intenta de nuevo.');
    }
}

function checkWin() { //verifica si las condiciones para ganar se cumplen
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
        [0, 4, 8], [2, 4, 6] // Diagonales
    ];

    for (let condition of winConditions) {
        if (condition.every(index => board[index] === currentPlayer)) {
            return true;
        }
    }
    return false;
}
