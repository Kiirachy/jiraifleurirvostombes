//script pour le popup de contact//

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('popup');
    const variantButtons = document.querySelectorAll('.product-variant');

    if (!modal) {
        console.error('Modal #popup manquant');
        return;
    }
    if (!variantButtons.length) {
        console.error('Aucun .product-variant trouvé');
        return;
    }

    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalBody = modal.querySelector('.modal-body');
    const modalGallery = modal.querySelector('.modal-gallery');
    const galleryImage = modal.querySelector('.gallery-image');
    const prevButton = modal.querySelector('.gallery-prev');
    const nextButton = modal.querySelector('.gallery-next');
    const closeBtn = modal.querySelector('.modal-close');

    let currentGallery = [];
    let currentGalleryIndex = 0;

    const popupConfig = {

        entretien: {

            ponctuel: {
                title: "L'Entretien ponctuel",
                description: "Un entretien en deux passages, pour les obsèques et la Toussaint",
                content: "1er passage : nettoyage et entretien complet de la sépulture en amont, 2e passage : suivi (retrait des végétaux fanés, arrosage, réajustement des éléments)",
                gallery: [
                    'images/entretien_gallery/1.jpg',
                    'images/entretien_gallery/2.jpg',
                    'images/entretien_gallery/3.jpg',
                    'images/entretien_gallery/4.jpg'
                ]
            },

            mensuel: { 
                title: "L'Entretien mensuel", 
                description: "Un entretien en un passage tous les mois", 
                content: "a remplir", 
                gallery: [
                    'images/entretien_gallery/1.jpg',
                    'images/entretien_gallery/2.jpg',
                    'images/entretien_gallery/3.jpg',
                    'images/entretien_gallery/4.jpg'
                ] },

            bimestriel: { 
                title: "L'Entretien bimestriel", 
                description: "Un entretien en un passage tous les deux mois", 
                content: "a remplir", 
                gallery: [
                    'images/entretien_gallery/1.jpg',
                    'images/entretien_gallery/2.jpg',
                    'images/entretien_gallery/3.jpg',
                    'images/entretien_gallery/4.jpg'
                ] },

            "4-saisons": { 
                title: "L'Entretien en 4 saisons", 
                description: "Un entretien en un passage tous les trois mois", 
                content: "", 
                gallery: [
                    'images/entretien_gallery/1.jpg',
                    'images/entretien_gallery/2.jpg',
                    'images/entretien_gallery/3.jpg',
                    'images/entretien_gallery/4.jpg'
                ] }
        },

        végétalisation: {

            fleurissement: { 
                title: "Le Fleurissement", 
                description: "Une composition florale pensée comme un hommage.", 
                content: "Création florale réalisée en partenariat avec un artisan fleuriste local. Validation systématique par visuel (envoie photo) avant mise en place. Personnalisation possible selon les préférences ou les souvenirs liés à votre proche.", 
                gallery: [
                    'images/vegetalisation_gallery/1.jpg'
                ] },
            
            "végétalisation durable": { 
                title: "La Végétalisation durable", 
                description: "Végétaliser une tombe, c’est inviter la vie là où elle semble absente : des couleurs qui évoluent au fil des saisons, des insectes qui butinent, des oiseaux qui se posent. C’est redonner à ces lieux une dimension naturelle, vivante et apaisante, pour un dernier hommage en harmonie avec la nature.", 
                content: "1. Tombes en pleine terre : l’alliance du végétal et du minéral. Pour une tombe en pleine terre, la végétalisation s’intègre naturellement au sol existant. Je privilégie des plantes résistantes et adaptées : Sédums, vivaces et graminées.Ce décor végétal est complété par des éléments minéraux : graviers décoratifs, galets ou ardoise qui créent un jeu de textures et de couleurs. L’ensemble forme un espace naturel, durable et évolutif, qui s’adapte aux saisons. 2. Tombes en dur (granit, marbre, pierre) : une solution technique et esthétique. Pour les tombes en dur, la végétalisation nécessite une adaptation technique afin de préserver l’intégrité de la sépulture. Le système repose sur un cadre (en acier corten, bois, pierre ou granit) posé sur la tombale. Ce cadre maintient le substrat et évite tout écoulement d’eau. À l’intérieur, la végétalisation s’appuie sur un système inspiré des toitures végétalisées, composé de : Une couche d’étanchéité (1 mm), un géocomposite drainant (1 cm), un substrat spécial sédums (8 à 12 cm) et le tapis de Sédums(3 cm). Ce dispositif garantit une végétalisation stable, durable et parfaitement adaptée aux contraintes d’un monument en pierre. Pourquoi végétaliser une tombe ? Au-delà de l’aspect esthétique, la végétalisation contribue à faire évoluer nos cimetières vers des espaces plus vivants et plus accueillants. Situés souvent en cœur de village ou de quartier, ces lieux peuvent devenir de véritables jardins de mémoire : ombragés, colorés et propices à la sérénité. Végétaliser une tombe, c’est : Offrir un hommage personnalisé, en harmonie avec les goûts du défunt et son environnement, Participer à la transformation des cimetières en espaces où l’on aime revenir, se recueillir ou déambuler. Chaque projet de végétalisation est unique : les dimensions, les matériaux et les plantes sont adaptés à vos souhaits et aux contraintes de la sépulture. Un devis personnalisé est donc systématiquement établi pour répondre précisément à vos besoins.", 
                gallery: [
                    'images/vegetalisation_gallery/2.jpg',
                    'images/vegetalisation_gallery/3.jpg',
                    'images/vegetalisation_gallery/4.jpg'
                ] }
        },

        restauration: {

            "sépultures en pierre": { 
                title: "La Restauration de sépultures en pierre", 
                description: "Un traitement en deux passages pour restituer durablement l’éclat des tombes en pierre.", 
                content: "Une approche personnalisée pour redonner brillance et clarté des tombes en pierre assombries par le passage du temps. Deux interventions réparties sur quatre mois sont nécessaires afin d’obtenir un résultat durable et authentique, restituant à la pierre son éclat d’antan. Un brossage complet de la sépulture est effectué afin de la débarrasser de toutes poussières et saletés avant la pulvérisation d’un produit professionnel à la formule concentrée, conçu pour éliminer mousses, algues, lichens et moisissures accumulés sur les tombes en pierre. Un nettoyage en profondeur qui rend à la pierre sa clarté d’origine durablement. Un produit professionnel testé, employé et recommandé par le Centre de Recherche des Monuments Historiques de France. Ce dernier est un démoussant phytocide (dévitalisation des végétaux) par contact et non systémique, pas de migration dans les sols, aucun risque de phytotoxicité", 
                gallery: [
                    'images/restauration_gallery/1.jpg'
                ] },

           "plaques funéraires": { 
                title: "La Restauration de plaques funéraires", 
                description: "a remplir", 
                content: "Réfection du lettrage : dorure à la feuille d’or ou rechampissage à la peinture de marbrier, avec réouverture des lettres si nécessaire. Remise en état des plaques endommagées : réparation des dégradations et restauration de l’aspect d’origine (brisures, fissures…). Restauration de l’éclat : nettoyage en profondeur selon le même processus que pour les sépultures en pierre, afin d’effacer les traces et salissures liées au temps.", 
                gallery: [
                    'images/restauration_gallery/2.jpg',
                    'images/restauration_gallery/3.jpg'
                ] }
        },

        accompagnement: {

            "visite speciale": { 
                title: "Accompagnement lors d'une visite pour un jour spécial", 
                description: "Accompagnement au cimetière proposé pour les personnes âgées ou isolées", 
                content: "Anniversaires, commémorations… avec bougie, photo, fleurs, lecture d’un texte ou écoute d’une chanson selon vos souhaits", 
                gallery: [
                ] },

           "mémorial numérique": { 
                title: "Accompagnement au développement d’un mémorial numérique", 
                description: "Création d'une gallerie en ligne", 
                content: "Création d'un espace numérique accessible via QR code pouvant contenir la biographie, des photos ou musiques en lien avec le défunt, et disponible au cimetière", 
                gallery: [
                ] }
        }

    };

    //script pour la gallerie//

    const updateGallery = () => {
        if (!currentGallery.length) {
            modalGallery.style.display = 'none';
            return;
        }

        modalGallery.style.display = 'flex';
        galleryImage.src = currentGallery[currentGalleryIndex];
        galleryImage.alt = `${modalTitle.textContent} - photo ${currentGalleryIndex + 1}`;
        prevButton.disabled = currentGalleryIndex === 0;
        nextButton.disabled = currentGalleryIndex === currentGallery.length - 1;
    };

    prevButton.addEventListener('click', () => {
        if (currentGalleryIndex > 0) {
            currentGalleryIndex -= 1;
            updateGallery();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentGalleryIndex < currentGallery.length - 1) {
            currentGalleryIndex += 1;
            updateGallery();
        }
    });

    variantButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();

            const family = button.closest('.product-elements')?.dataset.productFamily;
            const variant = button.dataset.productVariant;
            const content = popupConfig[family]?.[variant] || { title: button.textContent, description: '', content: '', gallery: [] };

            modalTitle.textContent = content.title || '';
            modalDescription.textContent = content.description || '';
            modalBody.innerHTML = content.content || '';

            currentGallery = Array.isArray(content.gallery) ? content.gallery : [];
            currentGalleryIndex = 0;
            updateGallery();

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