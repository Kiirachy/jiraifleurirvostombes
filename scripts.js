//script pour le menu//
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-element');

    menuItems.forEach((item) => {
        const targetId = item.dataset.section;
        if (!targetId) return;

        const scrollToSection = () => {
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        item.addEventListener('click', scrollToSection);
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                scrollToSection();
            }
        });
    });
});

//script pour le bouton retour en haut//

document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.getElementById('scrollToTopBtn');

    if (!scrollBtn) return;

    const toggleButtonVisibility = () => {
        scrollBtn.classList.toggle('show', window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleButtonVisibility, { passive: true });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    toggleButtonVisibility();
});

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
    const galleryCaption = modal.querySelector('.gallery-caption');
    const prevButton = modal.querySelector('.gallery-prev');
    const nextButton = modal.querySelector('.gallery-next');
    const closeBtn = modal.querySelector('.modal-close');

    let currentGallery = [];
    let currentGalleryIndex = 0;

    const escapeHtml = (value = '') => String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const renderBodyContent = (content) => {
        if (Array.isArray(content)) {
            return content.map((block) => {
                if (typeof block === 'string') {
                    return `<p>${escapeHtml(block).replace(/\n/g, '<br>')}</p>`;
                }

                if (!block || typeof block !== 'object') {
                    return '';
                }

                if (block.type === 'list') {
                    const items = (block.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('');
                    return `<ul>${items}</ul>`;
                }

                if (block.type === 'sub-title') {
                    const text = block.text || '';
                    return `<p class="modal-sub-title">${escapeHtml(text).replace(/\n/g, '<br>')}</p>`;
                }

                if (block.type === 'html') {
                    return block.html || '';
                }

                const text = block.text || '';
                return `<p>${escapeHtml(text).replace(/\n/g, '<br>')}</p>`;
            }).join('');
        }

        if (typeof content === 'string') {
            return `<p>${escapeHtml(content).replace(/\n/g, '<br>')}</p>`;
        }

        return '';
    };

    const popupConfig = {

        entretien: {

            ponctuel: {
                title: "L'Entretien ponctuel",
                description: "Un entretien ponctuel de la sépulture, en deux passages",
                content: [
                    {
                        type: 'paragraph',
                        text: 'Chacune de mes interventions suit une méthodologie structurée, assurant un entretien complet, respectueux des matériaux et conforme aux bonnes pratiques du secteur funéraire. Voici les étapes de l’intervention :'
                    },
                    {
                        type: 'list',
                        items: [
                            'Mise à nu de la sépulture',
                            'Dépoussiérage et nettoyage manuel',
                            'Désherbage et entretien des abords',
                            'Arrosage et taille des végétaux',
                            'Rinçage, séchage et lustrage de l’ensemble',
                            'Vérification de la stabilité des éléments funéraires (plaques, vases, croix)',
                            'Remise en place des ornements',
                            'Photos avant/après'
                        ]
                    },
                    {
                        type: 'paragraph',
                        text: 'Intervention exceptionnelle possible pour Pâques ou la Toussaint'
                    }
                ],
                gallery: [
                    'images/entretien_gallery/ponctuel/Nettoyage et balayage autour de la sépulture.jpg',
                    'images/entretien_gallery/ponctuel/Nettoyage complet de la sépulture.jpg',
                    'images/entretien_gallery/ponctuel/Remise en place des ornementations.jpg',
                    'images/entretien_gallery/ponctuel/Exemple de matériel utilisé.jpg'
                ]
            },

            régulier: { 
                title: "L'Entretien régulier", 
                description: "Un entretien régulier sur mesure, en deux passages", 
                content: [                    
                    {
                        type: 'paragraph',
                        text: 'Chacune de mes interventions suit une méthodologie structurée, assurant un entretien complet, respectueux des matériaux et conforme aux bonnes pratiques du secteur funéraire. Voici les étapes de l’intervention :'
                    },
                    {
                        type: 'list',
                        items: [
                            'Mise à nu de la sépulture',
                            'Dépoussiérage et nettoyage manuel',
                            'Désherbage et entretien des abords',
                            'Arrosage et taille des végétaux',
                            'Rinçage, séchage et lustrage de l’ensemble',
                            'Vérification de la stabilité des éléments funéraires (plaques, vases, croix)',
                            'Remise en place des ornements',
                            'Photos avant/après'
                        ]
                    }
                ],
                gallery: [
                    'images/entretien_gallery/regulier/Nettoyage et balayage autour de la sépulture.jpg',
                    'images/entretien_gallery/regulier/Nettoyage complet de la sépulture.jpg',
                    'images/entretien_gallery/regulier/Remise en place des ornementations.jpg',
                    'images/entretien_gallery/regulier/Exemple de matériel utilisé.jpg'
                ] }
        },

        végétal: {

            bouquet: { 
                title: "Le Dépôt de bouquet", 
                description: "Une composition florale pensée comme un hommage.", 
                content: [
                    {
                        type: 'list',
                        items: [
                            'Je prépare une création florale réalisée en partenariat avec un artisan fleuriste local',
                            'Je vous fais valider systématiquement par visuel (envoie photo) avant mise en place',
                            'Je peux personnaliser le produit selon les préférences ou les souvenirs liés à votre proche'
                        ]
                    }
                ], 
                gallery: [
                    'images/vegetal_gallery/bouquet/Bouquet de fleurs composé sur mesure.jpg'
                ] },

            fleurissement: { 
                title: "Le Fleurissement des sépultures", 
                description: "TBC", 
                content: [
                    "TBC"
                ], 
                gallery: [
                    'images/vegetal_gallery/fleurissement/Choix des matériaux, achat et transport.jpg',
                    'images/vegetal_gallery/fleurissement/Nettoyage des fleurs à remplacer.jpg',
                    'images/vegetal_gallery/fleurissement/Préparation des bouquets.jpg',
                    'images/vegetal_gallery/fleurissement/Préparation des pots.jpg',
                    'images/vegetal_gallery/fleurissement/Mise en terre des fleurs.jpg'
                ] },
            
            végétalisation: { 
                title: "La Végétalisation durable", 
                description: "Aménagement de la sépulture pour un hommage naturel et durable", 
                content: [
                    {
                        type: 'paragraph',
                        text: 'Végétaliser une tombe, c’est inviter la vie là où elle semble absente : des couleurs qui évoluent au fil des saisons, des insectes qui butinent, des oiseaux qui se posent. C’est redonner à ces lieux une dimension naturelle, vivante et apaisante, pour un dernier hommage en harmonie avec la nature.'
                    },
                    {
                        type: 'sub-title',
                        text: '1. Tombes en pleine terre : l’alliance du végétal et du minéral'
                    },
                    {
                        type: 'paragraph',
                        text: 'Pour une tombe en pleine terre, la végétalisation s’intègre naturellement au sol existant. Je privilégie des plantes résistantes et adaptées : Sédums, vivaces et graminées.Ce décor végétal est complété par des éléments minéraux : graviers décoratifs, galets ou ardoise qui créent un jeu de textures et de couleurs. L’ensemble forme un espace naturel, durable et évolutif, qui s’adapte aux saisons.'
                    },
                    {
                        type: 'sub-title',
                        text: '2. Tombes en dur (granit, marbre, pierre) : une solution technique et esthétique'
                    },
                    {
                        type: 'paragraph',
                        text: 'Pour les tombes en dur, la végétalisation nécessite une adaptation technique afin de préserver l’intégrité de la sépulture. Le système repose sur un cadre (en acier corten, bois, pierre ou granit) posé sur la tombale. Ce cadre maintient le substrat et évite tout écoulement d’eau. À l’intérieur, la végétalisation s’appuie sur un système inspiré des toitures végétalisées, composé de : Une couche d’étanchéité (1 mm), un géocomposite drainant (1 cm), un substrat spécial sédums (8 à 12 cm) et le tapis de Sédums(3 cm). Ce dispositif garantit une végétalisation stable, durable et parfaitement adaptée aux contraintes d’un monument en pierre.'
                    },
                    {
                        type: 'sub-title',
                        text: 'Pourquoi végétaliser une tombe ?'
                    },
                    {
                        type: 'paragraph',
                        text: 'Au-delà de l’aspect esthétique, la végétalisation contribue à faire évoluer nos cimetières vers des espaces plus vivants et plus accueillants. Situés souvent en cœur de village ou de quartier, ces lieux peuvent devenir de véritables jardins de mémoire : ombragés, colorés et propices à la sérénité. Végétaliser une tombe, c’est :'
                    },  
                    {
                        type: 'list',
                        items: [
                            'Offrir un hommage personnalisé, en harmonie avec les goûts du défunt et son environnement',
                            'Participer à la transformation des cimetières en espaces où l’on aime revenir, se recueillir ou déambuler'
                        ]
                    }
                ],
                gallery: [
                    'images/vegetal_gallery/vegetalisation/image à venir.jpg'
                ] }
        },

        restauration: {

            "sépultures en pierre": { 
                title: "La Restauration de sépultures en pierre", 
                description: "Un traitement en deux passages pour restituer durablement l’éclat des tombes en pierre.", 
                content: [                    
                    {
                        type: 'paragraph',
                        text: 'Je pratique une approche personnalisée pour redonner brillance et clarté des tombes en pierre assombries par le passage du temps. Deux interventions sont réparties sur quatre mois afin d’obtenir un résultat durable et authentique, restituant à la pierre son éclat d’antan.'
                    },
                    {
                        type: 'list',
                        items: [
                            'J’effectue un brossage complet de la sépulture afin de la débarrasser de toutes poussières et saletés',
                            'Je pulvérise ensuite avec un produit professionnel à la formule concentrée, conçu pour éliminer mousses, algues, lichens et moisissures accumulés sur les tombes en pierre.'
                        ]
                    },
                    {
                        type:'paragraph',
                        text:'Le produit est testé, employé et recommandé par le Centre de Recherche des Monuments Historiques de France. Ce dernier est un démoussant phytocide (dévitalisation des végétaux) par contact et non systémique, pas de migration dans les sols, aucun risque de phytotoxicité'
                    }
                ], 
                gallery: [
                    'images/restauration_gallery/sepultures en pierre/Sépulture avant restauration.jpg',
                    'images/restauration_gallery/sepultures en pierre/Sépulture après restauration.jpg'
                ] },

           "plaques funéraires": { 
                title: "La Restauration de plaques funéraires", 
                description: "Une intervention personnalisée sur chaque plaque et son lettrage", 
                content: [
                    {
                        type:'paragraph',
                        text:'Formée au geste par Moira.lab, restauratrice d’art, j’applique une méthode respectueuse du matériau et de son histoire.'
                    },
                    {
                        type:'list',
                        items: [
                            'Réfection du lettrage : Je dore à la feuille d’or ou rechampissage à la peinture de marbrier, avec réouverture des lettres si nécessaire.',
                            'Remise en état des plaques endommagées : Je répare les dégradations et restauration de l’aspect d’origine (brisures, fissures…).',
                            'Restauration de l’éclat : Je nettoie en profondeur selon le même processus que pour les sépultures en pierre, afin d’effacer les traces et salissures liées au temps.'
                        ]
                    }
                ],
                gallery: [
                    'images/restauration_gallery/plaques funeraires/Plaque funéraire avant rechampissage.jpg',
                    'images/restauration_gallery/plaques funeraires/Plaque funéraire après rechampissage.jpg'
                ] },
    
            "éléments métalliques": { 
                title: "La Restauration d'éléments métalliques", 
                description: "L'entretien et réparation de croix, vases, ou paniers", 
                content: [
                    {
                        type:'paragraph',
                        text:'J’interviens sur des objets anciens et oxydés, nécessitant une intervention précise pour qu’ils retrouvent stabilité et élégance. L’objectif : préserver la matière, stopper l’altération et redonner une lecture claire des formes.'
                    },
                    {
                        type:'list',
                        items: [
                            'Je retire les résidus et de la rouille à la brossette métallique',
                            'Je nettoie minutieusement',
                            'Je traite à l’anticorrosion, étape essentielle pour protéger durablement la pièce',
                            'J’applique une finition protectrice, choisie pour respecter l’aspect d’origine tout en assurant une tenue dans le temps.'
                        ]
                    }
                ],
                gallery: [
                    'images/restauration_gallery/elements metalliques/Vase avant restauration.jpg',
                    'images/restauration_gallery/elements metalliques/Résultat final.jpg'
                ] },

        },

        soutien: {

            "accompagner l'entourage": { 
                title: "Le soutien de l'entourage", 
                description: "Accompagnement au cimetière pour les personnes isolées ou empêchées", 
                content: [
                    {
                        type:'paragraph',
                        text:'Je me rends disponible pour accompagner les proches du défunt sur place, ponctuellement ou régulièrement. Je peux par ailleurs venir pour un anniversaire, une commémoration, etc… avec bougie, photo, fleurs, lecture d’un texte ou écoute d’une chanson selon vos souhaits' 
                    }
                ],
                gallery: [
                    'images/soutien_gallery/accompagner entourage/image à venir.jpg'
                ] },

           "mémorial numérique": { 
                title: "Création d’un mémorial numérique", 
                description: "QR code mémoriel, un lien vivant avec l'histoire familiale", 
                content: [
                    {
                        type:'paragraph',
                        text:'Un QR code discret peut être apposé sur la sépulture afin de permettre aux proches d’accéder, en un simple scan, à un espace numérique dédié au défunt. Cet espace peut rassembler des éléments personnels et authentiques : biographie, photos, musiques, enregistrements vocaux, hommages, documents ou souvenirs partagés.'
                    },
                    {
                        type:'paragraph',
                        text:'Ce dispositif offre une manière moderne et respectueuse de préserver la mémoire :'
                    },
                    {
                        type:'list',
                        items: [
                            'Un accès immédiat depuis un smartphone',
                            'Un contenu sécurisé et personnalisable',
                            'La possibilité de partager avec la famille, où qu’elle se trouve',
                            'Une mise à jour simple au fil du temps'
                        ]
                    }
                ],
                gallery: [
                    'images/soutien_gallery/memorial numerique/image à venir.jpg'
                ] }
        }

    };

    //script pour la gallerie//

    const updateGallery = () => {
        if (!currentGallery.length) {
            modalGallery.style.display = 'none';
            return;
        }

        const currentImage = currentGallery[currentGalleryIndex];
        const imageName = currentImage.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';

        modalGallery.style.display = 'flex';
        galleryImage.src = currentImage;
        galleryImage.alt = `${modalTitle.textContent} - photo ${currentGalleryIndex + 1}`;
        galleryCaption.textContent = imageName;
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
            modalBody.innerHTML = renderBodyContent(content.content);

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