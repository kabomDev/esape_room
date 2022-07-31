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
        description: "une porte menant à l'extérieur",
        toujoursVisible: true,
        inventaire: false,
        texte: 'cette porte est beaucoup trop lourde pour moi',
        combinaison: 'poignée',
        texteCombinaison: "la porte s'ouvre",
        texteNoCombinaison: 'hmmm, ça ne semble pas rentrer dedans',
    }
}