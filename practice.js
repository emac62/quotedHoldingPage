let practiceQuote = ""
let author = ""
let quoteArr = []
let quoteArrLen = quoteArr.length
let numberOfRows = 2
let lengthOfRows = []
let rowArray = []
let spaces = [];
let letterBoxes = []
let letterBoxesLen = 0
var currentGuess = []
var nextLetter = 0
let isSolving = false
let userInput = false
let quoteArrToCompare = []
let firstEmpty = 0

let qA = document.getElementById("qA")
let delBtnP = document.getElementById("DEL")
delBtnP.disabled = true
let enterBtnP = document.getElementById("ENTER")
let keyboardBtns = document.getElementsByClassName("keyboard-button")
let solveBtn = document.getElementById("solveBtnP")
async function getvals() {
  try {
    const response = await fetch("https://api.quotable.io/random?minLength=30&maxLength=70",
      {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
    const responseData = await response.json()
    if (response.ok) {
      qA.textContent = "- " + responseData.author
    } else {
      qA.textContent = "- Unknown"
    }

    return responseData
  } catch (error) {
    return console.warn(error)
  }
}

getvals().then(response => setQuote(response));

function setQuote(response) {
  practiceQuote = response.content
  practiceQuote = practiceQuote.toUpperCase()
  author = response.author
  quoteArr = Array.from(practiceQuote)
  quoteArrToCompare = quoteArr
  quoteArrLen = quoteArr.length
  initBoard()
  var buttons = document.querySelectorAll(".keyboard-button").length;
  for (var i = 0; i < buttons; i++) {
    let btn = document.querySelectorAll(".keyboard-button")[i]
    btn.addEventListener("click", function () {
      let pressedKey = btn.textContent

      if (pressedKey == "Guess the Quote") {
        guessThePhrase()
      }
      if (pressedKey == "Solve") {
        checkSaying()
      }
      let found = pressedKey.match(/[A-Z]/gi)
      if (!found || found.length > 1) {
        return
      } else if (isSolving === true && userInput === true) {
        enterUserInput(pressedKey)
      } else if (isSolving === true) {
        enterGuessLetters(pressedKey)
      } else {
        btn.style.backgroundColor = "#75ADAF"
        insertLetter(pressedKey)

      }
    });

  }

  enterBtnP.addEventListener("click", function () {
    pressEnter()
  })


  delBtnP.addEventListener("click", function () {
    if (!isSolving) {
      deleteLetter(currentGuess[currentGuess.length - 1])
    } else {
      if (guessBoxesUsed.length > 0) {
        let letter = document.getElementById(guessBoxesUsed[guessBoxesUsed.length - 1]).textContent
        deleteLetter(letter)
      }

    }
  })
}
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '1.5s');
    node.classList.add(`${prefix}animated`, animationName);
    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }
    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}


