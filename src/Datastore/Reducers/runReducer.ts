import { NuzInfo } from "../../Dashboard/NuzzyRun";

function runReducer(state: any, action: any){
    switch(action.type){
        case 'ADD_RUN':
            state.push({
                Pokemon: ['Pikachu','Zapdos','Mewtwo','Tentacruel','Jigglypuff','Onix'],
                RunTitle: "Kevin's Nuzlocke",
                Version: 'Blue',
                Badges: 3,
            });
            break;
        case 'DELETE_RUN':
            state.pop();
            break;
    }

    return state;
}

export default runReducer;