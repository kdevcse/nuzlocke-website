import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { NuzInfo } from '../Dashboard/NuzzyRun';

function Nav(props: any) {
    return (
        <nav className="Nav">
            <Link to='/login'>
                <p className='nav-header'>Login</p>
            </Link>
            <ul>
                <Link to='/dashboard'>
                    <li className='nav-header'>Runs</li>
                </Link>
                <ul className='nav-runs-list'>
                    {gatherRuns(props.runs)}
                </ul>
                <Link to='/about'>
                    <li className='nav-header'>About</li>
                </Link>
            </ul>
        </nav>
    );
}

function gatherRuns(runs: NuzInfo[]) {
    return runs.map(run => (
        <Link key={run.RunTitle} to={`/dashboard/${run.RunTitle}`}>
            <li className='nav-run'>{run.RunTitle}</li>
        </Link>
    ));
}

export default Nav;
