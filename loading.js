function ShowLoading(){
    
    const div = document.createElement('div');
    div.classList.add("loading","centralizar");
    document.body.appendChild(div);
    
    const label = document.createElement('label');
    label.innerText = "Carregando...";
    div.appendChild(label);


    
}

function removeLoading(){
    const loadings = document.getElementsByClassName("loading");
    if(loadings.length){
        loadings[0].remove();
    }
}