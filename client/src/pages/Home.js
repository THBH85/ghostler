import React from "react";
import { Link } from 'react-router-dom'
import ghostIconWhite from '../images/ghost_icon_invert.png'
import magnifierIcon from '../images/magnifier.png'
import cashIcon from '../images/dollar-coin.png'

const Home = () => {
    return (
        <div>
            <div className="container-background">
                <div className="container-home-intro">
                    <div className="home-row-1">
                        <img className="ghost-icon-invert" src={ghostIconWhite} alt="" />
                        <div className="home-column-1">
                            <h1>Ghostler.</h1>
                            <h3>Connecting Tasks With Talent</h3>
                        </div>
                    </div>
                    <Link className='link' to='/projects'>
                    <div className="home-box-row">
                        <div className="home-box">
                            <div className="home-box-row-2">
                                <img className="home-box-icon" src={magnifierIcon} alt="" />
                                <h3>Need a little help?</h3>
                            </div>
                            <p>From course papers to autobiographies - find the perfect match to do the job! </p>
                        </div>
                        <div className="home-box">
                             <div className="home-box-row-2">
                                <img className="home-box-icon" src={cashIcon} alt="" />
                                <h3>Got Talent?</h3>
                            </div>
                            <p>No one fools you when it comes to writing? Take the job and get paid!  </p>
                        </div>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;