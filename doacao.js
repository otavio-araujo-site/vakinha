// Copiar chave PIX
const copyPixBtn = document.getElementById('copy-pix-btn');
const pixKey = '5914820@vakinha.com.br';

if (copyPixBtn) {
    copyPixBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(pixKey);
            
            // Feedback visual
            const originalHTML = copyPixBtn.innerHTML;
            copyPixBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            copyPixBtn.classList.add('copied');
            
            // Mostra notificação
            showSuccess('Chave PIX copiada!', 2000);
            
            setTimeout(() => {
                copyPixBtn.innerHTML = originalHTML;
                copyPixBtn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            // Fallback para navegadores antigos
            const textArea = document.createElement('textarea');
            textArea.value = pixKey;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                showSuccess('Chave PIX copiada!', 2000);
            } catch (err) {
                showError('Não foi possível copiar. A chave é: ' + pixKey);
            }
            
            document.body.removeChild(textArea);
        }
    });
}

// Copiar número do WhatsApp
const copyWhatsAppBtn = document.getElementById('copy-whatsapp-btn');
const whatsappNumber = '11985734773';

if (copyWhatsAppBtn) {
    copyWhatsAppBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(whatsappNumber);
            
            // Feedback visual
            const originalHTML = copyWhatsAppBtn.innerHTML;
            copyWhatsAppBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            copyWhatsAppBtn.classList.add('copied');
            
            // Mostra notificação
            showSuccess('Número do WhatsApp copiado!', 2000);
            
            setTimeout(() => {
                copyWhatsAppBtn.innerHTML = originalHTML;
                copyWhatsAppBtn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            // Fallback para navegadores antigos
            const textArea = document.createElement('textarea');
            textArea.value = whatsappNumber;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                showSuccess('Número do WhatsApp copiado!', 2000);
            } catch (err) {
                showError('Não foi possível copiar. O número é: ' + whatsappNumber);
            }
            
            document.body.removeChild(textArea);
        }
    });
}

// Função para mostrar mensagem de sucesso
function showSuccess(message, duration = 3000) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #34C759;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        font-size: 14px;
        font-weight: 600;
        animation: slideDown 0.3s ease-out;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            if (successDiv.parentNode) {
                document.body.removeChild(successDiv);
            }
        }, 300);
    }, duration);
}

// Função para mostrar erro
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #FF3B30;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        font-size: 14px;
        font-weight: 600;
        animation: slideDown 0.3s ease-out;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            if (errorDiv.parentNode) {
                document.body.removeChild(errorDiv);
            }
        }, 300);
    }, 3000);
}

// Modal de visualização de cartazes e redirecionamento
const posterCards = document.querySelectorAll('.poster-card');
const posterImages = document.querySelectorAll('.poster-image-wrapper img');

posterCards.forEach((card, index) => {
    // Clique na imagem/cartaz
    const imageWrapper = card.querySelector('.poster-image-wrapper');
    if (imageWrapper) {
        imageWrapper.addEventListener('click', () => {
            const link = card.getAttribute('data-link');
            
            // Se houver link, redireciona
            if (link && link.trim() !== '') {
                window.open(link, '_blank');
            } else {
                // Caso contrário, abre modal de visualização
                const img = posterImages[index];
                showPosterModal(img.src, img.alt);
            }
        });
    }
});

// Botões do Instagram
const instagramButtons = document.querySelectorAll('.instagram-btn');

instagramButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Previne que o clique no botão dispare o clique no card
        
        const instagramLink = button.getAttribute('data-instagram');
        
        // Se houver link do Instagram, redireciona
        if (instagramLink && instagramLink.trim() !== '') {
            window.open(instagramLink, '_blank');
        } else {
            // Caso contrário, mostra mensagem
            showError('Link do Instagram ainda não configurado.');
        }
    });
});

// Botões da Rifa
const rifaButtons = document.querySelectorAll('.rifa-btn');

rifaButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Previne que o clique no botão dispare o clique no card
        
        const rifaLink = button.getAttribute('data-rifa');
        
        // Se houver link da rifa, redireciona
        if (rifaLink && rifaLink.trim() !== '') {
            window.open(rifaLink, '_blank');
        } else {
            // Caso contrário, mostra mensagem
            showError('Link da rifa ainda não configurado.');
        }
    });
});

function showPosterModal(imageSrc, imageAlt) {
    // Cria modal de visualização
    const modal = document.createElement('div');
    modal.className = 'poster-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.3s ease-out;
        cursor: pointer;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        max-width: 90%;
        max-height: 90vh;
        position: relative;
        animation: scaleIn 0.3s ease-out;
    `;

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
        position: absolute;
        top: -50px;
        right: 0;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        color: white;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    `;

    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
        closeBtn.style.transform = 'scale(1.1)';
    });

    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        closeBtn.style.transform = 'scale(1)';
    });

    modalContent.appendChild(img);
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
            document.body.style.overflow = '';
        }, 300);
    };

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Adiciona animações CSS para o modal de cartazes
const posterModalStyle = document.createElement('style');
posterModalStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(posterModalStyle);
