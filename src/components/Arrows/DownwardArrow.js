import React from "react";
import './DownwardArrow.css'

function DownwardArrow(){
    return(
        <div className="scroll-prompt">
        <div className="scroll-prompt-arrow-container">
          <div className="scroll-prompt-arrow"><div></div></div>
          <div className="scroll-prompt-arrow"><div></div></div>
        </div>
      </div>
    );
}

export default DownwardArrow;