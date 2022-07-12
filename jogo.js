const sprites = new Image();
sprites.src = './sprites.png';
const spriteChao = new Image();
spriteChao.src = './fundo.jpg';
const spriteInicio = new Image();
spriteInicio.src = './inicio.png'

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
  },
  atualiza() {
    person.atualiza()
  }
}

function loop() {
  telaAtiva.desenha()
  telaAtiva.atualiza()

  requestAnimationFrame(loop)

}
window.addEventListener('click', function(){
  if(telaAtiva.click){
    telaAtiva.click()
  }
})

mudaParaTela(Telas.INICIO)

loop()