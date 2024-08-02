import React, { useEffect, useRef } from 'react';

const StarCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.1;
      draw(context);
    };

    const draw = (context) => {
      context.fillStyle = "rgb(16, 57, 139)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      const effect = new Effect(window.innerWidth, window.innerHeight * 1.1, 12345); // Pass a seed value
      effect.init();
      Animate(effect, context);
    };

    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();

    return () => window.removeEventListener('resize', setCanvasSize);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default StarCanvas;

class LCG {
  constructor(seed) {
    this.seed = seed;
  }

  next() {
    // ZX81 LCG
    const a = 75;
    const c = 74;
    const m = Math.pow(2, 16) + 1;

    this.seed = (a * this.seed + c) % m;
    return this.seed / m;
  }
}

class Effect {
  constructor(width, height, seed) {
    this.width = width;
    this.height = height;
    this.particles = [];
    this.random = new LCG(seed);
    this.mouse = {
        radius: 10000,
        x: undefined,
        y: undefined
    }
    window.addEventListener('mousemove', event => {
        // added correction factors
        this.mouse.x = event.x;
        this.mouse.y = event.y + window.scrollY-window.innerHeight*1.2;
    })
  }

  init() {
    for (let i = 0; i < 500; i++) {
      this.particles.push(new Particle(this, this.width, this.height, this.random));
    }
  }

  draw(context) {
    this.particles.forEach(particle => particle.draw(context));
  }

  update() {
    this.particles.forEach(particle => particle.update());
  }
}

class Particle {
  constructor(effect, width, height, random) {
    this.effect = effect;
    this.x = random.next() * width;
    this.y = random.next() * height;
    this.Ox = Math.floor(this.x);
    this.Oy = Math.floor(this.y);
    this.size = 3;
    this.vx = 0;
    this.vy = 0;
    this.dx = 0;
    this.dy = 0;
    this.dist = 0;
    this.force = 0;
    this.angle = 0;
  }

  draw(context) {
    context.fillStyle = "rgb(146, 186, 255)";
    //context.fillRect(this.x, this.y, this.size, this.size);
    // context.beginPath();
    // context.arc(this.x, this.y, 2, 0, 2 * Math.PI);
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x - 3, this.y + 3);
    context.lineTo(this.x, this.y + 6);
    context.lineTo(this.x + 3, this.y + 3);
    context.closePath();   
    context.fill();
  }

  update() {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.dist = this.dx * this.dx + this.dy * this.dy;
    this.force = -this.effect.mouse.radius / this.dist;

    if (this.dist < this.effect.mouse.radius){
        this.angle = Math.atan2(this.dy, this.dx);
        this.vx +=this.force * Math.cos(this.angle);
        this.vy +=this.force * Math.sin(this.angle);
    }
    // A: dampening       B: easing
    this.x += (this.vx *= 0.7) + (this.Ox - this.x) * 0.2;
    this.y += (this.vy *= 0.7) + (this.Oy - this.y) * 0.2;

  }
}

function Animate(effect, context) {
  context.clearRect(0,0,window.innerWidth, window.innerHeight * 1.1)
  effect.draw(context);
  effect.update();
  window.requestAnimationFrame(() => Animate(effect, context));
}
