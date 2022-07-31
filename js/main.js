const canvas = document.getElementById('canvas');
canvas.width = 900;
canvas.height = 600;
const ctx = canvas.getContext('2d');
ctx.font = '15px Roboto';
/* ================================================ */
/* =================VARIABLES GLOBALES======================== */
/* ================================================ */

let endroitActuel = '';
let message = '';
let color = '';

let inventaire = [];
let inHand = '';
let etat = '';
let isBlocked =false;

let gauche = new Image();
gauche.src = '../images/f-gauche.png';

let droite = new Image();
droite.src = '../images/f-droite.png';


/* ================================================ */
/* =================FONCTIONS======================== */
/* ================================================ */

/*======INPUT DU CLAVIER DETECTE======== */
function seDeplacer(e)
{
    e.preventDefault();
    let input = e.key;

    //pour se deplacer dans les differentes pieces
    if (lieux[endroitActuel].issues !== undefined) {
        Object.entries(lieux[endroitActuel].issues).forEach(function([key,value]){
            if (isBlocked) {
                message = lieux[endroitActuel].blockedText;
            }else
            {
                if (input === key && lieux[value].blocked === false) {
                    goTo(value);
                }else if(input === key && lieux[value].blocked === true)
                {
                    message = lieux[value].blockedText;
                }
            }
        })
        removeMessage();
    }

    if (e.key === 'p') {
        etat = 'PRENDRE';
        return;
    }

    if (e.key === 'u') {
        etat = 'UTILISER';
        return;
    }
    
    //si notre etat est egal a PRENDRE
    if (etat === 'PRENDRE') {
        message = '';
        if (lieux[endroitActuel].objets !== undefined) {
            input -= 1;
            Object.entries(lieux[endroitActuel].objets).forEach(function([key,value]){
                let _key = parseInt(key);
                if (input === _key)
                {
                    //si l'objet a un inventaire a false alors on affiche le texte correspondant
                    if (objetsVisibles[value].inventaire === false)
                    {
                        message = objetsVisibles[value].texte;
                        removeMessage();
                    }
                    //sinon on ajoute l'objet à l'inventaire et affiche le texte correpondant
                    else
                    {
                        addToInventory(value);
                        lieux[endroitActuel].objets.splice(parseInt(key),1);
                        message = objetsVisibles[value].texte;
                        removeMessage();
                    }
                }
                etat = '';
            });
        }
    }

    //si notre etat est egal a UTILISER
    if (etat === 'UTILISER') {
        //si notre inventaire n'est pas vide
        if (inventaire.length !== 0) {
            //on fait -1 pour tomber sur le bon index
            input -= 1;
            inventaire.forEach(function(value){
                etat = 'UTILISERSUR';
                inHand = value;
            });
        }
    }

    //si notre etat est egal a UTILISERSUR
    if (etat === 'UTILISERSUR') {
        if (lieux[endroitActuel].objets !== 0) {
            //on fait -1 pour tomber sur le bon index
            input -= 1;
            Object.entries(lieux[endroitActuel].objets).forEach(function([key,value])
            {
                let _key = parseInt(key);
                //si la touche correspond au numero
                if (input === _key)
                {
                    useObjectTo(inHand, value, endroitActuel);
                }
            })
        }
    }
} 

/*======fonction GO TO======== */
function goTo(lieu)
{
    endroitActuel = lieu;
}


/*======fonction AJOUTER A INVENTAIRE======== */
function addToInventory(obj)
{
    inventaire.push(obj);
}

/*======fonction RETIRER DE INVENTAIRE======== */
function removeFromInventory()
{
    for (let index = 0; index < inventaire.length; index++) {
        inventaire.splice(index,1);
        inHand = '';
    }
}

/*======fonction UTILISER SUR UN OBJET======== */
function useObjectTo(objInHand, objInRoom, room)
{
    //verifie si la combinaison entre l'objet dans notre main et celle dans la piece correspond
    if (objetsVisibles[objInHand].combinaison === objInRoom) {
        message = objetsVisibles[objInHand].texteCombinaison;
        isBlocked = false;
        lieux[room].blocked = false;
        removeFromInventory(objInHand);
        
        if (objetsVisibles[objInRoom].toujoursVisible === false) {
            delete objetsVisibles[objInRoom];
            lieux[endroitActuel].objets.splice(objInRoom,1);
        }
    }
    else{
        message = lieux[objetsVisibles[objInRoom].texteNoCombinaison];
    }

    etat = '';
}

/* ================================================ */
/*======fonction EFFACER LE MESSAGE =============== */
/* ================================================ */
function removeMessage()
{
    setTimeout(() => {
        message = '';
    }, 3000);
}

