'use strict'
import 'navbar.css';

function LoginButton(){
    return(
        <button id="login-button">Login</button>
    );
}

class NavBar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="nav-bar">
                <a href="/index.html">Home</a>
                <a href="/create/index.html">Create</a>
                <a href="/view/index.html">View</a>
                <LoginButton></LoginButton>
            </div>
        );
    }
}

ReactDOM.render(<NavBar/>,document.getElementById("nav-container"));
