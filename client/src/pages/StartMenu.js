import React from "react";
import { Link } from "react-router-dom";

export default function StartMenu() {
    return(
        <div>
            <div className="startHeader">
            <h1>Pokemon Not</h1>
            </div>
            <div className="startBtn">
                <Link to="/MoveList">
                    <button type="button" className="btn btn-primary">Start</button>
                </Link>
            </div>
        </div>
    );
}