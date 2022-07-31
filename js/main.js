const canvas = document.getElementById('canvas');
canvas.width = 900;
canvas.height = 600;
const ctx = canvas.getContext('2d');
ctx.font = '15px Roboto';

let isBlocked;

/*======UPDATE======== */
function update()
{

}

/* ================================================ */
/*==============AFFICHER A L'ECRAN================= */
/* ================================================ */
function draw()
{
    let espace = 0;
    let room = new Image();

    //PIECES
    if (endroitActuel === 'CHAMBRE_FROIDE') {
        room.src = places.CHAMBRE_FROIDE.img;
    }else if (endroitActuel === 'COULOIR') {
        room.src = places.COULOIR.img;
    }else if (endroitActuel === 'CUISINE') {
        room.src = places.CUISINE.img;
    }else if (endroitActuel === 'CHAMBRE4') {
        color = 'purple';
    }

    //dessine la pièce
    ctx.drawImage(room,0,0,canvas.width,400);

    //message affichant dans quelle room on est
    configMessage(places[endroitActuel].description, '#fff', 100, 50)

    //inventaire
    //affiche le texte de notre inventaire
    if (inventory.length > 0) {
        //titre
        configMessage('Inventaire:', '#619be3', 100, 450)
        //objets
        for (let i = 0; i < inventory.length; i++) {
            configMessage(`[ ${i+1} ] ${inventory[i]}`, '#fff', 100, 470 + espace);
            espace += 20;
        }
    }

    //affiche le texte de notre main
    if (inHand.length > 0) {
        //titre
        configMessage('Dans la main:', '#619be3', 100, 550)
        //objets
        configMessage(inHand, '#fff', 100, 550 + espace);
        espace += 20;
    }
        

    //affiche les issues si le lieux n'est pas bloqué
    if (places[endroitActuel].issues) {
        let direction = '';
        if (isBlocked === false) {
            Object.entries(places[endroitActuel].issues).forEach(function([key,value]){
                direction = translateDirection(key);
                printAtWordWrap(ctx,`${direction} : ${value}`, 100,100 + espace, 20, 500);
                espace += 20;
                
            });
        }
        
    }

    //si objets objectsVisibles
    if (places[endroitActuel].objets !== undefined) {
        objectsVisibles();
    }

    //Nos actions par rapport a notre etat
    if (etat === '' && places[endroitActuel].objets) {
        if (places[endroitActuel].objets.length !== 0) {
            //titre commande
            configMessage('Commande', '#619be3', 400,550);
            //touches du clavier
            configMessage('[ P ] Prendre', '#fff', 400,570);
            if (inventory.length !== 0) {
                configMessage('[ U ] Utiliser', '#fff', 400, 590);
            }
        }
    }

    /* ====================================================================== */
    /* ================= MESSAGE PAR RAPPORT A L'ETAT======================== */
    /* ====================================================================== */
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

/* ==================================================== */
/*=============CHARGEMENT DE DEPART==================== */
/* ==================================================== */
function load()
{
    //etat par defaut
    etat = '';

    //capte l'evenement des inputs
    document.addEventListener('keydown', move, false);

    //charge le lieu de depart
    endroitActuel = 'CHAMBRE_FROIDE';
    isBlocked = places[endroitActuel].blocked;
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