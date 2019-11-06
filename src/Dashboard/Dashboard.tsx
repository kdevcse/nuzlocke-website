import React from 'react';
import './Dashboard.css';
import {Link} from 'react-router-dom';

class Dashboard extends React.Component {
    //TODO: Here we will likely need to generate a dynamic list of links to all of our nuzlocke runs
    render(){
        return (
            <div className="dashboard">
                <h2>Runs</h2>
                <div className="dashboard-run-container">
                    <Link to='/dashboard/NuzlockeRun1'>
                        <p className='NavLogin'>NuzlockeRun1</p>
                    </Link>
                </div>
            </div>
        );
  }
}

export default Dashboard;