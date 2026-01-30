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
// GALAXY COLOR SYSTEM - Deep Space Nebula Palette
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const colors = {
    nebula: [
        [138, 43, 226],   // Deep purple (nebula core)
        [75, 0, 130],     // Indigo (space)
        [147, 51, 234]    // Violet (outer nebula)
    ],
    stars: [
        [255, 255, 255],  // White stars
        [200, 220, 255],  // Blue-white stars
        [255, 240, 200]   // Yellow-white stars
    ],
    cosmic: [
        [255, 105, 180],  // Hot pink (cosmic dust)
        [0, 191, 255],    // Deep sky blue
        [186, 85, 211]    // Medium orchid
    ],
    core: [
        [255, 215, 0],    // Gold (galactic center)
        [255, 165, 0],    // Orange
        [255, 140, 0]     // Dark orange
    ]
};

function getColor(type = 'nebula', index = 0, alpha = 1) {
    const palette = colors[type];
    const color = palette[index % palette.length];
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GALAXY SPIRAL FLOW FIELD - Spiral Arms Pattern
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class FlowField {
    constructor() {
        this.resolution = 30;
        this.cols = Math.ceil(canvas.width / this.resolution);
        this.rows = Math.ceil(canvas.height / this.resolution);
        this.field = [];
        this.time = 0;
        this.rotationSpeed = 0.0003; // Slower for galaxy feel
        this.spiralArms = 3; // Number of spiral arms
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
        
        const centerX = this.cols / 2;
        const centerY = this.rows / 2;
        
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const dx = x - centerX;
                const dy = y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const baseAngle = Math.atan2(dy, dx);
                
                // Create galaxy spiral arms
                const spiralTightness = 0.3;
                const spiralAngle = baseAngle - (distance * spiralTightness) + this.time;
                
                // Add spiral arm density variation
                const armInfluence = Math.sin(baseAngle * this.spiralArms - distance * 0.1 + this.time * 3) * 0.3;
                
                // Orbital rotation speed decreases with distance (like real galaxy)
                const orbitalSpeed = 1 / (1 + distance * 0.05);
                
                const angle = spiralAngle + armInfluence + (this.time * orbitalSpeed);
                
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
        // Galaxy center point
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Orbital distance from center
        const orbitRadius = (Math.random() * 0.8 + 0.2) * Math.min(canvas.width, canvas.height) / 2;
        const angle = Math.random() * Math.PI * 2;
        
        this.x = centerX + Math.cos(angle) * orbitRadius;
        this.y = centerY + Math.sin(angle) * orbitRadius;
        this.orbitRadius = orbitRadius;
        this.orbitAngle = angle;
        this.orbitSpeed = 0.0005 / (1 + orbitRadius * 0.001); // Slower at edges
        
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        
        if (this.type === 'ambient') {
            this.size = Math.random() * 1.5 + 0.5;
            this.baseSize = this.size;
            this.opacity = Math.random() * 0.4 + 0.2;
            this.colorType = 'nebula';
            this.colorIndex = Math.floor(Math.random() * 3);
        } else if (this.type === 'accent') {
            this.size = Math.random() * 2 + 1;
            this.baseSize = this.size;
            this.opacity = Math.random() * 0.6 + 0.3;
            this.colorType = 'cosmic';
            this.colorIndex = Math.floor(Math.random() * 3);
        } else if (this.type === 'star') {
            this.size = Math.random() * 1 + 0.3;
            this.baseSize = this.size;
            this.opacity = Math.random() * 0.8 + 0.5;
            this.colorType = 'stars';
            this.colorIndex = Math.floor(Math.random() * 3);
        }
        
        this.life = 1;
        this.maxLife = 1;
        this.phase = Math.random() * Math.PI * 2;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        this.twinkleSpeed = Math.random() * 0.05 + 0.02;
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
        // Galaxy center
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Orbital motion around galactic center
        this.orbitAngle += this.orbitSpeed;
        const targetX = centerX + Math.cos(this.orbitAngle) * this.orbitRadius;
        const targetY = centerY + Math.sin(this.orbitAngle) * this.orbitRadius;
        
        // Smooth movement towards orbital position
        this.x += (targetX - this.x) * 0.05;
        this.y += (targetY - this.y) * 0.05;
        
        // Flow field influence for spiral arms
        const angle = flowField.lookup(this.x, this.y);
        this.vx += Math.cos(angle) * 0.03;
        this.vy += Math.sin(angle) * 0.03;
        
        // Apply velocity
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.92;
        this.vy *= 0.92;
        
        // Mouse interaction - gravitational pull
        if (mouse.isActive && mouse.x !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distSq = dx * dx + dy * dy;
            const radiusSq = mouse.radius * mouse.radius;
            
            if (distSq < radiusSq && distSq > 0) {
                const dist = Math.sqrt(distSq);
                const force = (1 - dist / mouse.radius) * 0.3;
                const angle = Math.atan2(dy, dx);
                
                // Gentle pull towards mouse
                this.vx += Math.cos(angle) * force * 0.2;
                this.vy += Math.sin(angle) * force * 0.2;
                
                // Dynamic sizing
                const targetSize = this.baseSize * (1 + force * 2);
                this.size += (targetSize - this.size) * 0.15;
                
                const targetOpacity = Math.min(0.9, this.opacity + force * 0.4);
                this.opacity += (targetOpacity - this.opacity) * 0.1;
            } else {
                this.size += (this.baseSize - this.size) * 0.05;
                const baseOpacity = this.type === 'star' ? 0.7 : (this.type === 'ambient' ? 0.3 : 0.5);
                this.opacity += (baseOpacity - this.opacity) * 0.03;
            }
        }
        
        // Twinkling and rotation
        this.phase += this.type === 'star' ? this.twinkleSpeed : 0.02;
        this.rotation += this.rotationSpeed;
        
        // Boundary containment
        const margin = 5;
        if (this.x < margin || this.x > canvas.width - margin) {
            this.orbitAngle = Math.PI - this.orbitAngle;
        }
        if (this.y < margin || this.y > canvas.height - margin) {
            this.orbitAngle = -this.orbitAngle;
        }
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
        const speed = Math.random() * 4 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = Math.random() * 2.5 + 1;
        this.life = 1;
        this.colorType = 'cosmic';
        this.colorIndex = Math.floor(Math.random() * 3);
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.96;
        this.vy *= 0.96;
        this.life -= 0.012;
        this.rotation += this.rotationSpeed;
        
        // Keep burst particles inside canvas
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.life = 0;
        }
    }
    
    draw() {
        if (this.life <= 0) return;
        
        const alpha = this.life * 0.9;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Cosmic dust glow
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 3);
        gradient.addColorStop(0, getColor(this.colorType, this.colorIndex, alpha));
        gradient.addColorStop(0.5, getColor(this.colorType, this.colorIndex, alpha * 0.5));
        gradient.addColorStop(1, getColor(this.colorType, this.colorIndex, 0));
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Particle core
        ctx.fillStyle = getColor(this.colorType, this.colorIndex, alpha);
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

let particles = [];
let burstParticles = [];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GALAXY PARTICLE INITIALIZATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initParticles() {
    particles = [];
    const count = Math.min(150, Math.floor((canvas.width * canvas.height) / 6000));
    
    // 50% nebula particles
    for (let i = 0; i < count * 0.5; i++) {
        particles.push(new Particle('ambient'));
    }
    
    // 30% cosmic dust particles
    for (let i = 0; i < count * 0.3; i++) {
        particles.push(new Particle('accent'));
    }
    
    // 20% stars
    for (let i = 0; i < count * 0.2; i++) {
        particles.push(new Particle('star'));
    }
}

function createBurst(x, y) {
    for (let i = 0; i < 20; i++) {
        burstParticles.push(new BurstParticle(x, y));
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONSTELLATION CONNECTIONS - Gradient Lines
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function drawConnections() {
    const maxDist = 160;
    
    for (let i = 0; i < particles.length; i++) {
        if (particles[i].type === 'star') continue; // Stars don't connect
        
        let connections = 0;
        
        for (let j = i + 1; j < particles.length && connections < 3; j++) {
            if (particles[j].type === 'star') continue;
            
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < maxDist) {
                const alpha = (1 - dist / maxDist) * 0.2;
                
                // Nebula connection gradient
                const gradient = ctx.createLinearGradient(
                    particles[i].x, particles[i].y,
                    particles[j].x, particles[j].y
                );
                gradient.addColorStop(0, getColor('nebula', 2, alpha));
                gradient.addColorStop(0.5, getColor('cosmic', 1, alpha));
                gradient.addColorStop(1, getColor('nebula', 0, alpha));
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1.5;
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
    const time = Date.now() * 0.0002;
    
    // Galactic core - bright center
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const coreRadius = 80 + Math.sin(time) * 10;
    
    const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
    const coreAlpha = 0.08 + Math.sin(time * 2) * 0.03;
    coreGradient.addColorStop(0, getColor('core', 0, coreAlpha));
    coreGradient.addColorStop(0.4, getColor('core', 1, coreAlpha * 0.6));
    coreGradient.addColorStop(1, getColor('core', 2, 0));
    
    ctx.fillStyle = coreGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Deep space background nebula clouds
    for (let i = 0; i < 3; i++) {
        const angle = (time + i * 2) * 0.3;
        const distance = 150 + i * 80;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const radius = 200 + Math.sin(time + i) * 40;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        const alpha = 0.03 + Math.sin(time + i) * 0.015;
        gradient.addColorStop(0, getColor('nebula', i, alpha));
        gradient.addColorStop(0.6, getColor('cosmic', i, alpha * 0.5));
        gradient.addColorStop(1, getColor('nebula', i, 0));
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ADVANCED MOUSE EFFECTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function drawMouseEffects() {
    if (!mouse.isActive || mouse.x === null) return;
    
    // Gravitational field effect
    const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, mouse.radius
    );
    
    gradient.addColorStop(0, 'rgba(255, 215, 0, 0.15)');
    gradient.addColorStop(0.4, 'rgba(186, 85, 211, 0.08)');
    gradient.addColorStop(1, 'rgba(75, 0, 130, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Click ripple supernova effects
    for (let i = mouse.clickRipples.length - 1; i >= 0; i--) {
        const ripple = mouse.clickRipples[i];
        ripple.radius += 5;
        ripple.opacity -= 0.018;
        
        if (ripple.opacity <= 0) {
            mouse.clickRipples.splice(i, 1);
            continue;
        }
        
        // Outer shockwave
        ctx.strokeStyle = getColor('cosmic', 0, ripple.opacity * 0.8);
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Middle wave
        ctx.strokeStyle = getColor('cosmic', 1, ripple.opacity * 0.6);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius + 15, 0, Math.PI * 2);
        ctx.stroke();
        
        // Inner wave
        ctx.strokeStyle = getColor('cosmic', 2, ripple.opacity * 0.4);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius + 30, 0, Math.PI * 2);
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

// Handle window resize with debouncing
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        resizeCanvas();
        flowField.cols = Math.ceil(canvas.width / flowField.resolution);
        flowField.rows = Math.ceil(canvas.height / flowField.resolution);
        flowField.generate();
        initParticles();
    }, 300);
});

// Ensure canvas matches section on load
window.addEventListener('load', () => {
    resizeCanvas();
    flowField.cols = Math.ceil(canvas.width / flowField.resolution);
    flowField.rows = Math.ceil(canvas.height / flowField.resolution);
    flowField.generate();
});
