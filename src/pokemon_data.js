
class PokemonData extends React.Component {
    //react constructor: constructor() with JS consructor: super()
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            Hello how is it going? I am a react application. Hahahaha. yo. yuuh
        </div>
        );
    }
}

let domContainer = document.querySelector('.pokemon');
ReactDOM.render(<PokemonData />, domContainer);