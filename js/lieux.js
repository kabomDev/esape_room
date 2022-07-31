const lieux = {
    CHAMBRE_FROIDE: {
        id: 'CHAMBRE_FROIDE',
        name: 'Chambre froide',
        img: '../../images/chambre_froide.png',
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
        img: '../../images/couloir.png',
        description: 'vous etes dans la couloir',
        blocked: false,
        blockedText: 'Il manque quelque chose pour ouvrir la porte',
        issues: {
            ArrowLeft: 'CUISINE',
            ArrowDown: 'CHAMBRE_FROIDE',
        },
        objets: [
            'couteau',
            'pain'
        ],
        
    },
    CUISINE: {
        id: 'CUISINE',
        name: 'Cuisine',
        img: '../../images/cuisine.png',
        description: 'vous etes dans la cuisine',
        blocked: false,
        blockedText: '',
        issues: {
            ArrowRight: 'COULOIR',
        }
    },
    CHAMBRE4: {
        id: 'CHAMBRE4',
        name: 'chambre 4',
        description: 'vous etes dans la chambre 4',
        blocked: false,
        blockedText: '',
        issues: {
            ArrowDown: 'CHAMBRE3',
        }
    }
}

const objetsVisibles= {
    couteau:{
        name: 'couteau',
        description: 'un couteau bien émoussé',
        toujoursVisible: false,
        inventaire: true,
        texte: 'vous prenez le couteau',
        combinaison: 'pain',
        texteCombinaison: "j'avais une petite faim",
        texteNoCombinaison: 'hhmmmm, ça va être difficile',
    },
    pain:{
        name: 'pain',
        description: 'un morceau de pain',
        toujoursVisible: false,
        inventaire: false,
        texte: "Je n'ai pas faim",
        combinaison: 'couteau',
        texteCombinaison: "j'avais une petite faim",
        texteNoCombinaison: 'Je ne pense pas que ça serve ici',
    },
    poignee:{
        name: 'poignée',
        description: 'une poignée de porte, cachée derriere un carton',
        toujoursVisible: false,
        inventaire: true,
        texte: 'vous prenez la poignée',
        combinaison: 'porte',
        texteCombinaison: "la porte s'ouvre",
        texteNoCombinaison: 'Nop',
    },
    porte:{
        name: 'porte',
        description: 'une porte en bois',
        toujoursVisible: true,
        inventaire: false,
        texte: 'cette porte est beaucoup trop lourde pour moi',
        combinaison: 'poignée',
        texteCombinaison: "la porte s'ouvre",
    }
}