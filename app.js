// Elements
const cells = document.querySelectorAll(".cell");
const player = document.querySelectorAll(".player > h3")[1];
const message = document.querySelector(".message");
const winner = document.querySelector(".winner-message");
const btnRestart = document.querySelector(".btn-restart");

let playNow = "Cross"; // Cross or Toe
let playable = true;

// Listener on winner message to restart the game
winner.addEventListener("click", restart);

// Listener on restart button
btnRestart.addEventListener("click", restart);

// Function for restart the game
function restart() {
  // Clear winner message
  winner.innerHTML = "";
  winner.style.display = "none";

  // Clear cells
  cells.forEach((cell) => (cell.innerHTML = ""));

  // Set a player to cross
  player.innerHTML = "Cross";
  playNow = "Cross";

  // Set playable to true
  playable = true;
}

cells.forEach((cell, i) => {
  cell.addEventListener("click", function () {
    if (!playable) return;

    // Check for played cell
    if (isPlayed(cell)) return;

    // Play the cell
    cell.innerHTML =
      playNow === "Cross"
        ? "<img src='./images/cross.svg' />"
        : "<img src='./images/circle.svg' />";

    // Check for no win
    let cellsArray = [];
    cells.forEach((cell) => cellsArray.push(cell.innerHTML));
    const playedBoard = cellsArray.filter((cell) => cell !== "");
    if (playedBoard.length === cells.length) {
      playable = false;
      winner.style.display = "flex";
      winner.innerHTML = "Nobody wins";
    }

    // Check for win
    if (isWin(cell)) {
      winner.style.display = "flex";
      winner.innerHTML = `${playNow} wins!`;
      playable = false;
    } else {
      // Change the player
      player.innerHTML = playNow === "Cross" ? "Toe" : "Cross";
      playNow = player.innerHTML;
    }
  });

  cell.addEventListener("mouseenter", function () {
    if (cell.innerHTML !== "") return;

    cell.style.opacity = "0.5";
    cell.style.backgroundImage =
      playNow === "Cross"
        ? "url(./images/cross.svg)"
        : "url(./images/circle.svg)";
  });

  cell.addEventListener("mouseleave", function () {
    cell.style.opacity = "1";
    cell.style.backgroundImage = "";
  });
});

// Function for check for played cell
function isPlayed(cell) {
  if (cell.innerHTML !== "")
    return cell.innerHTML.includes("cross") ? "X" : "O";
  else return false;
}

// Function for check for win after turn
function isWin(cell) {
  const position = cell.dataset.position;
  const [x, y] = position.split("-");

  let playedBoard = [];
  cells.forEach((cell) =>
    playedBoard.push(
      cell.innerHTML.includes("cross") ? "X" : cell.innerHTML === "" ? "" : "O"
    )
  );
  const combo = playNow === "Cross" ? "XXX" : "OOO";

  // Check for win by Y
  switch (y) {
    case "top":
      if (checkCell([0, 1, 2]) === combo) {
        return true;
      }
      break;
    case "center":
      if (checkCell([3, 4, 5]) === combo) {
        return true;
      }
      break;
    case "bottom":
      if (checkCell([6, 7, 8]) === combo) {
        return true;
      }
      break;
    default:
      throw new Error();
  }

  // Check for win by X
  switch (x) {
    case "left":
      if (checkCell([0, 3, 6]) === combo) {
        return true;
      }
      break;
    case "center":
      if (checkCell([1, 4, 7]) === combo) {
        return true;
      }
      break;
    case "right":
      if (checkCell([2, 5, 8]) === combo) {
        return true;
      }
      break;
    default:
      throw new Error();
  }

  // Check for win by diagonal
  if (checkCell([0, 4, 8]) === combo || checkCell([2, 4, 6]) === combo) {
    return true;
  }
}

// Function for value in cells by its indexes
function checkCell(indexes) {
  const a = cells[indexes[0]].innerHTML.includes("cross")
    ? "X"
    : cells[indexes[0]].innerHTML === ""
    ? ""
    : "O";
  const b = cells[indexes[1]].innerHTML.includes("cross")
    ? "X"
    : cells[indexes[1]].innerHTML === ""
    ? ""
    : "O";
  const c = cells[indexes[2]].innerHTML.includes("cross")
    ? "X"
    : cells[indexes[2]].innerHTML === ""
    ? ""
    : "O";

  return a + b + c;
}
