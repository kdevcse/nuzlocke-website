'use strict'

class NavBar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <a>Home</a>
                <a>Create</a>
                <a>View</a>
                <a><button>Login</button></a>
            </div>
        );
    }
}

ReactDOM.render(<NavBar/>,document.getElementById("nav-bar"));