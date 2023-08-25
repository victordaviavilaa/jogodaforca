const wordList = ["abobora", "banana", "laranja", "morango", "uva", "janela", "gato", "celular",
"computador", "cartola", "futebol", "carrasco", "fotografia", "morte", "mercado", "protocolo",
"justiça", "cabeça", "trono", "corinthians", "titular", "internacional", "exemplo", "medida",
"reforço", "cama", "mesa", "cadeira", "camiseta", "capuz" ]; // Lista de palavras possíveis
let selectedWord = ""; // Palavra selecionada para o jogo atual
let remainingAttempts = 6;
const guessedLetters = [];

// Função para escolher uma palavra aleatória da lista
function selectRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

// Função para reiniciar o jogo
function restartGame() {
  selectedWord = selectRandomWord();
  remainingAttempts = 6;
  guessedLetters.length = 0; // Limpar as letras adivinhadas
  updateWordDisplay();
  updateAttemptsLeft();
  updateUsedLetters();
  resetHangmanDisplay();
}

function resetHangmanDisplay() {
  document.querySelectorAll(".hangman-container > div").forEach(div => div.style.display = "none");
}

function updateWordDisplay() {
  const wordDisplay = document.querySelector(".word-display");
  const displayArray = selectedWord.split("").map(letter => guessedLetters.includes(letter) ? letter : "_");
  wordDisplay.textContent = displayArray.join(" ");
}

function updateAttemptsLeft() {
  const attemptsLeftDisplay = document.querySelector(".attempts-left");
  attemptsLeftDisplay.textContent = `Tentativas restantes: ${remainingAttempts}`;
}

function updateUsedLetters() {
  const usedLettersDisplay = document.querySelector(".used-letters");
  usedLettersDisplay.textContent = `Letras usadas: ${guessedLetters.join(", ")}`;
}

function checkGameStatus() {
  if (remainingAttempts === 0) {
    document.querySelectorAll(".hangman-container > div").forEach(div => div.style.display = "block");
    alert("Você perdeu! A palavra era: " + selectedWord);
    document.getElementById("guessButton").removeEventListener("click", handleGuess);
  } else if (!document.querySelector(".word-display").textContent.includes("_")) {
    alert("Parabéns! Você venceu!");
    document.getElementById("guessButton").removeEventListener("click", handleGuess);
  }
}

function handleGuess() {
  const guess = document.getElementById("guessInput").value.toLowerCase();
  
  if (guessedLetters.includes(guess)) {
    alert("Você já tentou essa letra!");
    return;
  }

  guessedLetters.push(guess);

  if (!selectedWord.includes(guess)) {
    remainingAttempts--;
    document.querySelectorAll(".hangman-container > div")[6 - remainingAttempts].style.display = "block";
  }

  updateWordDisplay();
  updateAttemptsLeft();
  updateUsedLetters();
  checkGameStatus();
  
  document.getElementById("guessInput").value = "";
}

// Reiniciar o jogo ao carregar a página
window.onload = function () {
  restartGame();
  document.getElementById("guessButton").addEventListener("click", handleGuess);
  document.getElementById("restartButton").addEventListener("click", restartGame);
};
// Função para reiniciar a página
function restartPage() {
  location.reload();
}

// Adicionar evento de clique ao botão de reinício
document.getElementById("restart").addEventListener("click", restartPage);