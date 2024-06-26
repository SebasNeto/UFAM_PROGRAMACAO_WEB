(function () {
  let FPS = 10; 
  const SIZE = 40; 

  // armazenam instâncias do jogo.
  let board, snake, comecomeSnake, score, intervaloId, descanso = false;

  // função que inicializa o jogo criando o tabuleiro e a cobra.
  function init() {
      if (board) {
          document.body.removeChild(board.element);
      }
      document.getElementById('musica-fundo').play();
      board = new Board(SIZE);
      snake = new Snake([[4, 4], [4, 5], [4, 6]]);
      score = 0;
      atualisaScore();
      generatecomecomeSnake();
      document.getElementById('game-over').style.display = 'none';
      if (intervaloId) {
          clearInterval(intervaloId);
      }
      intervaloId = setInterval(run, 1000 / FPS); 
      document.getElementById('musica-fundo').play();
  }

  // função que atualiza o score no HTML.
  function atualisaScore() {
      document.getElementById('score').innerText = score.toString().padStart(5, '0');
  }

  // evento do teclado - captura as teclas de seta pressionadas pelo usuário.
  window.addEventListener("keydown", (e) => {
      switch (e.key) {
          case "ArrowUp": // seta para cima
              snake.changeDirection(0);
              break;
          case "ArrowRight": // seta para a direita
              snake.changeDirection(1);
              break;
          case "ArrowDown": // seta para baixo
              snake.changeDirection(2);
              break;
          case "ArrowLeft": // seta para a esquerda
              snake.changeDirection(3);
              break;
          case "p":
              horaDaPausa();
              break;
          case "s":
              init();
              break;
          default:
              break;
      }
  });

  //função que define a pausa do jogo.
  function horaDaPausa() {
      descanso = !descanso;
      if (descanso) {
          clearInterval(intervaloId);
          document.getElementById('musica-fundo').pause();
      } else {
          intervaloId = setInterval(run, 1000 / FPS);
          document.getElementById('musica-fundo').play();
      }
  }

  //função que cria o tabuleiro do jogo.
  class Board {
      constructor(size) {
          this.element = document.createElement("table");
          this.element.setAttribute("id", "board");
          this.color = "transparent";
          document.body.appendChild(this.element);
          for (let i = 0; i < size; i++) {
              const row = document.createElement("tr"); 
              this.element.appendChild(row);
              for (let j = 0; j < size; j++) {
                  const field = document.createElement("td");
                  row.appendChild(field);
              }
          }
      }
  }

  //função que representa a Snake no jogo.
  class Snake {
      constructor(body) { 
          this.body = body; 
          this.color = "#222";
          this.direction = 1; 
          this.body.forEach(field => this.corCelula(field, this.color)); 
      }
      // move a cobra na direção atual.
      walk() {
          const head = this.body[this.body.length - 1];
          let newHead; 
          switch (this.direction) {
              case 0:
                  newHead = [head[0] - 1, head[1]];
                  break;
              case 1:
                  newHead = [head[0], head[1] + 1];
                  break;
              case 2:
                  newHead = [head[0] + 1, head[1]];
                  break;
              case 3:
                  newHead = [head[0], head[1] - 1];
                  break;
              default:
                  break;
          }

          if (this.cuidadoSnake(newHead))
              return perdeuSnake();
          this.body.push(newHead); 

          if (newHead[0] == comecomeSnake[0] && newHead[1] == comecomeSnake[1]) {
              score += comecomeSnake[2];
              atualisaScore();
              document.getElementById('food-snake').play();
              generatecomecomeSnake();
          } else {
              const caldaVelha = this.body.shift();
              this.corCelula(caldaVelha, board.color);
          }
          this.corCelula(newHead, this.color); 
      }
      // atualiza a direção da cobra para a direção fornecida, evitando 180 graus.
      changeDirection(direction) {
          if (Math.abs(this.direction - direction) !== 2) {
              this.direction = direction;
          }
      }

      // célula específica, caminho da cobra.
      corCelula(posicao, color) {
          document.querySelector(`#board tr:nth-child(${posicao[0] + 1}) td:nth-child(${posicao[1] + 1})`).style.backgroundColor = color;
      }

      // verificando colisão com corpo e parede.
      cuidadoSnake([row, bateuSnake]) {
          return row < 0 || bateuSnake < 0 || row >= SIZE || bateuSnake >= SIZE || this.body.some(segment => segment[0] === row && segment[1] === bateuSnake);
      }

      //limpa a cobra do tabuleiro.
      clearSnake() {
          this.body.forEach(segment => this.corCelula(segment, board.color));
      }
  }

  //função que gera comida para a Snake em posição aleatória.
  function generatecomecomeSnake() {
      let row, col;
      do {
          row = Math.floor(Math.random() * SIZE);
          col = Math.floor(Math.random() * SIZE);
      } while (snake.body.some(segment => segment[0] === row && segment[1] === col));
      const type = Math.random() < 0.67 ? 1 : 2;
      comecomeSnake = [row, col, type];
      document.querySelector(`#board tr:nth-child(${row + 1}) td:nth-child(${col + 1})`).style.backgroundColor = type === 1 ? 'black' : 'red';
  }

  //função que executa ações no caso de gamer over. 
  function perdeuSnake() {
      snake.clearSnake();
      clearInterval(intervaloId);
      intervaloId = null;
      document.getElementById('musica-fundo').pause();
      document.getElementById('over-game').play();
      document.getElementById('game-over').style.display = 'block';
      document.getElementById('over-game').stop();
  }

  //função que controla o loop principal do jogo.
  function run() {
      if (!descanso) {
          snake.walk();
          if (FPS < 60) FPS += 1 / 60;
          clearInterval(intervaloId);
          intervaloId = setInterval(run, 1000 / FPS);
      }
  }

  //inicia o jogo.
  init();
})();
