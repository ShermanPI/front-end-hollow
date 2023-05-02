import { classSelectorMaker, select } from "../utils/dom-functions.js";
import { selectors } from "../utils/selectors.js";

export const minigameExplodeParticles = () => {
  const $itemToClick = select(classSelectorMaker(selectors.itemToClick))

  const canvas = select(classSelectorMaker(selectors.particles))  
  const c = canvas.getContext("2d");

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  addEventListener("resize", ()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  })

  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  const gravity = -0.08;
  const friction = 0.92;

  class Particle {
    constructor(x, y, radius, color, velocity) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity;
      this.alpha = 1; // initial opppasity
      this.shrink = Math.random() * 0.05 + 0.02;
    }

    draw() {
      c.save();
      c.globalAlpha = this.alpha;
      c.beginPath();
      c.shadowBlur = 50;
      c.shadowColor = this.color;
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
      c.restore();
    }

    update() {
      this.draw();
      this.velocity.x *= friction;
      this.velocity.y *= friction;
      this.velocity.y += gravity;
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.alpha -= 0.006; //opacity wich control the times of particles in the screen

      this.radius -= this.shrink;
      if (this.radius < 0.1) {
        this.radius = 0;
        this.alpha = 0;
      }
    }
  }

  //implementation
  let particles = [];

  //animation Loop
  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      if (particle.alpha > 0) {
        particle.update();
      } else {
        particles.splice(index, 1);
      }
    });
  }

  animate();

  addEventListener("click", (e) => {
    if (e.target == $itemToClick) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const particleCount = 40;
      const shootVelocity = 22;
      
      const angleIncrement = Math.PI * 2 / particleCount;

      let particlesColors = ["white"]

      if($itemToClick.getAttribute("data-item-type") == "addTime"){
        particlesColors = ["#2c93b1", "#2c93b1","#2c93b1", "#2c93b1", "#05427c"]
      }

      for (let i = 0; i < particleCount; i++) {
        let radius = Math.random() * (10 - 5) + 5; //Math.random() * (max - min) + min
        particles.push(
          new Particle(
            mouse.x,
            mouse.y,
            radius,
            particlesColors[Math.floor(Math.random() * (particlesColors.length))],
            {
              x: Math.cos(angleIncrement * i) * Math.random() * shootVelocity,
              y: Math.sin(angleIncrement * i) * Math.random() * shootVelocity,
            }
          )
        );
      }
    }
  });
};
