'use strict'

class LoginButton extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <button className>Login</button>
        );
    }
}

ReactDOM.render(<LoginButton/>,document.getElementById("login-button"));