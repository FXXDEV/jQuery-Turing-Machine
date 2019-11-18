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
        
        
        for(let i=0; i < tape.length; i++){
          if(!alphabetSet.includes(tape[i])){
           //swal("Erro",tape[i]+" não se encontra no alfabeto informado","error");
            flag = 1;
          }
        }
    
        for(let i=0; i < finalState.length; i++){
          if(!states.includes(finalState[i])){
           //swal("Erro",finalState[i]+" não se encontra nos states informados","error");
            flag = 1;
          }
        }
    
        if(!states.includes(initialState)){
           //swal("Erro",initialState+" não se encontra nos estados informados","error");
            flag = 1;
          }
          if(initialState == "" && finalState == ""){
              //swal("Erro",initialState + "verifique os campos de estado inicial e estados finais","warning");
              flag = 1;
            }
    
            
            var TableData = new Array();
    
            $('#modifyTable tr').each(function(row, tr){
                TableData[row]={
                    "transition" : $(tr).find('td:eq(0)').text()
                    , "currentState" :$(tr).find('td:eq(1) input').val()
                    , "nextState" : $(tr).find('td:eq(2) input').val()
                    , "scanSymbol" : $(tr).find('td:eq(3) input').val()
                    , "printSymbol" : $(tr).find('td:eq(4) input').val()
                    , "direction" : $(tr).find('td:eq(5) input').val()
                }
            }); 
            TableData.shift();  // first row is the table header - so remove

        
          for(let i=0; i < transitions.length; i++){
            let currentState = transitions[i].split('/');
            let currentState2 = currentState[0].split(",");
            if((currentState2[0] === currentState) && (currentState2[1] === tape[tapeIndex])){
             let verif = currentState[1].split(",");
             if(!states.includes(verif[0])){
                //swal("Erro",verif[0]+" não se  encontra nos estados informados","error");
               flag = 1;
               break;
             }
             if(!alphabetSet.includes(verif[1])){
               //swal("Erro",verif[1]+" não se  encontra no alfabeto informado","error");
              flag = 1;
              break;
            }
              currentState = verif[0];
              tape[tapeIndex] = verif[1];
              if(currentState[2] === 'r' || currentState[2] === 'R'){
                if(tapeIndex==tape.length-1){
                  tape.push(blankSymbol)
                }
                tapeIndex++;
              }else if(currentState[2] === 'l' || currentState[2] === 'L'){
                tapeIndex--;
                if(tape[tapeIndex]===undefined){
                  tape.unshift(blankSymbol);
                  tapeIndex=0;
                }
              }else if(currentState[2] != 's' && !currentState[2] != 'S'){
                //swal("Erro", currentState[2] + " é inválido","error");
                flag = 1;
              }
              i=-1;
            }
          }
          if(flag == 0){
            if(finalState.includes(currentState)) {
             // swal("Sucesso!","a tape ficou "+ tape,"success");
            }else{
              //swal("Erro","Algo deu errado","error");
            }
          }
    }

   