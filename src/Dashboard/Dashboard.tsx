import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { NuzInfo } from './NuzzyRun';

export function Dashboard(props: any){
    //TODO: Here we will likely need to generate a dynamic list of links to all of our nuzlocke runs
    return (
        <div className="dashboard">
            <h2>Runs:</h2>
            <div  className="dashboard-run-container">
                {gatherRuns(props.runs)}
            </div>
            <button>Add Run</button>
        </div>
    );
}

function gatherRuns(runs: NuzInfo[]){
    return runs.map(run => (
        <Link key={run.RunTitle} to={`/dashboard/${run.RunTitle}`}>
            <p className='NavLogin'>{run.RunTitle}</p>
        </Link>
    ));
}

export default Dashboard;