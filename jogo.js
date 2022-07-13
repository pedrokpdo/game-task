let frames = 0

const sprites = new Image();
sprites.src = './sprites.png';

const spriteChao = new Image();
spriteChao.src = './fundo.jpg';

const spriteInicio = new Image();
spriteInicio.src = './inicio.png'

const spriteBarril = new Image();
spriteBarril.src = './spritebarril.png'

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
    movimentos: [
      { spriteX: 1179, spriteY: 87, },
      { spriteX: 900, spriteY: 87, },
      { spriteX: 608, spriteY: 87, },
      { spriteX: 341, spriteY: 87, },
      { spriteX: 83, spriteY: 87, },
    ],
    frameAtual: 0,
    atualizaOFrame() {
      const baseDoIncremento = 1;
      const incremento = baseDoIncremento + person.frameAtual;
      const baseRepeticao = person.movimentos.length;
      setTimeout(() => {person.frameAtual = incremento % baseRepeticao;}, 50)
    },
    desenha() {
      person.atualizaOFrame()
      const { spriteX, spriteY } = person.movimentos[person.frameAtual]
      contexto.drawImage(
        sprites,
        spriteX, spriteY,
        person.largura, person.altura,
        person.x, person.y,
        person.width, person.height
      )
    }
  }
  return person
}

function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 0,
    largura: 1600,
    altura: 800,
    x: 0,
    y: 0,
    atualiza() {
      console.log('chao se moe')
      const movimentoDoChao = 1;
      const repeteEm = chao.largura / 2
      const movimentacao = chao.x - movimentoDoChao

      console.log(chao.x)
      console.log(repeteEm)
      chao.x = movimentacao % repeteEm
    },
    width: 2000,
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
  return chao
}

function criaBarril( ) {
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
      
    }
  }
  return barril
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
    globais.barril = criaBarril()
  },
  desenha() {
    globais.chao.desenha()
    globais.person.desenha()
    globais.barril.desenha()
  },
  click() {
    globais.person.pula()
  },
  atualiza() {
    globais.person.atualiza()
    globais.barril.atualiza()
    globais.chao.atualiza()
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