function getRowLength() {
  for (var i = 0; i < quoteArrLen; i++) {
    if (quoteArr[i] === " ") {
      spaces.push(i)
    }
  }

  const closestIndex = (num, spaces) => {
    if (quoteArrLen < 20) {
    }
    let curr = spaces[0], diff = Math.abs(num - curr);
    let index = 0;
    let spacesLength = spaces.length
    for (let i = 0; i < spacesLength; i++) {
      let newdiff = Math.abs(num - spaces[i]);
      if (newdiff < diff) {
        diff = newdiff;
        curr = spaces[i];
        index = i;
      };
    };
    return index;
  };

  lengthOfRows.push(spaces[closestIndex(8, spaces)])
  rowArray.push(lengthOfRows[0])

  lengthOfRows.push(spaces[closestIndex((rowArray.reduce((a, b) => a + b, 0) + 10), spaces)])
  let secondRow = lengthOfRows[1] - lengthOfRows[0]
  if (secondRow != 0) {
    rowArray.push(secondRow)
  }

  lengthOfRows.push(spaces[closestIndex((rowArray.reduce((a, b) => a + b, 0) + 10), spaces)])
  if (lengthOfRows[2] != lengthOfRows[1]) {
    let thirdRow = lengthOfRows[2] - lengthOfRows[1]
    rowArray.push(thirdRow)
  }
  lengthOfRows.push(spaces[closestIndex((rowArray.reduce((a, b) => a + b, 0) + 10), spaces)])
  if (lengthOfRows[3] != lengthOfRows[2]) {
    let fourthRow = lengthOfRows[3] - lengthOfRows[2]
    rowArray.push(fourthRow)
  }
  lengthOfRows.push(spaces[closestIndex((rowArray.reduce((a, b) => a + b, 0) + 10), spaces)])
  if (lengthOfRows[4] != lengthOfRows[3]) {
    let fifthRow = lengthOfRows[4] - lengthOfRows[3]
    rowArray.push(fifthRow)
  }
  lengthOfRows.push(spaces[closestIndex((rowArray.reduce((a, b) => a + b, 0) + 10), spaces)])
  if (lengthOfRows[5] != lengthOfRows[4]) {
    let fifthRow = lengthOfRows[5] - lengthOfRows[4]
    rowArray.push(fifthRow)
  }
  lengthOfRows.push(spaces[closestIndex((rowArray.reduce((a, b) => a + b, 0) + 10), spaces)])
  if (lengthOfRows[6] != lengthOfRows[5]) {
    let sixthRow = lengthOfRows[6] - lengthOfRows[5]
    rowArray.push(sixthRow)
  }
  lengthOfRows.push(spaces[closestIndex((rowArray.reduce((a, b) => a + b, 0) + 10), spaces)])
  if (lengthOfRows[7] != lengthOfRows[6]) {
    let seventhRow = lengthOfRows[7] - lengthOfRows[6]
    rowArray.push(seventhRow)
  }
  lengthOfRows.push(spaces[closestIndex((rowArray.reduce((a, b) => a + b, 0) + 10), spaces)])
  if (lengthOfRows[8] != lengthOfRows[7]) {
    let eigthhRow = lengthOfRows[8] - lengthOfRows[7]
    rowArray.push(eigthhRow)
  }

  let sum = rowArray.reduce((a, b) => a + b, 0);
  let lastRow = quoteArrLen - sum
  rowArray.push(lastRow)

  numberOfRows = rowArray.length
}

