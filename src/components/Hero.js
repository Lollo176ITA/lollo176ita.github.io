import React from "react";
import HeroText from "./HeroText";
import AnimatedGrid from "./AnimatedGrid";

export default function Hero() {
    return (
        <div className="container mx-auto">
            <section className="min-h-screen flex flex-col lg:flex-row justify-between pt-20 mt-16 bg-white text-black px-8 mb-auto">
                <HeroText />
                <AnimatedGrid />
            </section>
        </div>
    );
}
