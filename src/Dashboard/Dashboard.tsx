import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import increment from '../Datastore/Actions/counterAction';

function Dashboard(){
    //TODO: Here we will likely need to generate a dynamic list of links to all of our nuzlocke runs
    const counter = useSelector(state => (state as any).counter);
    const dispatch = useDispatch();
    setInterval(()=>{
        dispatch(increment(1));
    }, 100000);

    return (
        <div className="dashboard">
            <h2>Runs: {counter}</h2>
            <div className="dashboard-run-container">
                <Link to='/dashboard/NuzlockeRun1'>
                    <p className='NavLogin'>NuzlockeRun1</p>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;