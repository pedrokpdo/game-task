const sprites = new Image();
sprites.src = './sprites.png';
const spriteChao = new Image();
spriteChao.src = './fundo.jpg';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');



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
    person.velocidade = person.velocidade + person.gravidade;
    person.y = person.y + person.velocidade
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

function loop() {
  person.atualiza()
  chao.desenha()
  person.desenha()
  requestAnimationFrame(loop)

}

loop()