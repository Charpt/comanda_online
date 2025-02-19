function formatar_data(date){
    
    const ano = date.getFullYear();
        const mes = String(date.getMonth()+1).padStart(2,'0');
        const dia = String(date.getDate()).padStart(2,'0');
        const horas = String(date.getHours()).padStart(2,'0');
        const minutos = String(date.getMinutes()).padStart(2,'0');
        
        
        return `${ano}-${mes}-${dia}T${horas}:${minutos}`;
    
    }


    const dataatual = new Date();

    document.getElementById('date_criacao_id').value = formatar_data(dataatual);