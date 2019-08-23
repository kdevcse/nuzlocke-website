import NavBar from './components/navbar.js'
import PokemonData from './components/pokemon_data.js'

ReactDOM.render(<NavBar/>,document.getElementById('nav-container'));

let domContainer = document.querySelector('.pokemon');
ReactDOM.render(<PokemonData />, domContainer);