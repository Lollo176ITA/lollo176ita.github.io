import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function AnimatedGrid() {
    const [gameStarted, setGameStarted] = useState(false);
    const [gridItems, setGridItems] = useState(Array.from({ length: 81 }, (_, index) => ({ id: index, letter: '' })));
    const [currentLetter, setCurrentLetter] = useState('A');
    const [selectedCell, setSelectedCell] = useState(null);
    const dragStartRef = useRef(null);

    const handleStartGame = () => {
        setGameStarted(true);
        setInitialLetters();
    };

    const setInitialLetters = () => {
        // Set 2 random cells to the current letter
        const updatedGrid = [...gridItems];
        const randomIndices = [];
        while (randomIndices.length < 2) {
            const randomIndex = Math.floor(Math.random() * 81);
            if (!randomIndices.includes(randomIndex)) {
                randomIndices.push(randomIndex);
            }
        }
        randomIndices.forEach(index => {
            updatedGrid[index].letter = "A";
        });
        setGridItems(updatedGrid);
    };

    const handleCellClick = (index) => {
        if (!gameStarted) return;
        if (selectedCell === null) {
            setSelectedCell(index);
        } else {
            mergeCells(selectedCell, index);
            setSelectedCell(null);
        }
    };

    const handleDragStart = (index) => {
        if (gameStarted && gridItems[index].letter !== '') {
            dragStartRef.current = index;
        }
    };

    const handleDragEnd = (index) => {
        if (dragStartRef.current !== null && dragStartRef.current !== index) {
            mergeCells(dragStartRef.current, index);
            dragStartRef.current = null;
        }
    };

    const mergeCells = (index1, index2) => {
        const item1 = gridItems[index1];
        const item2 = gridItems[index2];
        if (item1.letter !== '' && item1.letter === item2.letter) {
            // Merge the two cells to get the next letter
            const nextLetter = String.fromCharCode(item1.letter.charCodeAt(0) + 1);
            const updatedGrid = [...gridItems];
            updatedGrid[index1].letter = nextLetter;
            updatedGrid[index2].letter = '';
            setGridItems(updatedGrid);

            // Update current letter if merging the highest letter
            if (nextLetter > currentLetter) {
                setCurrentLetter(nextLetter);
            }

            if (nextLetter === 'D') {
                // Stop the game and change message, blur grid
                setGameStarted(false);
                setTimeout(() => {
                    document.getElementById('game-container').classList.add('blur-sm', 'pointer-events-none');
                }, 200);
            } else {
                // Set 2 new random cells to 'A'
                setTimeout(() => setInitialLetters(), 200);
            }
        }
    };

    const generateSpiralDelay = (index) => {
        // Updated spiral order for a more evident spiral effect
        const spiralOrder = [
            0,  1,  2,  3,  4,  5,  6,  7,  8,   // Top row (left to right)
            17, 26, 35, 44, 53, 62, 71, 80,       // Right column (top to bottom)
            79, 78, 77, 76, 75, 74, 73, 72,       // Bottom row (right to left)
            63, 54, 45, 36, 27, 18,  9,           // Left column (bottom to top)
            10, 11, 12, 13, 14, 15, 16,           // Second row (left to right)
            25, 34, 43, 52, 61, 70,               // Second right column (top to bottom)
            69, 68, 67, 66, 65, 64,               // Second bottom row (right to left)
            55, 46, 37, 28, 19,                   // Second left column (bottom to top)
            20, 21, 22, 23, 24,                   // Center row (left to right)
            33, 42, 51, 60,                       // Third right column (top to bottom)
            59, 58, 57, 56,                       // Third bottom row (right to left)
            47, 38, 29,                           // Third left column (bottom to top)
            30, 31, 32,                           // Center row (left to right)
            41, 50,                               // Fourth right column (top to bottom)
            49, 48,                               // Fourth bottom row (right to left)
            39                                   // Center
        ];
        return spiralOrder.indexOf(index) * 0.02;
    };

    return (
        <div className="lg:w-1/2 flex flex-col items-center relative">
            <p className="text-2xl font-bold text-center mb-4 font-inter">
            <a 
                href="https://example.com" 
                onClick={(e) => {
                    if (currentLetter !== 'D') e.preventDefault();
                    if (!gameStarted && currentLetter !== 'D') handleStartGame();
                }}
                className={`text-black mb-4   px-2 py-1 rounded-lg ${gameStarted || currentLetter === 'D' ? 'cursor-not-allowed' : 'hover:bg-black hover:text-white'}`}
                style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}
            >
                {!gameStarted && currentLetter === 'D' ? 'Thanks for playing! (Click me to see the full game)' : !gameStarted ? 'Click me to try the demo!' : 'Enjoy the demo!'}
            </a>
            </p>
            <div id="game-container" className="grid grid-cols-9 gap-1 relative z-10">
                {gridItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        onClick={() => handleCellClick(item.id)}
                        onMouseDown={() => handleDragStart(item.id)}
                        onMouseUp={() => handleDragEnd(item.id)}
                        className={`w-8 h-8 bg-gray-300 rounded-md flex items-center justify-center cursor-pointer ${selectedCell === item.id ? 'ring-2 ring-blue-500' : ''}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            delay: generateSpiralDelay(index), // Improved spiral effect
                            duration: 0.2,
                        }}
                        style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '1.5rem' }}
                    >
                        {item.letter}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
