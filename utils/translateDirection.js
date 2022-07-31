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