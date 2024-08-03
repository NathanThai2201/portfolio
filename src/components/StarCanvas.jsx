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
      const effect = new Effect(window.innerWidth, window.innerHeight * 1.1, 12345); // enter seed
      effect.init();
      Animate(effect, context);
    };

    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();

    return () => window.removeEventListener('resize', setCanvasSize);
  }, []);

  return <canvas className="starCanvas" ref={canvasRef} />;
};

export default StarCanvas;

class LCG {
  constructor(seed) {
    this.seed = seed;
    // ZX81 LCG
    this.a = 75;
    this.c = 74;
    this.m = Math.pow(2, 16) + 1;
  }

  next() {
    this.seed = (this.a * this.seed + this.c) % this.m;
    return this.seed;
  }

  getvalue() {
    return this.seed / this.m;
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
    for (let i = 0; i < 200; i++) {
      this.particles.push(new Particle(this, this.width, this.height, this.random));
    }
  }

  draw(context) {
    this.particles.forEach(particle => particle.draw(context,this.random));
  }

  update() {
    this.particles.forEach(particle => particle.update());
  }
}

class Particle {
  constructor(effect, width, height, random) {
    this.effect = effect;
    random.next()
    this.x = random.getvalue() * width;
    random.next()
    this.y = random.getvalue() * height;
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

  draw(context,random) {
    // last digit ectract
    random.next()
    let sparkleseed = random.getvalue() % 10
    let factor = undefined

    //console.log(seed)
    //draw
    context.fillStyle = "rgb(146, 186, 255)";
    if ((this.Ox % 10)*10 <9){
      //diamond
      factor=Math.abs(sparkleseed-5)*0.7;
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(this.x - factor, this.y +  factor);
      context.lineTo(this.x, this.y +  factor*2);
      context.lineTo(this.x +  factor, this.y +  factor);
      context.closePath();   
      context.fill();
    }else{
      //star
      factor=Math.abs(sparkleseed-5)*1.2+1;
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(this.x - factor/4, this.y + 3*factor/4);
      context.lineTo(this.x - factor, this.y +  factor);
      context.lineTo(this.x - factor/4, this.y + 5*factor/4);
      context.lineTo(this.x, this.y +  factor*2);
      context.lineTo(this.x + factor/4, this.y + 5*factor/4);
      context.lineTo(this.x +  factor, this.y +  factor);
      context.lineTo(this.x + factor/4, this.y + 3*factor/4);
      context.closePath();   
      context.fill();
    }
    
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
