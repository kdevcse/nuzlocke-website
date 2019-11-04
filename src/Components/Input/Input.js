import React from 'react';
import './Input.css';

class Input extends React.Component {
    render(){
        return(
            <div className='InputContainer'>
              <p>{this.props.text}</p>
              <input type={this.props.type}></input>
            </div>
        );
    }
}

export default Input;