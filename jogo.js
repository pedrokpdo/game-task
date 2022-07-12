const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


function loop() {
  contexto.drawImage(
    sprites, 
    100, 85,
    97, 168,
    10, 10,
    100, 130,
  )
  requestAnimationFrame(loop)

}

loop()