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
                <a href="/create/create.html">Create</a>
                <a href="/view/view.html">View</a>
                <LoginButton></LoginButton>
            </div>
        );
    }
}
