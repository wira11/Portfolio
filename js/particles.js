// ═══════════════════════════════════════════════════════════════════════════
// WORLD-CLASS PARTICLE ANIMATION SYSTEM - ELITE PREMIUM QUALITY
// Features: Flow Fields • Click Bursts • Gradient Connections • Mouse Effects
// Optimized for Performance & Eye Comfort
// ═══════════════════════════════════════════════════════════════════════════

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CANVAS SETUP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function resizeCanvas() {
    const heroSection = document.querySelector('.hero');
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
}
resizeCanvas();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ADVANCED MOUSE TRACKING SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const mouse = {
    x: null, y: null,
    px: null, py: null,  // Previous position
    vx: 0, vy: 0,        // Velocity
    radius: 180,
    isActive: false,
    clickRipples: []
};

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.px = mouse.x || e.clientX - rect.left;
    mouse.py = mouse.y || e.clientY - rect.top;
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.vx = (mouse.x - mouse.px) * 0.5;
    mouse.vy = (mouse.y - mouse.py) * 0.5;
    mouse.isActive = true;
});

canvas.addEventListener('mouseleave', () => {
    mouse.isActive = false;
});

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouse.clickRipples.push({ x, y, radius: 0, opacity: 1 });
    createBurst(x, y);
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PREMIUM COLOR SYSTEM - Eye-Friendly Pastel Palette
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const colors = {
    primary: [
        [224, 242, 254],  // Ultra soft sky
        [186, 230, 253],  // Soft azure
        [147, 197, 253]   // Gentle blue
    ],
    accent: [
        [165, 180, 252],  // Soft indigo
        [199, 210, 254],  // Pale lavender
        [196, 181, 253]   // Gentle purple
    ],
    highlight: [
        [253, 224, 239],  // Soft pink
        [251, 207, 232],  // Light rose
        [244, 240, 254]   // Pale lavender
    ]
};

function getColor(type = 'primary', index = 0, alpha = 1) {
    const palette = colors[type];
    const color = palette[index % palette.length];
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FLOW FIELD - Perfect Rotating Organic Movement System
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class FlowField {
    constructor() {
        this.resolution = 30;
        this.cols = Math.ceil(canvas.width / this.resolution);
        this.rows = Math.ceil(canvas.height / this.resolution);
        this.field = [];
        this.time = 0;
        this.rotationSpeed = 0.0005; // Smooth rotation speed
        this.generate();
    }
    
    generate() {
        for (let y = 0; y < this.rows; y++) {
            this.field[y] = [];
            for (let x = 0; x < this.cols; x++) {
                this.field[y][x] = 0;
            }
        }
    }
    
    update() {
        this.time += this.rotationSpeed;
        
        // Update field with smooth rotation
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const centerX = this.cols / 2;
                const centerY = this.rows / 2;
                const dx = x - centerX;
                const dy = y - centerY;
                
                // Create perfect circular rotation with vortex effect
                const distance = Math.sqrt(dx * dx + dy * dy);
                const baseAngle = Math.atan2(dy, dx);
                const rotationAngle = this.time + (distance * 0.1);
                
                // Combine circular motion with wave patterns
                const angle = baseAngle + rotationAngle + 
                             Math.sin(distance * 0.3 + this.time * 2) * 0.5;
                
                this.field[y][x] = angle;
            }
        }
    }
    
    lookup(x, y) {
        const col = Math.floor(x / this.resolution);
        const row = Math.floor(y / this.resolution);
        if (this.field[row] && this.field[row][col] !== undefined) {
            return this.field[row][col];
        }
        return 0;
    }
}

