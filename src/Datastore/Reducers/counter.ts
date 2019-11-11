import { stat } from "fs";

function counterReducer(state = 0, action: any) {
    switch(action.type){
        case 'INCREMENT':
            return (state + 1) * action.payload;
        case 'DECREMENT':
            return (state - 1) * action.payload;
        default:
            return state;
    }
}

export default counterReducer;