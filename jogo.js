let frames = 0

const sprites = new Image();
sprites.src = './sprites.png';

const spriteBackground = new Image();
spriteBackground.src = './background.png';

const spriteChao = new Image();
spriteChao.src = './novochao.png';

const spriteInicio = new Image();
spriteInicio.src = './inicio.png'

const spriteBarril = new Image();
spriteBarril.src = './spritebarril.png'

const spriteObstaculo = new Image();
spriteObstaculo.src = './traps_pack.svg'

const hit = new Audio();
hit.src = './hit.wav'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


function criaPerson() {
  const person = {
    spriteX: 100,
    spriteY: 85,
    largura: 131,
    altura: 155,
    x: 10,
    y: 300,
    width: 80,
    height: 80,

    pula() {
      window.addEventListener('keyup', function (e) {
        if (e.keyCode === 32) {
          globais.person.y = 350
          setTimeout(() => {
            globais.person.y = 314
          }, 1000);
        }
      });

      if (person.y >= 310) {
        if (person.y !== 350) {
          setTimeout(() => { person.y = person.y - 35 }, 25)
          setTimeout(() => { person.y = person.y - 35 }, 50)
          setTimeout(() => { person.y = person.y - 35 }, 75)
          setTimeout(() => { person.y = person.y - 35 }, 100)
          setTimeout(() => { person.y = person.y - 35 }, 125)

        }
      }
    },
    gravidade: 0.222,
    velocidade: 0,
    atualiza() {

      if (person.y <= 315) {
        person.velocidade = person.velocidade + person.gravidade;
        person.y = person.y + person.velocidade
      }
      else {
        person.velocidade = 0
      }
    },
    movimentos: [
      { spriteX: 1179, spriteY: 87, },
      { spriteX: 900, spriteY: 87, },
      { spriteX: 608, spriteY: 87, },
      { spriteX: 341, spriteY: 87, },
      { spriteX: 83, spriteY: 87, },
    ],
    frameAtual: 0,
    atualizaOFrame() {
      if (globais.person.y >= 300) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + person.frameAtual;
        const baseRepeticao = person.movimentos.length;
        setTimeout(() => { person.frameAtual = incremento % baseRepeticao; }, 50)
      }
    },
    desenha() {
      person.atualizaOFrame()
      const { spriteX, spriteY } = person.movimentos[person.frameAtual]
      if (person.y >= 315) {
        if (person.y <= 335) {
          contexto.drawImage(
            sprites,
            spriteX, spriteY,
            person.largura, person.altura,
            person.x, person.y,
            person.width, person.height
          )
        }
      }
      if (person.y === 350) { // deitado
        contexto.drawImage(
          sprites,
          32, 850,
          145, 69,
          person.x, person.y,
          70, 40
        )
      }
      if (person.y < 310) {
        contexto.drawImage(
          sprites,
          81, 1045,
          person.largura, person.altura,
          person.x, person.y,
          person.width, person.height
        )
      }
    }
  }
  return person
}

function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 30,
    largura: 1200,
    altura: 103,
    x: 0,
    y: 340,
    atualiza() {
      const movimentoDoChao = 8;
      const repeteEm = chao.largura - 50
      const movimentacao = chao.x - movimentoDoChao
      chao.x = movimentacao % repeteEm
    },
    width: canvas.width + 3000 / 2,
    height: 150,
    desenha() {
      contexto.drawImage(
        spriteChao,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x, chao.y,
        chao.width, chao.height
      )
    }
  }
  return chao
}

function criaBackground() {
  const background = {
    spriteX: 0,
    spriteY: 0,
    largura: 832,
    altura: 240,
    x: 0,
    y: 0,
    atualiza() {
      const movimentoDoChao = 1.2;
      const repeteEm = background.largura - 30
      const movimentacao = background.x - movimentoDoChao
      background.x = movimentacao % repeteEm
    },
    width: canvas.width + canvas.width,
    height: canvas.height,
    desenha() {
      contexto.drawImage(
        spriteBackground,
        background.spriteX, background.spriteY,
        background.largura, background.altura,
        background.x, background.y,
        background.width, background.height
      )
    }
  }
  return background
}

