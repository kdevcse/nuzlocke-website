import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import addRun from '../Datastore/Actions/runActions';

function Dashboard(){
    //TODO: Here we will likely need to generate a dynamic list of links to all of our nuzlocke runs
    const runs = useSelector(state => (state as any).runs);
    const dispatch = useDispatch();

    return (
        <div className="dashboard">
            <h2>Runs: {runs}</h2>
            <div className="dashboard-run-container">
                <Link to='/dashboard/NuzlockeRun1'>
                    <p className='NavLogin'>NuzlockeRun1</p>
                </Link>
                <button onClick={() => dispatch(addRun())}>Add Run</button>
            </div>
        </div>
    );
}

export default Dashboard;