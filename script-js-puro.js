document.addEventListener("DOMContentLoaded", function () {
  let coins = 50;
  let history = [];

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  document.getElementById("bet-button").addEventListener("click", function () {
    const number = parseFloat(document.getElementById("number").value);
    const bet = parseFloat(document.getElementById("bet").value);

    if (!Number.isInteger(number)) {
      alert("Por favor, elige un número entero sin decimales.");
      return;
    }

    if (!Number.isInteger(bet)) {
      alert("Por favor, ingresa un número entero sin decimales.");
      return;
    }

    if (number < 1 || number > 6) {
      alert("Por favor, elige un número entre 1 y 6.");
      return;
    }

    if (bet < 1) {
      alert("La cantidad mínima a apostar es 1 moneda.");
      return;
    }

    if (bet > coins) {
      alert("No tienes suficientes monedas para hacer esta apuesta.");
      return;
    }

    const rolledNumber = getRandomInt(1, 7);
    history.push(rolledNumber);
    const numbersList = document.getElementById("numbers-list");
    const listItem = document.createElement("li");
    listItem.textContent = rolledNumber;
    numbersList.appendChild(listItem);

    if (rolledNumber === number) {
      coins += bet;
      alert(`¡Felicidades! Has ganado ${bet * 2} monedas.`);
    } else {
      coins -= bet;
      alert(`Has perdido ${bet} monedas. Te quedan ${coins} monedas.`);
    }

    document.getElementById("coins").textContent = `Monedas: ${coins}`;

    if (coins <= 0) {
      alert("Game Over");
      document.getElementById("bet-button").disabled = true;
    } else if (coins >= 100) {
      alert("¡Enhorabuena! ¡Has ganado el juego!");
      document.getElementById("bet-button").disabled = true;
    }
  });
});
