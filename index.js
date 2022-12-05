function startSelection(){
    const colorSelected = getComputedStyle(document.documentElement).getPropertyValue('--color-button-selected');
    const buttonAtual = document.getElementById("atual")
    buttonAtual.style.backgroundColor = colorSelected;
}

function updateButton(){
    state = getQPoints();
    const colorSelected = getComputedStyle(document.documentElement).getPropertyValue('--color-button-selected');
    const colorDeselected = getComputedStyle(document.documentElement).getPropertyValue('--color-button-deselected');

    const buttonAtual = document.getElementById("atual")
    const buttonDestino = document.getElementById("destino")

    if (state === 0){
        buttonAtual.style.backgroundColor = colorSelected;
        buttonDestino.style.backgroundColor = colorDeselected;
    } else{
        buttonAtual.style.backgroundColor = colorDeselected;
        buttonDestino.style.backgroundColor = colorSelected;
    };
};

startSelection()