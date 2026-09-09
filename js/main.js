// ==================== LOADING ====================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ==================== NAVBAR SCROLL ====================
var lastScroll = 0;
window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    var currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('nav-hidden');
    } else {
        navbar.classList.remove('nav-hidden');
    }
    lastScroll = currentScroll;
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            var offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ==================== HERO TYPING EFFECT ====================
function typeWriter(element, text, speed) {
    var i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

var heroTagline = document.querySelector('.hero-tagline');
if (heroTagline) {
    var texts = ['CREATIVE PROBLEM SOLVER', 'WEB DEVELOPER', 'AI ENTHUSIAST', 'FRONTEND DEVELOPER'];
    var textIndex = 0;
    function cycleTexts() {
        typeWriter(heroTagline, texts[textIndex], 100);
        textIndex = (textIndex + 1) % texts.length;
    }
    cycleTexts();
    setInterval(cycleTexts, 4000);
}

// ==================== COUNTER ANIMATION ====================
function animateCounters() {
    var counters = document.querySelectorAll('.stat-num');
    counters.forEach(function(counter) {
        if (counter.classList.contains('counted')) return;
        var rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            counter.classList.add('counted');
            var text = counter.textContent;
            var match = text.match(/(\d+)/);
            if (match) {
                var target = parseInt(match[0]);
                var current = 0;
                var increment = target / 50;
                var prefix = text.substring(0, text.indexOf(match[0]));
                var suffix = text.substring(text.indexOf(match[0]) + match[0].length);
                var timer = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        counter.innerHTML = prefix + target + suffix;
                        clearInterval(timer);
                    } else {
                        counter.innerHTML = prefix + Math.floor(current) + suffix;
                    }
                }, 30);
            }
        }
    });
}

window.addEventListener('scroll', animateCounters);

