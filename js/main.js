    function cloneRow(){
        var modifyTable = $("#modifyTable tr").length;
        
        var rowToClone = document.getElementById("rowToClone");
        rowToClone.insertAdjacentHTML('beforeend', '<tbody className="text-center text-white" id="rowToClone">' +
         '<tr className="text-center transitions"><td>' 
        + modifyTable + 
        '</td><td><input type="text" title="Estado atual "className="form-control" name="currentState"></td>'+
        '<td><input type="text" title="Próximo estado "className="form-control input-sm" name="nextState"></input></td>'+
        '<td><input type="text" title="Ler simbolo"className="form-control input-sm" name="scanSymbol"></input></td>'+
        '<td><input type="text" title="Escrever simbolo" className="form-control input-sm" name="printSymbol"></input></td>'+
        '<td> <input type="text" title="L/R"class="form-control input-sm" name="direction"></input></td></tr></tbody>');
    }


   function clearLaguange(){        
        document.getElementById("laguangeForm").reset();
    }


    function clearStates(){
        document.getElementById("rowToClone").reset();
    }


    function run(){
     
        var flag = 0;
        let tape = $('#inputString').val().split(",");
        let states = $('#statesSet').val().split(",");
        let initialState = $('#initialState').val();
        let finalState = $('#finalState').val();
        let blankSymbol = $('#blankSymbol').val();
        let alphabetSet = $('#alphabetSet').val().split(",");
        alphabetSet.push(blankSymbol);
        let transitions = [];
        let tapeIndex = 0;
        let currentState = initialState;
        
        console.log(tape);
        console.log(initialState);
        console.log(blankSymbol);
        console.log(finalState);
        
        
        for(let i=0; i < tape.length; i++){
          if(!alphabetSet.includes(tape[i])){
           let phrase = tape[i]+" não pertence aos alfabeto";
           Swal.fire({
               position: 'center',
               type: 'error',
               title: 'Erro',
               text: phrase,
               showConfirmButton: false,
               timer: 2500
           })
            flag = 1;
          }
        }
    
        for(let i=0; i < tape.length; i++){
          if(!states.includes(finalState)){
            let phrase = finalState+" não pertence aos estados";
            Swal.fire({
                position: 'center',
                type: 'error',
                title: 'Erro',
                text: phrase,
                showConfirmButton: false,
                timer: 2500
            })
            flag = 1;
          }
        }
    
        if(!states.includes(initialState)){
           
           let phrase = initialState+" não pertence aos estados";
            Swal.fire({
                position: 'center',
                type: 'error',
                title: 'Erro',
                text: phrase,
                showConfirmButton: false,
                timer: 2500
            })
            flag = 1;
          }

        if(initialState == "" && finalState == ""){
            let phrase = "Verifique os campos de estado inicial e estados finais ";
            Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Atencão!',
                text: phrase,
                showConfirmButton: false,
                timer: 2500
            })
            flag = 1;
        }
      
    $('#modifyTable tr').each(function(row, tr){
        transitions[row]={
        "transition" : $(tr).find('td:eq(0)').text()
        , "currentState" :$(tr).find('td:eq(1) input').val()
        , "nextState" : $(tr).find('td:eq(2) input').val()
        , "scanSymbol" : $(tr).find('td:eq(3) input').val()
        , "printSymbol" : $(tr).find('td:eq(4) input').val()
        , "direction" : $(tr).find('td:eq(5) input').val()
        }
    }); 
    transitions.shift(); 


        for(let i=0; i < transitions.length; i++){
            if(transitions[i].currentState == currentState && transitions[i].scanSymbol == tape[tapeIndex]){
                if(!states.includes(transitions[i].nextState)){
                    let phrase = transitions[i].nextState +" não se encontra nos estados";
                    Swal.fire({
                        position: 'center',
                        type: 'warning',
                        title: 'Atencão!',
                        text: phrase,
                        showConfirmButton: false,
                        timer: 2500
                    })
                    flag = 1;
                    break;
                }

                if(!alphabetSet.includes(transitions[i].printSymbol)){
                    let phrase = transitions[i].printSymbol +" não se encontra no alfabeto";
                    Swal.fire({
                        position: 'center',
                        type: 'warning',
                        title: 'Atencão!',
                        text: phrase,
                        showConfirmButton: false,
                        timer: 2500
                    })
                    flag = 1;
                    break;
                }
                currentState = transitions[i].nextState;
                tape[tapeIndex] = transitions[i].printSymbol;

                if(transitions[i].direction.toUpperCase() == 'R'){
                    if(tapeIndex == tape.length-1){
                        tape.push(blankSymbol);
                    }
                    tapeIndex++;
                }else if(transitions[i].direction.toUpperCase() == 'L'){
                    tapeIndex--;
                    if(tape[tapeIndex]==undefined){
                        tape.unshift(blankSymbol);
                        tapeIndex = 0;
                    }
                }else if(!transitions[i].direction.toUpperCase() == 'S'){
                    let phrase = transitions[i].direction +" é inválido";
                    Swal.fire({
                        position: 'center',
                        type: 'error',
                        title: 'Erro!',
                        text: phrase,
                        showConfirmButton: false,
                        timer: 2500
                    })
                    flag = 1;
                }
                i= -1;
            }
        }
            
         
          if(flag == 0){
            if(finalState.includes(currentState)) {
                let phrase = "A fita ficou "+ tape;
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Sucesso!',
                    text: phrase,
                    showConfirmButton: true,
                    
                }) 
            
            }else{
                Swal.fire({
                    position: 'center',
                    type: 'error',
                    title: 'Erro!',
                    text: 'Algo deu errado',
                    showConfirmButton: true,
                    
                }) 
            }
          }
    }

   