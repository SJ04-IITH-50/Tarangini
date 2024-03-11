import React from "react";
import './UpwardArrow.css'

function UpwardArrow(){
    return(
        <div className="scroll-prompt-up">
        <div className="scroll-prompt-arrow-container-up">
          <div className="scroll-prompt-arrow-up"><div></div></div>
          <div className="scroll-prompt-arrow-up"><div></div></div>
        </div>
      </div>
    );
}

export default UpwardArrow;