function initBoard() {
  getRowLength()
  let board = document.getElementById("game-board");
  for (var i = 0; i < numberOfRows; i++) {
    let row = document.createElement("div")
    row.className = "letter-row"

    for (var j = 0; j < rowArray[i]; j++) {
      let box = document.createElement("button")
      box.className = "letter-box"
      row.appendChild(box)
    }
    board.appendChild(row)
  }
  letterBoxes = document.getElementsByClassName('letter-box')
  letterBoxesLen = letterBoxes.length
  for (var i = 0; i < letterBoxesLen; i++) {
    letterBoxes[i].id = i
    letterBoxes[i].disabled = true
    if (quoteArr[i].match(/[.;:"'!, -?]/gi)) {
      letterBoxes[i].style.borderColor = "transparent"
      letterBoxes[i].style.color = "#F5F4F4"
      letterBoxes[i].textContent = quoteArr[i]
    }
  }

}

function toastPopup(toastMessage) {
  let notice = document.getElementById("toast")
  notice.className = "show"
  notice.innerHTML = toastMessage
  setTimeout(function () { notice.className = notice.className.replace("show", ""); }, 3000)
}
function insertLetter(pressedKey) {

  if (currentGuess.includes(pressedKey)) {
    document.getElementById(pressedKey).style.backgroundColor = "#739976"
    toastPopup("You've already selected that letter.")
    delBtnP.disabled = true
    return
  }

  if (nextLetter === 10) {
    document.getElementById(pressedKey).style.backgroundColor = "#F5F4F4"
    toastPopup("10/10 letters used. Try solving.")
    guessThePhrase()
  } else {
    if (isSolving === false) {
      delBtnP.style.backgroundColor = "#F7E7CE"
      enterBtnP.style.backgroundColor = "yellow"
      animateCSS(ENTER, "tada")
      for (const elem of keyboardBtns) {
        elem.disabled = true
      }
    }

    currentGuess.push(pressedKey)
    nextLetter += 1
    delBtnP.disabled = false

  }
}

function revealAnswer() {
  for (var i = 0; i < quoteArrLen; i++) {
    letterBoxes[i].textContent = quoteArr[i]
    letterBoxes[i].style.border = "none"
    letterBoxes[i].style.backgroundColor = "#739976"
    letterBoxes[i].style.color = "white"
    animateCSS(letterBoxes[i], 'bounce')

  }
}

function deleteLetter(pressedKey) {
  delBtnP.style.backgroundColor = "#F5F4F4"
  if (isSolving === false) {
    enterBtnP.style.backgroundColor = "#F5F4F4"
    let delLet = document.getElementById(pressedKey)
    if (delLet.textContent === pressedKey) {
      delLet.style.backgroundColor = "#F5F4F4"
      currentGuess.pop()
      nextLetter -= 1
    }
    for (const elem of keyboardBtns) {
      elem.disabled = false
    }
    delBtnP.disabled = true
  } else {
    if (guessBoxesUsed.length > 0) {
      let boxId = guessBoxesUsed[guessBoxesUsed.length - 1]
      let box = document.getElementById(boxId)
      box.textContent = ""
      box.classList.remove("letter-box-used")
      // box.classList.add("letter-box-unselected")

      document.querySelectorAll('.letter-box-selected').forEach(function (box) {
        box.classList.remove("letter-box-selected")
      });
      getFirstEmptyGuessBox()
      document.getElementById(guessBoxes[firstEmpty]).classList.add("letter-box-selected")
      guessBoxesUsed.pop(boxId)
      selectedBox.pop(boxId)
    }
  }
}

const pressEnter = async () => {
  if (isSolving === false) {
    enterBtnP.style.backgroundColor = "#F5F4F4"
  }
  delBtnP.style.backgroundColor = "#F5F4F4"
  delBtnP.disabled = true

  for (var i = 0; i < quoteArrLen; i++) {
    let box = letterBoxes[i]
    let letter = currentGuess[nextLetter - 1]
    let letterPosition = quoteArr.indexOf(letter)

    if (letterPosition === -1) {
      animateCSS(box, 'headShake')
      shadeKeyBoard(letter, "#182835")
    } else if (quoteArr[i] === letter) {
      animateCSS(box, 'flipInX')
      box.textContent = letter
      box.classList.add("letter-box-used")
      box.style.backgroundColor = "#739976"
      box.style.color = "#F5F4F4"
      shadeKeyBoard(currentGuess[nextLetter - 1], '#739976')

    }
    await sleep(50)
  }
  for (const elem of keyboardBtns) {
    elem.disabled = false
  }
  updateCount()
  checkSaying()
}


function updateCount() {
  document.getElementById('guessCountP').innerHTML = currentGuess.length
  let el = document.getElementById('countP')
  animateCSS(el, "bounce")
}

function shadeKeyBoard(letter, color) {
  let el = document.getElementById(letter)
  el.style.backgroundColor = color
  if (color === "#182835") {
    animateCSS(el, "fadeOut")
  }

}

function removeItem(array, item) {
  return array.filter((i) => i !== item);
}

function checkSaying() {
  if (isSolving === true) {
    let compareBoxes = []
    let text = ""
    for (var i = 0; i < letterBoxesLen; i++) {
      text = letterBoxes[i].textContent
      compareBoxes.push(text)
    }
    var isSame = (quoteArrLen == compareBoxes.length) && quoteArr.every(function (element, index) {
      return element === compareBoxes[index];
    });
    if (isSame == false) {
      toastPopup("Sorry, that is not correct.")
      for (var i = 0; i < letterBoxesLen; i++) {
        if (compareBoxes[i] != quoteArr[i]) {
          letterBoxes[i].style.color = "red"
        }
      }
      setTimeout(revealAnswer, 6000)
      // setTimeout(function () { $('#endOfGameModal').modal('show') }, 8000)
      solveBtn.style.border = "none"
    } else {
      for (var i = 0; i < letterBoxesLen; i++) {
        animateCSS(letterBoxes[i], 'flipInX')
        letterBoxes[i].style.border = "none"
        letterBoxes[i].style.backgroundColor = "#739976"
        letterBoxes[i].style.color = "white"
      }
      toastPopup("Correct!")
      setTimeout(revealAnswer, 3000)
      solveBtn.style.border = "none"

    }
  } else {
    quoteArrToCompare = removeItem(quoteArrToCompare, currentGuess[nextLetter - 1])
    if (quoteArrToCompare.length === 0) {
      toastPopup("Correct!")
      setTimeout(revealAnswer, 3000)

      solveBtn.style.border = "none"
    }
  }

}

let guessBoxesUsed = []
let guessBoxes = []
let guessBoxesLen = 0

function guessThePhrase() {
  isSolving = true
  delBtnP.disabled = true
  enterBtnP.disabled = true
  for (var i = 0; i < letterBoxesLen; i++) {
    let box = letterBoxes[i]
    if (!box.hasChildNodes()) {
      box.style.backgroundColor = "#75ADAF"
      guessBoxes.push(box.id)
      box.disabled = false
      box.classList.add("guessBox")
      box.addEventListener("click", function () {
        getUserInput(box.id)
      })
    }
  }
  guessBoxesLen = guessBoxes.length
  if (guessBoxesLen > 0) {
    document.getElementById(guessBoxes[firstEmpty]).classList.add("letter-box-selected")
  }
}

let selectedBox = []

var guess
function getFirstEmptyGuessBox() {
  for (var i = 0; i < guessBoxesLen; i++) {
    let box = document.getElementById(guessBoxes[i])
    if (!box.hasChildNodes()) {
      firstEmpty = i
      break
    }
  }
}

function getUserInput(box) {
  userInput = true
  document.querySelectorAll('.letter-box-selected').forEach(function (box) {
    box.classList.remove("letter-box-selected")
  });

  selectedBox.push(box)

  document.getElementById(selectedBox[selectedBox.length - 1]).classList.add("letter-box-selected")

}

function enterUserInput(pressedKey) {
  delBtnP.disabled = false
  let latestClick = selectedBox[selectedBox.length - 1]
  let el = document.getElementById(latestClick)
  el.textContent = pressedKey
  el.style.color = "#F5F4F4"
  el.classList.remove("letter-box-selected")
  el.classList.remove("letter-box-unselected")
  el.classList.add("letter-box-used")
  guessBoxesUsed.push(latestClick)
  userInput = false
  getFirstEmptyGuessBox()
  document.getElementById(guessBoxes[firstEmpty]).classList.add("letter-box-selected")
}

function enterGuessLetters(pressedKey) {
  delBtnP.disabled = false
  if (guessBoxes.length > 0) {

    if (!userInput) {
      getFirstEmptyGuessBox()
      guess = document.getElementById(guessBoxes[firstEmpty])
    } else {
      guess = document.getElementById(selectedBox[selectedBox.length - 1])
    }
    if (pressedKey === " ") {
      guess.textContent = "_"
    } else {
      guess.textContent = pressedKey
    }
    guessBoxesUsed.push(guess.id)
    guess.classList.remove("letter-box-selected")
    guess.classList.add("letter-box-used")
    guess.style.color = "#F5F4F4"
    getFirstEmptyGuessBox()
    userInput = false
    document.getElementById(guessBoxes[firstEmpty]).classList.add("letter-box-selected")
  }
  solveBtn.textContent = "Solve"
  if (guessBoxesLen === guessBoxesUsed.length) {
    solveBtn.style.border = "2px solid yellow"
  }
}



