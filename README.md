# game-with-AI
Игра крестики-нолики с искусственным интеллектом

[Uploa<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8"> <!--подключение кодировки-->
    <title>Игра "Крестики-нолики" | Coursme</title>
    <link rel="stylesheet" href="AI.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
</head>
<body>
  <!-- окно выбора -->
  <div class="select-box"> <!-- блок для сайта-->
    <header>Крестики-нолики</header> <!-- черный квадратик-->
    <div class="content"> <!-- контент блока-->
      <div class="title">Выберите, кем вы хотите быть?</div>
      <div class="options">
        <button class="playerX">Игрок (X)</button>
        <button class="playerO">Игрок (O)</button>
      </div>
    </div>
  </div>

  <!-- игровое поле -->
  <div class="play-board">
    <div class="details">
      <div class="players">
        <span class="Xturn">Ход X</span>
        <span class="Oturn">Ход O</span>
        <div class="slider"></div>
      </div>
    </div>
    <div class="play-area">
      <section>
        <span class="box1"></span>
        <span class="box2"></span>
        <span class="box3"></span>
      </section>
      <section>
        <span class="box4"></span>
        <span class="box5"></span>
        <span class="box6"></span>
      </section>
      <section>
        <span class="box7"></span>
        <span class="box8"></span>
        <span class="box9"></span>
      </section>
    </div>
  </div>

  <!-- окно результата -->
  <div class="result-box">
    <div class="won-text"></div>
    <div class="btn"><button>Играть снова</button></div>
  </div>

  <script src="script.js"></script>
</body>
</html>ding AI.html…]()
