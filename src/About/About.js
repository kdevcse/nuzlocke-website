import React from 'react';
import './About.css';

function About() {
  return (
    <div className="About">
      <div className="About-header">
        <h1>
          Welcome to NuzHub!
        </h1>
        <p>
          This application will provide a way for users to track their Pokemon Nuzlocke Runs online 
          and even live display their progress on the web to others.
        </p>
        <a className="App-link"
          href="https://bulbapedia.bulbagarden.net/wiki/Nuzlocke_Challenge"
          target="_blank"
          rel="noopener noreferrer">
          Learn about nuzlockes here
        </a>
      </div>
    </div>
  );
}

export default About;
