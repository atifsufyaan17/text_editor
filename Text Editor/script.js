import { Stack } from './stack.js';

document.onkeydown = function(event){
    if(event.ctrlKey || event.metaKey){
        event.preventDefault();
    }
};

onload = function(){
    const textbox = document.getElementById('comment');
    const undo = document.getElementById('undo');
    const clear = document.getElementById('clear');
    const temptext = document.getElementById('temptext');

    textbox.value = "";
    let text = "";
    let stack = new Stack();

    textbox.onlick = function(){
        textbox.selectionStart = textbox.selectionEnd = textbox.value.length;
    };

    clear.onclick = function(){
        textbox.value="";
        text="";
        stack.clear();
        temptext.innerHTML = "Sequence of operations will be shown here !";
    };

    textbox.oninput = function(event){
        switch(event.inputType){
            case "insertText":
                stack.push(0,event.data);
                break;
            case "deleteContentBackward":
                stack.push(1,text[text.length-1]); //we are maintaing text only for this function
                break;
        }
        temptext.innerHTML = "On stack "+stack.top()+"<br>"+temptext.innerHTML;
        text = textbox.value;
    };

    undo.onlick = function(){
        let top = stack.pop();
        if(top[0]!=-1){
            temptext.value = "Performing undo operation<br>"+temptext.innerHTML;
            if(top[0]==0){
                let len = top[1].length;
                textbox.value = textbox.value.substring(0,textbox.value.length-len);
            }
            else{
                textbox.value += top[1]; //deleted characters are stored in reverse, so we can add as it is
            }
        }
        text = textbox.value;
    };
};