function criaBarril() {
  const barril = {
    spriteX: 4321,
    spriteY: 0,
    largura: 777,
    altura: 485,
    width: 120,
    height: 100,
    velocidade: 0,
    desenha() {
      barril.obstaculos.forEach(function (obstaculos) {
        contexto.drawImage(
          spriteObstaculo,
          barril.spriteX, barril.spriteY,
          barril.largura, barril.altura,
          obstaculos.x, obstaculos.y,
          barril.width, barril.height
        )

      })
    },
    temColisaoComOPerson(obstaculos) {

      if (globais.person.x >= obstaculos.x - 45) {
        if (globais.person.y >= obstaculos.y) {
          hit.play()
          return true
        }
      }

      return false
    },
    obstaculos: [
      {

      },
    ],
    atualiza() {
      const passou100Frames = frames % 200 === 0;
      setTimeout(() => {
        if (passou100Frames) {
          barril.obstaculos.push({
            x: canvas.width, y: 300
          })
        }
      }, 0)
      barril.obstaculos.forEach((function (obstaculos) {
        obstaculos.x = obstaculos.x - 8
        if (obstaculos.x + 100 <= 0) {
          barril.obstaculos.shift()
        }
        if (barril.temColisaoComOPerson(obstaculos)) {
          mudaParaTela(Telas.INICIO)
        }
      }))
    }
  }
  return barril
}
function criaObstaculo() {
  const obstacle = {
    spriteX: 231,
    spriteY: 698,
    largura: 1619,
    altura: 1261,
    width: 100,
    height: 180,
    velocidade: 0,
    desenha() {
      obstacle.obstaculos.forEach(function (obstaculos) {
        contexto.drawImage(
          spriteObstaculo,
          obstacle.spriteX, obstacle.spriteY,
          obstacle.largura, obstacle.altura,
          obstaculos.x, obstaculos.y,
          obstacle.width, obstacle.height
        )

      })
    },
    temColisaoComOPerson(obstaculos) {

      if (globais.person.y <= obstaculos.y + obstacle.height & globais.person.x > obstaculos.x) {
        return true
      }
      return false
    },
    obstaculos: [
      {

      },
    ],
    atualiza() {
      const passou100Frames = frames % 200 === 0;
      setTimeout(() => {
        if (passou100Frames) {
          obstacle.obstaculos.push({
            x: canvas.width, y: 145
          })
        }
      }, 2000);
      obstacle.obstaculos.forEach((function (obstaculos) {
        obstaculos.x = obstaculos.x - 8
        if (obstaculos.x + 100 <= 0) {
          obstacle.obstaculos.shift()
        }
        if (obstacle.temColisaoComOPerson(obstaculos)) {
          mudaParaTela(Telas.INICIO)
        }
      }))
    }
  }
  return obstacle
}

const telaInicial = {
  spriteX: 0,
  spriteY: 0,
  largura: 1280,
  altura: 719,
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  desenha() {
    contexto.drawImage(
      spriteInicio,
      telaInicial.spriteX, telaInicial.spriteY,
      telaInicial.largura, telaInicial.altura,
      telaInicial.x, telaInicial.y,
      telaInicial.width, telaInicial.height
    )
  }
}
const globais = {}
function criaPlacar() {
  const placar = {
    pontuacao: 0,
    atualiza() {
      contexto.font = '50px "VT323"'
      contexto.fillText(placar.pontuacao + 1, canvas.width - 30, 35)
      contexto.textAlign = 'right'
      placar.pontuacao = placar.pontuacao + 1
    },
    desenha() { }
  }

  return placar
}


let telaAtiva = {}
function mudaParaTela(novaTela) {
  telaAtiva = novaTela

  if (telaAtiva.inicializa) {
    telaAtiva.inicializa()
  }
}

const Telas = {
  INICIO: {
    desenha() {
      telaInicial.desenha()
    },
    click() {
      mudaParaTela(Telas.JOGO)
    },
    atualiza() {

    }
  }
}

Telas.JOGO = {
  inicializa() {
    globais.person = criaPerson()
    globais.chao = criaChao()
    globais.background = criaBackground()
    globais.barril = criaBarril()
    globais.placar = criaPlacar()
    globais.obstacle = criaObstaculo()
  },
  desenha() {
    globais.background.desenha()
    globais.obstacle.desenha()
    globais.barril.desenha()
    globais.chao.desenha()
    globais.person.desenha()
    globais.placar.desenha()
  },
  click() {
    globais.person.pula()
  },
  atualiza() {
    globais.person.atualiza()
    globais.barril.atualiza()
    globais.chao.atualiza()
    globais.placar.atualiza()
    globais.obstacle.atualiza()
    globais.background.atualiza()
  }
}

function loop() {
  telaAtiva.desenha()
  telaAtiva.atualiza()
  frames = frames + 1

  requestAnimationFrame(loop)

}
window.addEventListener('click', function () {
  if (telaAtiva.click) {
    telaAtiva.click()
  }
})

mudaParaTela(Telas.INICIO)

loop()