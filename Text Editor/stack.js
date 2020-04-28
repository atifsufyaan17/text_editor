export {Stack}

class Stack{
    constructor(){
        this.stack=[];
        this.buffer=4;
        this.size=0;
    }
    clear(){
        this.stack=[];
        this.size=0;
    }
    isempty(){
        return (this.size==0);
    }
    top(){
        return this.stack[this.size-1];
    }
    pop(){
        if(this.size==0){
            return [-1,""];
        }
        else{
            this.size--;
            return this.stack.pop();
        }
    }
    push(type,char){
        if(this.size==0){
            if(type==0)
                this.stack.push([type,char]);
        }
        else{
            let top = this.top();
            if(top[0]==type && top[1].length<this.buffer){
                this.stack.pop();
                top[1]=char+top[1]; //reversing and storing to add directly during the undo phase
                this.stack.push(top);
            }
            else{
                this.stack.push([type,char]);
            }
        }
        this.size++;
    }
}