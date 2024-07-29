$(document).ready(function () {
  // let es una variable que puede cambiar su valor, const es una variable que no puede cambiar su valor

  // inicializamos las monedas a 50 y el historial a vacio
  let coins = 50;
  // = [] es un array vacio
  // este array (lista) se va a ir llenando con los numeros random que salgan en el juego
  let history = [];

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // cogemos el evento click del con el id bet-button
  $("#bet-button").click(function () {
    // lo mismo con los valores de los inputs.
    // nose si esto es basico y lo sabes ya pero bueno. con el $("#id") accedes a ese elemento del DOM (html) y con .val() coges el valor de ese elemento
    // por ejemplo arriba con click capturas ese evento
    // el parsefloat transforma el string en un numero decimal, se podría usar parseInt pero si el usuario mete
    // un decimal no saltará la alerta de que no se pueden decimales porque lo estaríamos transformando a numero entero
    const number = parseFloat($("#number").val()); // numero entre 1 y 6
    const bet = parseFloat($("#bet").val()); // cantidad de monedas a apostar

    /*
     const number = parseInt($("#number").val()); 
    si hacemos eso y el tio mete 1.2 lo tranformamos a 1 y la apuesta sería sobre 1 pero en pantalla seguirias viendo 1.2
    y daría confusión al usuario
    */

    // comprobamos que el numero sea entero
    if (!Number.isInteger(number)) {
      alert("Por favor, elige un número entero sin decimales.");
      return;
    }

    // comprobamos que la apuesta sea numero entera
    if (!Number.isInteger(bet)) {
      alert("Por favor, ingresa un número entero sin decimales.");
      return;
    }

    // comprobamos que el numero esté entre 1 y 6
    if (number < 1 || number > 6) {
      alert("Por favor, elige un número entre 1 y 6.");
      return;
    }

    // comprobamos que la apuesta sea mayor o igual a 1
    if (bet < 1) {
      alert("La cantidad mínima a apostar es 1 moneda.");
      return;
    }

    // comprobamos que la apuesta sea menor o igual a las monedas que tiene el usuario
    if (bet > coins) {
      alert("No tienes suficientes monedas para hacer esta apuesta.");
      return;
    }

    // generamos un numero aleatorio entre 1 y 6
    const rolledNumber = getRandomInt(1, 7);

    // añadimos el numero al historial
    // en un array vamos añadiendo elementos con .push()
    history.push(rolledNumber);

    // cogemos la lista con el id numbers-list y le añadimos un li con el numero que ha salido
    // append añade al final del elemento, en este caso al final del ul
    $("#numbers-list").append(`<li>${rolledNumber}</li>`);

    //  si el numero que ha salido es igual al numero que ha elegido el usuario
    if (rolledNumber === number) {
      // le sumamos al usuario el doble de la apuesta
      // y le mostramos una alerta diciendo que ha ganado multiplicado por 2 la apuesta con * 2
      // coins += bet es lo mismo que coins = coins + bet
      coins += bet;
      alert(`¡Felicidades! Has ganado ${bet * 2} monedas.`);
    } else {
      // si no ha salido el numero que ha elegido el usuario
      // le restamos la apuesta a las monedas
      // y le mostramos una alerta diciendo que ha perdido la apuesta
      // coins -= bet es lo mismo que coins = coins - bet
      coins -= bet;
      alert(`Has perdido ${bet} monedas. Te quedan ${coins} monedas.`);
    }

    // mostramos las monedas que le quedan al usuario
    // con el $() cogemos el elemento con el id coins y con .text() le cambiamos el texto
    $("#coins").text(`Monedas: ${coins}`);

    // si las monedas son menores o iguales a 0
    if (coins <= 0) {
      alert("Game Over");
      // deshabilitamos el boton de apostar
      $("#bet-button").prop("disabled", true);
      // si las monedas son mayores o iguales a 100
    } else if (coins >= 100) {
      alert("¡Enhorabuena! ¡Has ganado el juego!");
      $("#bet-button").prop("disabled", true);
    }
  });
});
