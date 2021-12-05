import React from "react";
import BlocksSection from "./BlocksSection.jsx";
import Info from "./Info.jsx";

function Main() {
    return (
        <main className="main">
            <section className="section">
                <h1 className="section-title">Constrtuctor</h1>
                <Info />
                <BlocksSection />
            </section>
        </main>
    );
}

export default Main;
