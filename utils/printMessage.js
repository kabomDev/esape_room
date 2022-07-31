/* ================================================ */
/*=============POUR ECRIRE LES TEXTES============== */
/* ================================================ */
function printAtWordWrap( context , text, x, y, lineHeight, fitWidth)
{
    fitWidth = fitWidth || 0;
    
    if (fitWidth <= 0)
    {
        context.fillText( text, x, y );
        return;
    }
    let words = text.split(' ');
    let currentLine = 0;
    let idx = 1;
    while (words.length > 0 && idx <= words.length)
    {
        const str = words.slice(0, idx).join(' ');
        const w = context.measureText(str).width;
        if ( w > fitWidth )
        {
            if (idx===1)
            {
                idx=2;
            }
            context.fillText( words.slice(0,idx-1).join(' '), x, y + (lineHeight*currentLine) );
            currentLine++;
            words = words.splice(idx-1);
            idx = 1;
        }
        else
        {idx++;}
    }
    if  (idx > 0)
        context.fillText( words.join(' '), x, y + (lineHeight*currentLine) );
}

/* ================================================ */
/*===============EFFACER LE MESSAGE =============== */
/* ================================================ */
function removeMessage()
{
    setTimeout(() => {
        message = '';
    }, 3000);
}

function configMessage(text, color, positionX, positionY)
{
    ctx.fillStyle = color;
    ctx.fillText(text, positionX, positionY);
}