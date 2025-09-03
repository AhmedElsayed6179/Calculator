const screen = document.getElementById("screen");
const historyList = document.getElementById("history-list");
const historyToggle = document.getElementById("history-toggle");
const historyClear = document.getElementById("history-clear");
let expression = "";

function updateScreen() {
  screen.textContent = expression.replace(/\*/g, "x").replace(/\//g, "÷");
}

function appendNumber(num) {
  expression += num;
  updateScreen();
}

function appendOperator(op) {
  if (expression === "") return;
  const lastChar = expression.slice(-1);
  if ("+-*/%".includes(lastChar)) {
    expression = expression.slice(0, -1) + op;
  } else {
    expression += op;
  }
  updateScreen();
}

function clearScreen() {
  expression = "";
  screen.textContent = "0";
}

function backspace() {
  expression = expression.slice(0, -1);
  if (expression === "") {
    screen.textContent = "0";
  } else {
    updateScreen();
  }
}

function calculate() {
  try {
    const result = eval(expression);
    addToHistory(
      `${expression.replace(/\*/g, "x").replace(/\//g, "÷")} = ${result}`
    );
    expression = result.toString();
    updateScreen();
  } catch {
    screen.textContent = "Error";
  }
}

function addToHistory(entry) {
  const li = document.createElement("li");
  li.textContent = entry;
  historyList.prepend(li);
  if (historyList.childElementCount > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}

// toggle show/hide history list
historyToggle.addEventListener("click", () => {
  if (historyList.style.display === "none") {
    historyList.style.display = "block";
  } else {
    historyList.style.display = "none";
  }
});

// clear history
historyClear.addEventListener("click", () => {
  historyList.innerHTML = "";
});