/* =================================================== */
/*======POUR MODIFIER LA LANGUE DES DIRECTIONS======== */
/* =================================================== */
function translateDirection(direction)
{
    if (direction === 'ArrowLeft') {
        return 'gauche';
    }
    if (direction === 'ArrowRight') {
        return 'droite';
    }
    if (direction === 'ArrowUp') {
        return 'haut';
    }
    if (direction === 'ArrowDown') {
        return 'bas';
    }
}

/* ====================================================== */
/*======AFFICHE LES OBJETS VISIBLES DANS LA PIECE======== */
/* ====================================================== */
function visibles()
{
    let espace = 0;
    
    Object.entries(lieux[endroitActuel].objets).forEach(function([key,value]){
        if (objetsVisibles[value] !== undefined) {
            ctx.fillText('vous voyez :',400,450);
            printAtWordWrap(ctx,`[ ${parseInt(key)+1} ] ${objetsVisibles[value].description}`, 400,480 + espace,20,500);
            espace += 20;
        }
    });
}

/* ================================================ */
/*======================CHARGER==================== */
/* ================================================ */
function load()
{
    //etat par defaut
    etat = '';

    //capte l'evenement des inputs
    document.addEventListener('keydown', seDeplacer, false);

    //charge le lieu de depart
    endroitActuel = 'CHAMBRE_FROIDE';
    isBlocked = lieux[endroitActuel].blocked;
}

/*======UPDATE======== */
function update()
{
    
}

/* ================================================ */
/*======AFFICHER A L'ECRAN========================= */
/* ================================================ */
function draw()
{
    let espace = 0;
    let piece = new Image();

    //PIECES
    if (endroitActuel === 'CHAMBRE_FROIDE') {
        piece.src = lieux.CHAMBRE_FROIDE.img;
    }else if (endroitActuel === 'COULOIR') {
        piece.src = lieux.COULOIR.img;
    }else if (endroitActuel === 'CUISINE') {
        piece.src = lieux.CUISINE.img;
    }else if (endroitActuel === 'CHAMBRE4') {
        color = 'purple';
    }

    //dessine la pièce
    ctx.drawImage(piece,0,0,canvas.width,400);

    //message affichant dans quelle piece on est
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    printAtWordWrap(ctx,lieux[endroitActuel].description,100,50,20,500);

    //inventaire
    //affiche le texte de notre inventaire
    if (inventaire.length > 0) {
        ctx.fillText('Inventaire:', 100,450);
    }
    
    for (let i = 0; i < inventaire.length; i++) {
        ctx.fillStyle = 'white';
        printAtWordWrap(ctx,`[ ${i+1} ] ${inventaire[i]}`, 100,470 + espace,20,500);
        espace += 20;
    }

    //affiche le texte de notre main
    if (inHand.length > 0) {
        ctx.fillText('Dans la main:', 100,550);
    }

    ctx.fillStyle = 'white';
    printAtWordWrap(ctx,`${inHand}`, 100,550 + espace,20,500);
    espace += 20;
        

    //affiche les issues si le lieux n'est pas bloqué
    if (lieux[endroitActuel].issues) {
        let direction = '';
        if (isBlocked === false) {
            Object.entries(lieux[endroitActuel].issues).forEach(function([key,value]){
            
                direction = translateDirection(key);
    
                printAtWordWrap(ctx,`${direction} : ${value}`, 100,100 + espace, 20, 500);
                espace += 20;
                
            });
        }
        
    }

    //si objets visibles
    if (lieux[endroitActuel].objets !== undefined) {
        visibles();
    }

    //Nos actions par rapport a notre etat
    if (etat === '' && lieux[endroitActuel].objets) {
        if (lieux[endroitActuel].objets.length !== 0) {
            ctx.fillStyle = 'green';
            ctx.fillText('Commande :',400,550);
        
            ctx.fillText('[ P ] Prendre',400,570);
            
            if (inventaire.length !== 0) {
                ctx.fillText('[ U ] Utiliser',400,590)
            }
        }
    }

    /* ================================================ */
    /* =================ETATS======================== */
    /* ================================================ */ 

    if (etat === 'PRENDRE'){
        message = 'Que voulez-vous prendre ? Tapez son numéro';
    }

    if (etat === 'UTILISER') {
        message = 'Quel objet voulez-vous utiliser ?';
    }

    if (etat === 'UTILISERSUR') {
        message = "sur quoi voulez-vous utiliser l'objet " + inHand;
    }
    
    printAtWordWrap(ctx,message, 300,370,20,500);
}

/* ================================================ */
/* =================ANIMATE======================== */
/* ================================================ */
function animate()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);

    update();
    draw();

    requestAnimationFrame(animate);
}

load();
animate();