// ==================== FAQ ACCORDION ====================
document.querySelectorAll('.faq-question').forEach(function(question) {
    question.addEventListener('click', function() {
        var faqItem = this.parentElement;
        var answer = faqItem.querySelector('.faq-answer');
        var isActive = faqItem.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(function(item) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = '0';
        });
        
        if (!isActive) {
            faqItem.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// ==================== CONTACT FORM → INSTAGRAM DM ====================
var contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var nameInput = this.querySelector('.inline-input[type="text"]');
        var emailInput = this.querySelector('.inline-input[type="email"]');
        var projectInput = this.querySelectorAll('.inline-input[type="text"]')[1];
        var messageInput = this.querySelector('.message-input');
        var btn = this.querySelector('.submit-btn');
        
        var name = nameInput ? nameInput.value : '';
        var email = emailInput ? emailInput.value : '';
        var project = projectInput ? projectInput.value : '';
        var message = messageInput ? messageInput.value : '';
        
        var fullMessage = 'Hi Fatima! I found you through your portfolio.\n\n';
        if (name) fullMessage += 'Name: ' + name + '\n';
        if (email) fullMessage += 'Email: ' + email + '\n';
        if (project) fullMessage += 'Project: ' + project + '\n';
        if (message) fullMessage += 'Message: ' + message + '\n';
        
        btn.textContent = 'SENDING...';
        btn.disabled = true;
        
        navigator.clipboard.writeText(fullMessage).then(function() {
            var toast = document.createElement('div');
            toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#111B2E;color:#F4F0E6;border:1px solid rgba(201,162,39,0.4);border-radius:10px;padding:2rem 3rem;z-index:100000;text-align:center;font-family:Inter,sans-serif;box-shadow:0 20px 60px rgba(0,0,0,0.5);max-width:400px;';
            toast.innerHTML = '<div style="font-size:2rem;margin-bottom:1rem;">&#10003;</div><div style="font-size:1rem;font-weight:600;color:#F4F0E6;margin-bottom:0.5rem;">Message Copied!</div><div style="font-size:0.85rem;color:#9AA6B8;line-height:1.5;">Opening Instagram DM...<br>Paste your message and send.</div>';
            document.body.appendChild(toast);
            
            setTimeout(function() {
                var link = document.createElement('a');
                link.href = 'https://www.instagram.com/direct/new/?username=_f_a_t_i_ma_';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                btn.textContent = 'SENT!';
                btn.style.background = '#28a745';
            }, 800);
            
            setTimeout(function() {
                toast.remove();
                btn.textContent = 'TRANSMIT BRIEFING';
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        }).catch(function() {
            var link = document.createElement('a');
            link.href = 'https://www.instagram.com/direct/new/?username=_f_a_t_i_ma_';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            btn.textContent = 'OPENING INSTAGRAM...';
            setTimeout(function() {
                btn.textContent = 'TRANSMIT BRIEFING';
                btn.disabled = false;
                contactForm.reset();
            }, 2000);
        });
    });
}

// ==================== INLINE INPUT FOCUS ====================
document.querySelectorAll('.inline-input').forEach(function(input) {
    input.addEventListener('focus', function() {
        this.style.borderBottomColor = '#C9A227';
    });
    input.addEventListener('blur', function() {
        this.style.borderBottomColor = 'rgba(244, 240, 230, 0.08)';
    });
});

// ==================== SCROLL PROGRESS BAR ====================
function updateProgressBar() {
    var scrollTop = window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = (scrollTop / docHeight) * 100;
    var progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

var progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);
window.addEventListener('scroll', updateProgressBar);

// ==================== HERO FADE-IN ON LOAD ====================
function heroFadeIn() {
    var heroLabel = document.querySelector('.hero-label');
    var nameMain = document.querySelector('.name-main');
    var nameAccent = document.querySelector('.name-accent');
    var heroTagline = document.querySelector('.hero-tagline');
    var heroDesc = document.querySelector('.hero-desc');
    var heroBio = document.querySelector('.hero-bio');
    var heroImage = document.querySelector('.hero-image-wrapper');
    
    var elements = [heroLabel, nameMain, nameAccent, heroTagline, heroDesc, heroBio, heroImage];
    
    elements.forEach(function(el, index) {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(function() {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 200 + (index * 150));
        }
    });
}

window.addEventListener('load', function() {
    setTimeout(heroFadeIn, 300);
});

// ==================== LIVE BACKGROUND — NAVY CONSTELLATION ====================
function createLiveBackground() {
    var canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
    document.body.appendChild(canvas);
    
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 35;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.25 + 0.05;
    }
    
    Particle.prototype.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    };
    
    Particle.prototype.draw = function() {
        ctx.fillStyle = 'rgba(201, 162, 39, ' + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    };
    
    for (var i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function connectDots() {
        for (var a = 0; a < particles.length; a++) {
            for (var b = a + 1; b < particles.length; b++) {
                var dx = particles[a].x - particles[b].x;
                var dy = particles[a].y - particles[b].y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 160) {
                    var lineOpacity = (1 - dist / 160) * 0.08;
                    ctx.strokeStyle = 'rgba(201, 162, 39, ' + lineOpacity + ')';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function(p) {
            p.update();
            p.draw();
        });
        connectDots();
        requestAnimationFrame(animate);
    }
    
    animate();
}

window.addEventListener('load', createLiveBackground);

// ==================== INLINE STYLES ====================
var styleSheet = document.createElement('style');
styleSheet.textContent = '\n    .scroll-progress { position: fixed; top: 0; left: 0; height: 2px; background: linear-gradient(90deg, #C9A227, #8F741F); z-index: 10000; }\n    .navbar.nav-hidden { transform: translateY(-100%); }\n    .navbar.scrolled { padding: 0.5rem 0; box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3); }\n    .faq-answer { overflow: hidden; }\n    .faq-item.active .faq-question i { transform: rotate(45deg); }\n';
document.head.appendChild(styleSheet);
