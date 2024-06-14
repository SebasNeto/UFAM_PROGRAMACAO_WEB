(function () { // (IIFE) - func definida e executada imediatamente
    let FPS = 10 //velocidade jogo
    const SIZE = 40 //tamanho tabuleiro 40x40
  
    //armazenam instâncias do jogo
    let board; //tabuleiro
    let snake; //snake
  
    //inicializa o jogo criando a board e snake
    function init() {
      board = new Board(SIZE);
      snake = new Snake([[4, 4], [4, 5], [4, 6]])
      setInterval(run, 1000 / FPS) //inicia o loop do jogo chamando a função run a cada / FPS
    }
  
    //evento do teclado - captura as teclas de seta pressionadas pelo usuário
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp": //seta para cima
          snake.changeDirection(0)
          break;
        case "ArrowRight": //Seta para a direita
          snake.changeDirection(1)
          break;
        case "ArrowDown": //Seta para baixo
          snake.changeDirection(2)
          break;
        case "ArrowLeft": //Seta para a esquerda
          snake.changeDirection(3)
          break;
        default:
          break;
      }
    })
  
    class Board {
      constructor(size) { //cria uma tabela HTML linhas x colunas
        this.element = document.createElement("table")
        this.element.setAttribute("id", "board")
        this.color = "#ccc";
        document.body.appendChild(this.element) //adiciona a tabela ao corpo do doc HTML
        for (let i = 0; i < size; i++) {
          const row = document.createElement("tr") //linhas
          this.element.appendChild(row);
          for (let j = 0; j < size; j++) {
            const field = document.createElement("td"); //elementos internos
            row.appendChild(field)
          }
        }
      }
    }
  
    class Snake {
      constructor(body) { //inicializa a snake com um corpo
        this.body = body; //posição atual
        this.color = "#222";
        this.direction = 1; // 0 para cima, 1 para direita, 2 para baixo, 3 para esquerda
        this.body.forEach(field => document.querySelector(`#board tr:nth-child(${field[0]}) td:nth-child(${field[1]})`).style.backgroundColor = this.color) //pinta cada segmento
      }
      //move a cobra na direção atual
      walk() {
        const head = this.body[this.body.length - 1];
        let newHead; //posição da babeça
        switch (this.direction) {
          case 0:
            newHead = [head[0] - 1, head[1]]
            break;
          case 1:
            newHead = [head[0], head[1] + 1]
            break;
          case 2:
            newHead = [head[0] + 1, head[1]]
            break;
          case 3:
            newHead = [head[0], head[1] - 1]
            break;
          default:
            break;
        }
        this.body.push(newHead) //adiciona newHead ao final do corpo da snake
        const oldTail = this.body.shift() //remove a calda antiga da snake
        document.querySelector(`#board tr:nth-child(${newHead[0]}) td:nth-child(${newHead[1]})`).style.backgroundColor = this.color
        document.querySelector(`#board tr:nth-child(${oldTail[0]}) td:nth-child(${oldTail[1]})`).style.backgroundColor = board.color
      }
      //atualiza a direção da cobra para a direção fornecida
      changeDirection(direction) {
        this.direction = direction
      }
    }
  
    //posição na direção atual
    function run() {
      snake.walk()
    }
    //inicia jogo snake
    init()
  })()