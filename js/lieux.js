const places = {
    CHAMBRE_FROIDE: {
        id: 'CHAMBRE_FROIDE',
        name: 'Chambre froide',
        img: 'images/chambre_froide.png',
        description: 'vous etes dans la chambre froide',
        blocked: true,
        blockedText: 'Il me faut la clé',
        issues: {
            ArrowUp: 'COULOIR',
        },
        objets: [
            'poignee',
            'porte'
        ]
    },
    COULOIR: {
        id: 'COULOIR',
        name: 'Couloir',
        img: 'images/couloir.png',
        description: 'vous etes dans la couloir',
        blocked: false,
        blockedText: 'Il manque quelque chose pour ouvrir la porte',
        issues: {
            ArrowLeft: 'CUISINE',
            ArrowDown: 'CHAMBRE_FROIDE',
        }
    },
    CUISINE: {
        id: 'CUISINE',
        name: 'Cuisine',
        img: 'images/cuisine.png',
        description: 'vous etes dans la cuisine',
        blocked: false,
        blockedText: '',
        issues: {
            ArrowRight: 'COULOIR',
        },
        objets: [
            'couteau',
            'pain'
        ],

    }
}