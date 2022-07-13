const sprites = new Image();
sprites.src = './sprites.png';

const spriteChao = new Image();
spriteChao.src = './fundo.jpg';

const spriteInicio = new Image();
spriteInicio.src = './inicio.png'

const spriteBarril = new Image();
spriteBarril.src = './spritebarril.png'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');



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
const barril = {
  spriteX: 0,
  spriteY: 0,
  largura: 360,
  altura: 403,
  x: 300,
  y: 325,
  width: 60,
  height: 60,
  velocidade: 0,
  desenha() {
    contexto.drawImage(
      spriteBarril,
      barril.spriteX, barril.spriteY,
      barril.largura, barril.altura,
      barril.x, barril.y,
      barril.width, barril.height
    )
  },
  atualiza() {
    barril.velocidade = barril.velocidade + 1;
    barril.x = barril.x - 6
  }
}

const chao = {
  spriteX: 0,
  spriteY: 0,
  largura: 1600,
  altura: 800,
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
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


const person = {
  spriteX: 100,
  spriteY: 85,
  largura: 97,
  altura: 168,
  x: 10,
  y: 315,
  width: 80,
  height: 80,
  pulo: 30,
  pula() {
    console.log('devo pular');
    if (person.y >= 310) {
      person.velocidade = 0
      setTimeout(() => { person.y = person.y - 20 }, 25)
      setTimeout(() => { person.y = person.y - 20 }, 50)
      setTimeout(() => { person.y = person.y - 20 }, 75)
      setTimeout(() => { person.y = person.y - 20 }, 100)
      setTimeout(() => { person.y = person.y - 20 }, 125)
      setTimeout(() => { person.y = person.y - 20 }, 150)
      setTimeout(() => { person.y = person.y - 20 }, 175)
      setTimeout(() => { person.y = person.y - 20 }, 200)
      setTimeout(() => { person.y = person.y - 20 }, 225)
    }
  },
  gravidade: 0.25,
  velocidade: 0,
  atualiza() {
    if (person.y <= 315) {
      person.velocidade = person.velocidade + person.gravidade;
      person.y = person.y + person.velocidade
    }
  },
  desenha() {
    contexto.drawImage(
      sprites,
      person.spriteX, person.spriteY,
      person.largura, person.altura,
      person.x, person.y,
      person.width, person.height
    )
  }
}

let telaAtiva = {}
function mudaParaTela(novaTela) {
  telaAtiva = novaTela
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
  desenha() {
    chao.desenha()
    person.desenha()
    barril.desenha()
  },
  click() {
    person.pula()
  },
  atualiza() {
    person.atualiza()
    barril.atualiza()
  }
}

function loop() {
  telaAtiva.desenha()
  telaAtiva.atualiza()

  requestAnimationFrame(loop)

}
window.addEventListener('click', function () {
  if (telaAtiva.click) {
    telaAtiva.click()
  }
})

mudaParaTela(Telas.INICIO)

loop()