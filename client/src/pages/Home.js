import React from "react";
import ghostIconWhite from '../images/ghost_icon_invert.png'

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
            
          
        </div>

      </div>
    </div>
  );
};

export default Home;