import React, {useState, useEffect} from 'react';
import StartMenu from './pages/StartMenu';

export default function GameContainer() {
    const [currentPage, setCurrentPage] = useState("StartMenu");

    const renderPage = () => {
        if (currentPage === "StartMenu") {
            return <StartMenu />;
        }
        if (currentPage === "BuildInfo") {
            return <BuildInfo />;
        }
    };

    return (
        <div>
            <Header />
            {renderPage()}
        </div>
    );
}
