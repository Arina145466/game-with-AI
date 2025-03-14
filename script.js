//выбор всех необходимых элементов
const selectBox = document.querySelector(".select-box"), // Получаем элемент select box из DOM. Он содержит кнопки выбора игрока (X или O).
    selectBtnX = selectBox.querySelector(".options .playerX"), // Получаем кнопку выбора игрока X из select box
    selectBtnO = selectBox.querySelector(".options .playerO"), // Получаем кнопку выбора игрока O из select box
    playBoard = document.querySelector(".play-board"), // Получаем элемент игрового поля из DOM
    players = document.querySelector(".players"), // Получаем элемент players из DOM. Используется для отображения, чей сейчас ход.
    allBox = document.querySelectorAll("section span"), // Получаем все ячейки игрового поля (span элементы внутри section)
    resultBox = document.querySelector(".result-box"), // Получаем элемент блока с результатом из DOM. Отображается после окончания игры.
    wonText = resultBox.querySelector(".won-text"), // Получаем элемент текста с результатом из блока с результатом
    replayBtn = resultBox.querySelector("button"); // Получаем кнопку повтора из блока с результатом

window.onload = () => { //после загрузки окна
    for (let i = 0; i < allBox.length; i++) { //добавляем атрибут onclick для всех доступных span
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectBtnX.onclick = () => {
    selectBox.classList.add("hide"); //скрываем select box
    playBoard.classList.add("show"); //показываем секцию playboard
}

selectBtnO.onclick = () => {
    selectBox.classList.add("hide"); //скрываем select box
    playBoard.classList.add("show"); //показываем секцию playboard
    players.setAttribute("class", "players active player"); //устанавливаем атрибут class для players со значениями players active player
}

let playerXIcon = "fas fa-times"; //имя класса иконки крестика из FontAwesome
let playerOIcon = "far fa-circle"; //имя класса иконки круга из FontAwesome
let playerSign = "X"; //глобальная переменная, так как мы используем ее в нескольких функциях
let runBot = true; //глобальная переменная с булевым значением, мы используем ее, чтобы остановить бота, когда кто-то выиграет или будет ничья

// функция клика пользователя
function clickedBox(element) {
    if (players.classList.contains("player")) {
        playerSign = "O"; //если игрок выбрал O, меняем playerSign на O
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //добавляем тег иконки круга в кликнутый пользователем элемент/ячейку
        players.classList.remove("active"); //удаляем активный класс у players
        element.setAttribute("id", playerSign); //устанавливаем атрибут id в span/ячейке с выбранным знаком игрока
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //добавляем тег иконки крестика в кликнутый пользователем элемент/ячейку
        element.setAttribute("id", playerSign); //устанавливаем атрибут id в span/ячейке с выбранным знаком игрока
        players.classList.add("active"); //добавляем активный класс к players
    }
    selectWinner(); //вызываем функцию selectWinner
    element.style.pointerEvents = "none"; //после выбора ячейки пользователем, она больше не может быть кликнута
    playBoard.style.pointerEvents = "none"; //устанавливаем pointerEvents в none для игрового поля, чтобы пользователь не мог сразу кликнуть на другую ячейку, пока бот не сделает ход
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed(); //генерируем случайное время задержки, чтобы бот выбирал ячейку с задержкой
    setTimeout(() => {
        bot(runBot); //вызываем функцию бота
    }, randomTimeDelay); //передаем случайное значение задержки
}

function getIdVal(classname) {
    return document.querySelector(".box" + classname).id; //возвращаем значение id
}

function checkIdSign(val1, val2, val3, sign) { //проверяем, равны ли все значения id знаку (X или O), если да, то возвращаем true
    if (getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign) {
        return true;
    }
}

function selectWinner() { //если совпадает одна из следующих выигрышных комбинаций, выбираем победителя
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) || checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {
        runBot = false; //устанавливаем runBot в false, чтобы бот больше не выполнялся
        bot(runBot); //вызываем функцию бота
        setTimeout(() => { //после выигрыша одного из игроков скрываем игровое поле и показываем блок с результатом через 700 мс
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700); //1с = 1000мс
        wonText.innerHTML = `Игрок <p>${playerSign}</p> выиграл игру!`; //отображаем текст победы с использованием playerSign (X или O)
    } else { //если все ячейки/элементы имеют значение id и никто не выиграл, то игра заканчивается вничью
        if (getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != "") {
            runBot = false; //устанавливаем runBot в false, чтобы бот больше не выполнялся
            bot(runBot); //вызываем функцию бота
            setTimeout(() => { //после ничьей скрываем игровое поле и показываем блок с результатом через 700 мс
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700); //1с = 1000мс
            wonText.textContent = "Матч закончился вничью!"; //отображаем текст ничьей
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload(); //перезагружаем текущую страницу при клике на кнопку повтора
}

// функция автоматического выбора бота с использованием алгоритма минимакса
function bot() {
    if (runBot) { // Проверяем, разрешено ли боту делать ход (игра еще не окончена)
        playerSign = "O"; // Бот играет за O

        let bestMove = getBestMove(); // Получаем наилучший ход, вычисленный алгоритмом Minimax

        if (bestMove !== null) { // Проверяем, что есть доступные ходы
            if (players.classList.contains("player")) {
                playerSign = "X"; //если игрок выбрал O, значит бот будет X
                allBox[bestMove].innerHTML = `<i class="${playerXIcon}"></i>`; //добавляем тег иконки крестика в выбранный ботом элемент
                allBox[bestMove].setAttribute("id", playerSign); //устанавливаем атрибут id в span/ячейке с выбранным знаком игрока
                players.classList.add("active"); //добавляем активный класс к players
            } else {
                allBox[bestMove].innerHTML = `<i class="${playerOIcon}"></i>`; //добавляем тег иконки круга в выбранный ботом элемент
                players.classList.remove("active"); //удаляем активный класс у players
                allBox[bestMove].setAttribute("id", playerSign); //устанавливаем атрибут id в span/ячейке с выбранным знаком игрока
            }
            selectWinner(); //вызываем функцию selectWinner
            allBox[bestMove].style.pointerEvents = "none"; //после выбора ячейки ботом пользователь не может кликнуть на эту ячейку
            playBoard.style.pointerEvents = "auto"; //устанавливаем pointerEvents в auto для игрового поля, чтобы пользователь снова мог кликнуть на ячейку
            playerSign = "X"; //если игрок выбрал X, то бот будет O, затем мы снова меняем playerSign на X, чтобы пользователь был X, так как выше мы изменили playerSign на O для бота

        }
    }
}

// Функция для оценки состояния доски (выигрыш, проигрыш, ничья)
function evaluate(board) {
    if (checkWin(board, "O")) {
        return 10; // Бот выиграл
    }
    if (checkWin(board, "X")) {
        return -10; // Игрок выиграл
    }
    return 0; // Ничья
}

// Функция для проверки, есть ли победитель
function checkWin(board, player) {
    // Проверка строк
    for (let i = 0; i < 3; i++) {
        if (getIdVal(i * 3 + 1) === player && getIdVal(i * 3 + 2) === player && getIdVal(i * 3 + 3) === player) {
            return true;
        }
    }
    // Проверка столбцов
    for (let i = 0; i < 3; i++) {
        if (getIdVal(i + 1) === player && getIdVal(i + 4) === player && getIdVal(i + 7) === player) {
            return true;
        }
    }
    // Проверка диагоналей
    if (getIdVal(1) === player && getIdVal(5) === player && getIdVal(9) === player) {
        return true;
    }
    if (getIdVal(3) === player && getIdVal(5) === player && getIdVal(7) === player) {
        return true;
    }

    return false;
}


// Функция Minimax
function minimax(board, depth, isMaximizing) {
    let score = evaluate(board); // Получаем оценку текущего состояния доски
    if (score === 10) {
        return score - depth; //Более быстрый выигрыш лучше
    }
    if (score === -10) {
        return score + depth; //Более поздний проигрыш лучше
    }
    if (isBoardFull(board)) {
        return 0;
    }

    if (isMaximizing) { // Если сейчас ход максимизирующего игрока (бота)
        let best = -Infinity; // Инициализируем лучшую оценку как отрицательную бесконечность
        for (let i = 0; i < 9; i++) { // Перебираем все ячейки доски
            if (getIdVal(i + 1) == "") { // Если ячейка свободна
                let tempBoard = [...board]; // Создаем копию доски
                tempBoard[i] = "O"; // Делаем ход на копии доски (бот ставит "O")
                document.querySelector(".box" + (i + 1)).id = "O"; // временно ставим id чтобы сымитировать ход на доске
                best = Math.max(best, minimax(tempBoard, depth + 1, !isMaximizing)); // Рекурсивно вызываем minimax для следующего хода (минимизирующего игрока) и выбираем максимальную оценку
                document.querySelector(".box" + (i + 1)).id = ""; // Undo the move (отменяем ход на копии доски для следующих итераций)
            }
        }
        return best; // Возвращаем лучшую оценку
    } else { // Если сейчас ход минимизирующего игрока (человека)
        let best = Infinity; // Инициализируем лучшую оценку как положительную бесконечность
        for (let i = 0; i < 9; i++) { // Перебираем все ячейки доски
            if (getIdVal(i + 1) == "") { // Если ячейка свободна
                let tempBoard = [...board]; // Создаем копию доски
                tempBoard[i] = "X"; // Делаем ход на копии доски (человек ставит "X")
                 document.querySelector(".box" + (i + 1)).id = "X"; // временно ставим id чтобы сымитировать ход на доске
                best = Math.min(best, minimax(tempBoard, depth + 1, !isMaximizing)); // Рекурсивно вызываем minimax для следующего хода (максимизирующего игрока) и выбираем минимальную оценку
                document.querySelector(".box" + (i + 1)).id = ""; // Undo the move (отменяем ход на копии доски для следующих итераций)

            }
        }
        return best; // Возвращаем лучшую оценку
    }
}

// Функция для определения лучшего хода
function getBestMove() {
    let bestScore = -Infinity; // Инициализируем лучшую оценку как отрицательную бесконечность
    let move = null; // Инициализируем лучший ход как null
    let board = []; // Создаем массив для представления текущего состояния доски
    for (let i = 0; i < 9; i++) { // Заполняем массив состоянием каждой ячейки
        board[i] = getIdVal(i + 1);
    }

    for (let i = 0; i < 9; i++) { // Перебираем все ячейки доски
        if (getIdVal(i + 1) == "") { // Если ячейка свободна
            let tempBoard = [...board]; // Создаем копию доски
            tempBoard[i] = "O"; // Делаем ход на копии доски (бот ставит "O")
            document.querySelector(".box" + (i + 1)).id = "O"; // временно ставим id чтобы сымитировать ход на доске

            let score = minimax(tempBoard, 0, false); // Вызываем minimax для оценки этого хода
            document.querySelector(".box" + (i + 1)).id = ""; // Undo the move (отменяем ход)

            if (score > bestScore) { // Если оценка лучше, чем текущая лучшая оценка
                bestScore = score; // Обновляем лучшую оценку
                move = i; // Запоминаем лучший ход
            }
        }
    }
    return move; // Возвращаем лучший ход
}

// Вспомогательная функция для проверки, заполнена ли доска
function isBoardFull(board) {
    for (let i = 0; i < 9; i++) { // Перебираем все ячейки доски
        if (getIdVal(i + 1) == "") { // Если ячейка свободна
            return false; // Доска не заполнена
        }
    }
    return true; // Доска заполнена
}
