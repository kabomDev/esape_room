/* =========================================================== */
/* =================VARIABLES GLOBALES======================== */
/* =========================================================== */

let endroitActuel = '';
let message = '';
let color = '';

let inventory = [];
let inHand = '';
let etat = '';

/* ====================================================== */
/*==============INPUT DU CLAVIER DETECTE================= */
/* ====================================================== */
function move(e)
{
    e.preventDefault();
    let input = e.key;

    //pour se deplacer dans les differentes pieces
    if (places[endroitActuel].issues !== undefined) {
        Object.entries(places[endroitActuel].issues).forEach(function([key,value]){
            if (isBlocked) {
                message = places[endroitActuel].blockedText;
            }else
            {
                if (input === key && places[value].blocked === false) {
                    goTo(value);
                }else if(input === key && places[value].blocked === true)
                {
                    message = places[value].blockedText;
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
        if (places[endroitActuel].objets !== undefined) {
            input -= 1;
            Object.entries(places[endroitActuel].objets).forEach(function([key,value]){
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
                        places[endroitActuel].objets.splice(_key,1);
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
        if (inventory.length !== 0) {
            //on fait -1 pour tomber sur le bon index
            input -= 1;
            inventory.forEach(function(value){
                etat = 'UTILISERSUR';
                inHand = value;
            });
        }
    }

    //si notre etat est egal a UTILISERSUR
    if (etat === 'UTILISERSUR') {
        if (places[endroitActuel].objets !== 0) {
            //on fait -1 pour tomber sur le bon index
            input -= 1;
            Object.entries(places[endroitActuel].objets).forEach(function([key,value])
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

/* ====================================================== */
/*======================GO TO============================ */
/* ====================================================== */
function goTo(lieu)
{
    endroitActuel = lieu;
}

/* ====================================================== */
/*===============AJOUTER A INVENTAIRE==================== */
/* ====================================================== */
function addToInventory(obj)
{
    inventory.push(obj);
}

/* ====================================================== */
/*===============RETIRER DE INVENTAIRE=================== */
/* ====================================================== */
function removeFromInventory()
{
    for (let index = 0; index < inventory.length; index++) {
        inventory.splice(index,1);
        inHand = '';
    }
}

/* ====================================================== */
/*==============UTILISER SUR UN OBJET==================== */
/* ====================================================== */
function useObjectTo(objInHand, objInRoom, room)
{
    //verifie si la combinaison entre l'objet dans notre main et celle dans la piece correspond
    if (objetsVisibles[objInHand].combinaison === objInRoom) {
        message = objetsVisibles[objInHand].texteCombinaison;
        isBlocked = false;
        places[room].blocked = false;
        removeFromInventory(objInHand);

        if (objetsVisibles[objInRoom].toujoursVisible === false) {
            delete objetsVisibles[objInRoom];
            places[endroitActuel].objets.splice(objInRoom,1);
        }
    }
    else{
        message = places[objetsVisibles[objInRoom].texteNoCombinaison];
    }

    etat = '';
}

/* ====================================================== */
/*======AFFICHE LES OBJETS VISIBLES DANS LA PIECE======== */
/* ====================================================== */
function objectsVisibles()
{
    let espace = 0;

    Object.entries(places[endroitActuel].objets).forEach(function([key,value]){
        if (objetsVisibles[value] !== undefined) {
            //titre
            configMessage('vous voyez :', '#619be3', 400, 450);
            //objets
            configMessage(`[ ${parseInt(key)+1} ] ${objetsVisibles[value].description}`, '#fff', 400, 470 + espace);
            espace += 20;
        }
    });
}