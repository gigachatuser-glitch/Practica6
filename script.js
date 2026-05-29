document.addEventListener('DOMContentLoaded', function() {
    
    const cards = document.querySelectorAll('.info-card, .form-card, .info-block, .gallery-item, .welcome-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    const form = document.getElementById('contactForm');
    if (form) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const consentCheckbox = document.getElementById('consent');
        const submitBtn = document.querySelector('.submit-btn');
        
        function validateForm() {
            let isValid = true;
            
            if (nameInput && nameInput.value.trim().length < 2) {
                nameInput.style.borderColor = '#ef4444';
                isValid = false;
            } else if (nameInput && nameInput.value !== '') {
                nameInput.style.borderColor = '#10b981';
            } else if (nameInput) {
                nameInput.style.borderColor = '#e2e8f0';
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && emailInput.value !== '' && !emailRegex.test(emailInput.value)) {
                emailInput.style.borderColor = '#ef4444';
                isValid = false;
            } else if (emailInput && emailInput.value !== '') {
                emailInput.style.borderColor = '#10b981';
            } else if (emailInput) {
                emailInput.style.borderColor = '#e2e8f0';
            }
            
            if (messageInput && messageInput.value.trim().length < 10 && messageInput.value !== '') {
                messageInput.style.borderColor = '#ef4444';
                isValid = false;
            } else if (messageInput && messageInput.value.trim().length >= 10) {
                messageInput.style.borderColor = '#10b981';
            } else if (messageInput) {
                messageInput.style.borderColor = '#e2e8f0';
            }
            
            if (consentCheckbox && !consentCheckbox.checked) {
                consentCheckbox.style.outline = '2px solid #ef4444';
                isValid = false;
            } else if (consentCheckbox) {
                consentCheckbox.style.outline = 'none';
            }
            
            if (submitBtn) {
                submitBtn.disabled = !isValid;
                submitBtn.style.opacity = isValid ? '1' : '0.6';
                submitBtn.style.cursor = isValid ? 'pointer' : 'not-allowed';
            }
            
            return isValid;
        }
        
        if (nameInput) nameInput.addEventListener('input', validateForm);
        if (emailInput) emailInput.addEventListener('input', validateForm);
        if (messageInput) messageInput.addEventListener('input', validateForm);
        if (consentCheckbox) consentCheckbox.addEventListener('change', validateForm);
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';
            submitBtn.style.cursor = 'not-allowed';
        }
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const statusDiv = document.getElementById('formStatus');
                if (statusDiv) {
                    statusDiv.innerHTML = 'Спасибо! Ваше сообщение отправлено.';
                    statusDiv.style.color = '#2e7d32';
                    statusDiv.style.padding = '12px';
                    statusDiv.style.marginTop = '15px';
                    statusDiv.style.borderRadius = '8px';
                    statusDiv.style.backgroundColor = '#e8f5e9';
                    statusDiv.style.border = '1px solid #4caf50';
                }
                
                form.reset();
                
                if (nameInput) nameInput.style.borderColor = '#e2e8f0';
                if (emailInput) emailInput.style.borderColor = '#e2e8f0';
                if (messageInput) messageInput.style.borderColor = '#e2e8f0';
                if (consentCheckbox) consentCheckbox.style.outline = 'none';
                
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.style.opacity = '0.6';
                    submitBtn.style.cursor = 'not-allowed';
                }
                
                setTimeout(() => {
                    if (statusDiv) {
                        statusDiv.style.opacity = '0';
                        setTimeout(() => {
                            statusDiv.innerHTML = '';
                            statusDiv.style.opacity = '1';
                        }, 300);
                    }
                }, 4000);
            }
        });
    }
    
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (answer && item !== faqItems[0]) {
            answer.style.display = 'none';
        }
        
        if (question) {
            question.addEventListener('click', function() {
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer && otherAnswer !== answer) {
                        otherAnswer.style.display = 'none';
                    }
                });
                
                if (answer) {
                    if (answer.style.display === 'none' || answer.style.display === '') {
                        answer.style.display = 'block';
                    } else {
                        answer.style.display = 'none';
                    }
                }
            });
        }
    });
    
    const emailLink = document.querySelector('.email-link');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.textContent;
            
            navigator.clipboard.writeText(email).then(() => {
                const notification = document.createElement('div');
                notification.textContent = 'Email скопирован!';
                notification.style.position = 'fixed';
                notification.style.bottom = '20px';
                notification.style.right = '20px';
                notification.style.backgroundColor = '#2563eb';
                notification.style.color = 'white';
                notification.style.padding = '12px 20px';
                notification.style.borderRadius = '12px';
                notification.style.zIndex = '9999';
                notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.opacity = '0';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            });
        });
    }
    
    const socialBtns = document.querySelectorAll('.social-icon');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const socialName = this.textContent;
            alert('Демо-режим: переход в ' + socialName);
        });
    });
    
    const quoteBlock = document.querySelector('.quote-block');
    if (quoteBlock) {
        const originalText = quoteBlock.textContent;
        quoteBlock.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                quoteBlock.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        
        quoteBlock.addEventListener('mouseenter', function() {
            if (quoteBlock.textContent === '') {
                typeWriter();
            }
        });
        
        setTimeout(() => {
            if (quoteBlock.textContent === '') {
                quoteBlock.textContent = originalText;
            }
        }, 2000);
    }
});
