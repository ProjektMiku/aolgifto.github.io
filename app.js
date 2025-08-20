class BirthdayCard {
    constructor() {
        this.currentPage = 'home';
        this.isPlaying = false;
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.setupCursor();
        this.setupMusicControl();
        this.setupHoverEffects();
        this.createParticles();
        this.initializePage();
    }

    setupElements() {
        // Get page elements
        this.homepage = document.getElementById('homepage');
        this.poempage = document.getElementById('poempage');
        
        // Get navigation buttons
        this.viewPoemBtn = document.getElementById('viewPoemBtn');
        this.backHomeBtn = document.getElementById('backHomeBtn');
        
        // Get music elements
        this.musicControl = document.getElementById('musicControl');
        this.backgroundMusic = document.getElementById('backgroundMusic');
        this.musicIcon = this.musicControl.querySelector('.music-icon');
        this.musicText = this.musicControl.querySelector('.music-text');

        console.log('Elements setup:', {
            homepage: !!this.homepage,
            poempage: !!this.poempage,
            viewPoemBtn: !!this.viewPoemBtn,
            backHomeBtn: !!this.backHomeBtn,
            musicControl: !!this.musicControl
        });
    }

    setupEventListeners() {
        // Clear any existing listeners and add new ones
        if (this.viewPoemBtn) {
            // Remove any existing listeners
            this.viewPoemBtn.replaceWith(this.viewPoemBtn.cloneNode(true));
            this.viewPoemBtn = document.getElementById('viewPoemBtn');
            
            this.viewPoemBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('View poem button clicked');
                this.navigateToPoem();
            });
        }
        
        if (this.backHomeBtn) {
            this.backHomeBtn.replaceWith(this.backHomeBtn.cloneNode(true));
            this.backHomeBtn = document.getElementById('backHomeBtn');
            
            this.backHomeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Back home button clicked');
                this.navigateToHome();
            });
        }
        
        // Music control - separate from navigation
        if (this.musicControl) {
            this.musicControl.replaceWith(this.musicControl.cloneNode(true));
            this.musicControl = document.getElementById('musicControl');
            this.musicIcon = this.musicControl.querySelector('.music-icon');
            this.musicText = this.musicControl.querySelector('.music-text');
            
            this.musicControl.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Music control clicked');
                this.toggleMusic();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && this.currentPage === 'home') {
                this.navigateToPoem();
            } else if (e.key === 'ArrowLeft' && this.currentPage === 'poem') {
                this.navigateToHome();
            } else if (e.key === ' ') {
                e.preventDefault();
                this.toggleMusic();
            } else if (e.key === 'Escape' && this.currentPage === 'poem') {
                this.navigateToHome();
            }
        });
    }

    initializePage() {
        // Ensure homepage is active and poem page is hidden
        if (this.homepage) {
            this.homepage.classList.add('active');
            this.homepage.style.opacity = '1';
            this.homepage.style.visibility = 'visible';
            this.homepage.style.transform = 'translateX(0)';
        }
        
        if (this.poempage) {
            this.poempage.classList.remove('active');
            this.poempage.style.opacity = '0';
            this.poempage.style.visibility = 'hidden';
            this.poempage.style.transform = 'translateX(100px)';
        }
        
        this.currentPage = 'home';
        console.log('Page initialized - current page:', this.currentPage);
    }

    navigateToPoem() {
        console.log('Navigating to poem page');
        this.currentPage = 'poem';
        
        // Hide homepage
        if (this.homepage) {
            this.homepage.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            this.homepage.style.opacity = '0';
            this.homepage.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                this.homepage.classList.remove('active');
                this.homepage.style.visibility = 'hidden';
            }, 600);
        }
        
        // Show poem page
        if (this.poempage) {
            setTimeout(() => {
                this.poempage.style.visibility = 'visible';
                this.poempage.classList.add('active');
                this.poempage.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                this.poempage.style.transform = 'translateX(0)';
                this.poempage.style.opacity = '1';
                
                // Add entrance effect to container
                const container = this.poempage.querySelector('.glass-container');
                if (container) {
                    container.style.transform = 'translateY(30px) scale(0.9)';
                    setTimeout(() => {
                        container.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        container.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                }
            }, 300);
        }
        
        this.createRippleEffect(this.viewPoemBtn);
    }

    navigateToHome() {
        console.log('Navigating to home page');
        this.currentPage = 'home';
        
        // Hide poem page
        if (this.poempage) {
            this.poempage.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            this.poempage.style.opacity = '0';
            this.poempage.style.transform = 'translateX(50px)';
            
            setTimeout(() => {
                this.poempage.classList.remove('active');
                this.poempage.style.visibility = 'hidden';
            }, 600);
        }
        
        // Show homepage
        if (this.homepage) {
            setTimeout(() => {
                this.homepage.style.visibility = 'visible';
                this.homepage.classList.add('active');
                this.homepage.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                this.homepage.style.transform = 'translateX(0)';
                this.homepage.style.opacity = '1';
                
                // Add entrance effect to container
                const container = this.homepage.querySelector('.glass-container');
                if (container) {
                    container.style.transform = 'translateY(30px) scale(0.9)';
                    setTimeout(() => {
                        container.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        container.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                }
            }, 300);
        }
        
        this.createRippleEffect(this.backHomeBtn);
    }

    setupMusicControl() {
        if (this.backgroundMusic) {
            this.backgroundMusic.volume = 0.3;
            this.backgroundMusic.loop = true;
        }
        this.updateMusicButton();
    }

    toggleMusic() {
        console.log('Toggling music, current state:', this.isPlaying);
        
        // If YouTube player is ready
        if (window.youTubePlayerReady) {
            try {
                if (this.isPlaying) {
                    window.youTubePlayer.pauseVideo();
                    this.isPlaying = false;
                } else {
                    window.youTubePlayer.playVideo();
                    this.isPlaying = true;
                }
                this.updateMusicButton();
                return;
            } catch (e) {
                console.error('Error controlling YouTube player:', e);
            }
        }
        
        // Fallback to audio element if YouTube player fails
        if (this.backgroundMusic) {
            if (this.isPlaying) {
                this.backgroundMusic.pause();
                this.isPlaying = false;
            } else {
                const playPromise = this.backgroundMusic.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        this.isPlaying = true;
                        this.updateMusicButton();
                    }).catch((e) => {
                        console.error('Error playing audio:', e);
                        this.showMusicMessage('Click to play music');
                    });
                }
            }
            this.updateMusicButton();
        }
        
        this.createRippleEffect(this.musicControl);
    }

    updateMusicButton() {
        if (!this.musicIcon || !this.musicText) return;
        
        if (this.isPlaying) {
            this.musicIcon.textContent = '🎶';
            this.musicText.textContent = 'Playing';
            this.musicControl.classList.add('playing');
        } else {
            this.musicIcon.textContent = '🎵';
            this.musicText.textContent = 'Music';
            this.musicControl.classList.remove('playing');
        }
    }

    showMusicMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 80px;
            right: 30px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1001;
            backdrop-filter: blur(10px);
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        `;
        message.textContent = 'Click again to play music';
        document.body.appendChild(message);
        
        // Animate in
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, 10);
        
        // Animate out and remove
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (message.parentNode) {
                    message.remove();
                }
            }, 300);
        }, 2700);
    }

    setupCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'dynamic-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(99,102,241,0.6) 50%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
            });
        });

        // Enhanced cursor for interactive elements
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('.glass-button, .music-control, .sticker')) {
                cursor.style.transform += ' scale(1.5)';
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.matches('.glass-button, .music-control, .sticker')) {
                cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            }
        });
    }

    setupHoverEffects() {
        // Glass container effects
        document.querySelectorAll('.glass-container').forEach(container => {
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                const rotateX = (y - 0.5) * 5;
                const rotateY = (x - 0.5) * -5;
                
                container.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(10px)
                `;
            });
            
            container.addEventListener('mouseleave', () => {
                container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });

        // Sticker effects
        document.querySelectorAll('.sticker').forEach(sticker => {
            sticker.addEventListener('mouseenter', () => {
                sticker.style.transform = 'scale(1.2) rotate(5deg)';
                sticker.style.opacity = '1';
                sticker.style.filter = 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))';
            });
            
            sticker.addEventListener('mouseleave', () => {
                sticker.style.transform = 'scale(1) rotate(0deg)';
                sticker.style.opacity = '0.7';
                sticker.style.filter = 'none';
            });
        });
    }

    createRippleEffect(element) {
        if (!element) return;
        
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            width: ${size}px;
            height: ${size}px;
            left: ${rect.width / 2 - size / 2}px;
            top: ${rect.height / 2 - size / 2}px;
            pointer-events: none;
            animation: ripple-animation 0.6s linear;
        `;
        
        // Add ripple styles
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }

    createParticles() {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10;
        `;
        document.body.appendChild(container);

        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                animation: float-particle ${Math.random() * 15 + 20}s infinite linear;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 20}s;
            `;
            container.appendChild(particle);
        }

        if (!document.getElementById('particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes float-particle {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing birthday card...');
    
    // Fade in effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Initialize the app
        window.birthdayCard = new BirthdayCard();
        console.log('Birthday card initialized');
        
    }, 200);
});