const flowField = new FlowField();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ELITE PARTICLE CLASS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class Particle {
    constructor(type = 'ambient') {
        this.type = type;
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        
        if (this.type === 'ambient') {
            this.size = Math.random() * 2 + 1;
            this.baseSize = this.size;
            this.opacity = Math.random() * 0.3 + 0.15;
            this.colorType = 'primary';
            this.colorIndex = Math.floor(Math.random() * 3);
        } else if (this.type === 'accent') {
            this.size = Math.random() * 1.5 + 0.5;
            this.baseSize = this.size;
            this.opacity = Math.random() * 0.4 + 0.2;
            this.colorType = 'accent';
            this.colorIndex = Math.floor(Math.random() * 3);
        }
        
        this.life = 1;
        this.maxLife = 1;
        this.phase = Math.random() * Math.PI * 2;
        this.rotation = 0; // For perfect rotation
        this.rotationSpeed = (Math.random() - 0.5) * 0.02; // Individual rotation speed
    }
    
    draw() {
        const pulse = 1 + Math.sin(this.phase) * 0.15;
        const size = this.size * pulse;
        const alpha = this.opacity * this.life;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Sophisticated radial gradient glow
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 3);
        gradient.addColorStop(0, getColor(this.colorType, this.colorIndex, alpha * 0.6));
        gradient.addColorStop(0.4, getColor(this.colorType, this.colorIndex, alpha * 0.3));
        gradient.addColorStop(1, getColor(this.colorType, this.colorIndex, 0));
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Bright core with rotation effect
        ctx.fillStyle = getColor(this.colorType, this.colorIndex, alpha);
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle rotation indicator (small offset glow)
        ctx.fillStyle = getColor(this.colorType, this.colorIndex, alpha * 0.4);
        ctx.beginPath();
        ctx.arc(size * 0.3, 0, size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
    
    update() {
        // Flow field influence for organic movement
        const angle = flowField.lookup(this.x, this.y);
        this.vx += Math.cos(angle) * 0.05;
        this.vy += Math.sin(angle) * 0.05;
        
        // Advanced mouse interaction - magnetic attraction/repulsion
        if (mouse.isActive && mouse.x !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distSq = dx * dx + dy * dy;
            const radiusSq = mouse.radius * mouse.radius;
            
            if (distSq < radiusSq && distSq > 0) {
                const dist = Math.sqrt(distSq);
                const force = (1 - dist / mouse.radius) * 0.5;
                const angle = Math.atan2(dy, dx);
                
                // Gentle magnetic repulsion
                this.vx -= Math.cos(angle) * force * 0.3;
                this.vy -= Math.sin(angle) * force * 0.3;
                
                // Dynamic size scaling
                const targetSize = this.baseSize * (1 + force * 3);
                this.size += (targetSize - this.size) * 0.15;
                
                // Dynamic opacity
                const targetOpacity = Math.min(0.6, this.opacity + force * 0.3);
                this.opacity += (targetOpacity - this.opacity) * 0.1;
            } else {
                // Smooth return to base state
                this.size += (this.baseSize - this.size) * 0.05;
                const baseOpacity = this.type === 'ambient' ? 0.25 : 0.3;
                this.opacity += (baseOpacity - this.opacity) * 0.03;
            }
        }
        
        // Apply velocity with elegant damping
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;
        
        // Gentle breathing pulse
        this.phase += 0.02;
        
        // Perfect smooth rotation
        this.rotation += this.rotationSpeed;
        
        // Seamless edge wrapping
        if (this.x < -20) this.x = canvas.width + 20;
        if (this.x > canvas.width + 20) this.x = -20;
        if (this.y < -20) this.y = canvas.height + 20;
        if (this.y > canvas.height + 20) this.y = -20;
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BURST PARTICLE SYSTEM - Click Effects
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class BurstParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = Math.random() * 2 + 1;
        this.life = 1;
        this.colorType = 'highlight';
        this.colorIndex = Math.floor(Math.random() * 3);
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.life -= 0.015;
    }
    
    draw() {
        if (this.life <= 0) return;
        
        const alpha = this.life * 0.8;
        
        // Particle core
        ctx.fillStyle = getColor(this.colorType, this.colorIndex, alpha);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Outer glow
        ctx.fillStyle = getColor(this.colorType, this.colorIndex, alpha * 0.3);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

let particles = [];
let burstParticles = [];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PARTICLE INITIALIZATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initParticles() {
    particles = [];
    const count = Math.min(100, Math.floor((canvas.width * canvas.height) / 8000));
    
    // 70% ambient particles
    for (let i = 0; i < count * 0.7; i++) {
        particles.push(new Particle('ambient'));
    }
    
    // 30% accent particles
    for (let i = 0; i < count * 0.3; i++) {
        particles.push(new Particle('accent'));
    }
}

function createBurst(x, y) {
    for (let i = 0; i < 15; i++) {
        burstParticles.push(new BurstParticle(x, y));
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONSTELLATION CONNECTIONS - Gradient Lines
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function drawConnections() {
    const maxDist = 140;
    
    for (let i = 0; i < particles.length; i++) {
        let connections = 0;
        
        for (let j = i + 1; j < particles.length && connections < 2; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < maxDist) {
                const alpha = (1 - dist / maxDist) * 0.15;
                
                // Beautiful gradient connection
                const gradient = ctx.createLinearGradient(
                    particles[i].x, particles[i].y,
                    particles[j].x, particles[j].y
                );
                gradient.addColorStop(0, getColor('primary', 2, alpha));
                gradient.addColorStop(1, getColor('accent', 1, alpha));
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                
                connections++;
            }
        }
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AMBIENT BACKGROUND EFFECTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function drawAmbient() {
    const time = Date.now() * 0.0003;
    
    for (let i = 0; i < 2; i++) {
        const x = canvas.width * (0.3 + i * 0.4);
        const y = canvas.height * 0.5;
        const radius = 250 + Math.sin(time + i * 2) * 30;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        const alpha = 0.015 + Math.sin(time + i) * 0.008;
        gradient.addColorStop(0, getColor('primary', i, alpha));
        gradient.addColorStop(1, getColor('primary', i, 0));
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ADVANCED MOUSE EFFECTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function drawMouseEffects() {
    if (!mouse.isActive || mouse.x === null) return;
    
    // Elegant cursor glow
    const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, mouse.radius
    );
    
    gradient.addColorStop(0, 'rgba(224, 242, 254, 0.12)');
    gradient.addColorStop(0.5, 'rgba(199, 210, 254, 0.06)');
    gradient.addColorStop(1, 'rgba(165, 180, 252, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Click ripple effects
    for (let i = mouse.clickRipples.length - 1; i >= 0; i--) {
        const ripple = mouse.clickRipples[i];
        ripple.radius += 4;
        ripple.opacity -= 0.02;
        
        if (ripple.opacity <= 0) {
            mouse.clickRipples.splice(i, 1);
            continue;
        }
        
        // Outer ripple
        ctx.strokeStyle = getColor('highlight', 1, ripple.opacity * 0.6);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Inner ripple
        ctx.strokeStyle = getColor('highlight', 0, ripple.opacity * 0.3);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius + 10, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PREMIUM ANIMATION LOOP - 60FPS Optimized
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let lastTime = Date.now();

function animate() {
    const now = Date.now();
    const delta = now - lastTime;
    
    // Frame rate limiting for optimal performance
    if (delta > 16) { // ~60fps
        lastTime = now;
        
        // Update flow field for perfect rotation
        flowField.update();
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Render layers in optimized order
        drawAmbient();
        drawMouseEffects();
        drawConnections();
        
        // Update and draw main particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        // Update and draw burst particles
        for (let i = burstParticles.length - 1; i >= 0; i--) {
            burstParticles[i].update();
            burstParticles[i].draw();
            if (burstParticles[i].life <= 0) {
                burstParticles.splice(i, 1);
            }
        }
    }
    
    requestAnimationFrame(animate);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INITIALIZATION & RESPONSIVE HANDLING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
initParticles();
animate();

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        resizeCanvas();
        flowField.generate();
        initParticles();
    }, 300);
});
