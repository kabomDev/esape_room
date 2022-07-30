const lieux = {
    CHAMBRE1: {
        id: 'CHAMBRE1',
        name: 'chambre 1',
        img: '../../images/chambre_froide.png',
        description: 'vous etes dans la chambre froide',
        blocked: true,
        blockedText: 'Il me faut la clé',
        issues: {
            ArrowLeft: 'CHAMBRE2',
            ArrowRight: 'CHAMBRE3',
        },
        objets: [
            'poignee',
            'porte'
        ]
    },
    CHAMBRE2: {
        id: 'CHAMBRE2',
        name: 'chambre 2',
        img: '../../images/chambre_nuit.png',
        description: 'vous etes dans la chambre 2',
        blocked: false,
        blockedText: 'Il manque quelque chose pour ouvrir la porte',
        issues: {
            ArrowLeft: 'CHAMBRE3',
            ArrowRight: 'CHAMBRE1',
        },
        objets: [
            'couteau',
            'pain'
        ],
        
    },
    CHAMBRE3: {
        id: 'CHAMBRE3',
        name: 'chambre 3',
        description: 'vous etes dans la chambre 3',
        blocked: false,
        blockedText: '',
        issues: {
            ArrowLeft: 'CHAMBRE1',
            ArrowRight: 'CHAMBRE2',
            ArrowUp: 'CHAMBRE4',
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