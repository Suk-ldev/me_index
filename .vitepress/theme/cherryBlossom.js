// Cherry Blossom Falling Animation
// Based on: https://kukual.github.io/posts/1361a6d9/index.html

export default class CherryBlossom {
    constructor(options = {}) {
        this.options = {
            particleCount: 50,
            color: '#FFB6C1',
            size: { min: 3, max: 8 },
            speed: { min: 1, max: 2 },
            ...options
        };
        
        // Debug: log that the constructor is called
        console.log('CherryBlossom constructor called with options:', this.options);
        
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '99999'; // Higher z-index to ensure visibility
        
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            throw new Error('Could not get canvas context');
        }

        this.animationId = null;
        this.particles = [];
        this.particleCount = this.options.particleCount;
        
        // Adjust particle count based on screen size
        this.resizeCanvas();
        this.initializeParticles();
        
        window.addEventListener('resize', () => this.handleResize());
        document.body.appendChild(this.canvas);
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    handleResize() {
        const prevWidth = this.canvas.width;
        this.resizeCanvas();
        
        // Adjust particle count based on screen size change
        const screenArea = this.canvas.width * this.canvas.height;
        const baseArea = 1920 * 1080; // 1080p baseline
        const newCount = Math.round((screenArea / baseArea) * this.options.particleCount);
        
        if (newCount !== this.particles.length) {
            this.particleCount = newCount;
            this.initializeParticles();
        }
    }

    initializeParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas.width, this.canvas.height, this.options));
        }
    }

    start() {
        if (this.animationId) {
            this.stop();
        }
        this.animate();
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    destroy() {
        this.stop();
        if (this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        window.removeEventListener('resize', () => this.handleResize());
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (const particle of this.particles) {
            particle.update();
            particle.draw(this.ctx);
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(canvasWidth, canvasHeight, options) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.options = options;
        
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * -canvasHeight;
        this.size = Math.random() * (options.size.max - options.size.min) + options.size.min;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * (options.speed.max - options.speed.min) + options.speed.min;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = Math.random() * 0.05 - 0.025;
    }

    update() {
        this.x += this.speedX + Math.sin(this.angle) * 0.5;
        this.y += this.speedY;
        this.angle += this.angleSpeed;

        if (this.y > this.canvasHeight) {
            this.y = Math.random() * -20;
            this.x = Math.random() * this.canvasWidth;
            this.speedY = Math.random() * (this.options.speed.max - this.options.speed.min) + this.options.speed.min;
        }

        if (this.x > this.canvasWidth + 10) {
            this.x = -10;
        } else if (this.x < -10) {
            this.x = this.canvasWidth + 10;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        // Draw cherry blossom petal
        ctx.fillStyle = this.options.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 1.5, this.size, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}
