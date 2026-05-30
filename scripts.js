// script pour faire passer les images en couleur quand elles sont à 70% visibles//

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');  // Sélectionne toutes les images, ou cible des classes spécifiques

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('color');  // Ajoute la classe pour passer en couleur
            }
        });
    }, {
        threshold: 0.7  // 70% de l'image doit être visible
    });

    images.forEach(img => {
        observer.observe(img);
    });
});

//script pour le popup de contact//

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('popup');
    const cards = document.querySelectorAll('.product-elements');

    console.log('modal', modal);
    console.log('product-elements', cards.length);

    if (!modal) {
        console.error('Modal #popup manquant');
        return;
    }
    if (!cards.length) {
        console.error('Aucune .product-elements trouvée');
        return;
    }

    const modalTitle = modal.querySelector('.modal-title');
    const modalList = modal.querySelector('.modal-list');
    const modalDescription = modal.querySelector('.modal-description');
    const modalPrice = modal.querySelector('.modal-price-2');
    const closeBtn = modal.querySelector('.modal-close');

cards.forEach(card => {
    card.addEventListener('click', () => {
        modalTitle.textContent = card.dataset.modalTitle || '';
        modalDescription.textContent = card.dataset.modalDescription || '';
        
        // Pour modalList (déjà existant)
        const listItems = (card.dataset.modalList || '').split(';').filter(Boolean);
        modalList.innerHTML = listItems.map(item => `<li>${item.trim()}</li>`).join('');
        
        // Pour modalPrice-2
        const priceItems = (card.dataset.modalPrice || '').split(';').filter(Boolean);
        modalPrice.innerHTML = priceItems.map(item => `<li>${item.trim()}</li>`).join('');
        
        modal.classList.add('show');
    });
});

    closeBtn?.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', event => {
        if (event.target === modal) modal.classList.remove('show');
    });
});

// Script pour le popup Mentions Légales
document.addEventListener('DOMContentLoaded', () => {
    const legalBtn = document.getElementById('openLegal');
    const legalModal = document.getElementById('legal-popup');
    const legalClose = legalModal.querySelector('.modal-close');

    legalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        legalModal.classList.add('show');
    });

    legalClose.addEventListener('click', () => {
        legalModal.classList.remove('show');
    });

    legalModal.addEventListener('click', event => {
        if (event.target === legalModal) {
            legalModal.classList.remove('show');
        }
    });
});