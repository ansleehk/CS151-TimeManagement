

export class TimeManagementError extends Error{
    constructor(message){
        super(message)
    }

    displayErrorBox(){
        alert(this.message);
    }
}