import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useTrophies } from '../common/TrophySystem';

export default function AnimatedGrid() {
    const [gameStarted, setGameStarted] = useState(false);
    const [gridItems, setGridItems] = useState(Array.from({ length: 81 }, (_, index) => ({ id: index, letter: '' })));
    const [currentLetter, setCurrentLetter] = useState('A');
    const [selectedCell, setSelectedCell] = useState(null);
    const [gameStartTime, setGameStartTime] = useState(null);
    const dragStartRef = useRef(null);
    const { t } = useTranslation();
    const { completeGame, fillGrid } = useTrophies();

    const handleStartGame = () => {
        setGameStarted(true);
        setGameStartTime(Date.now());
        setInitialLetters();
    };

    const setInitialLetters = () => {
        // Set 2 random cells to the current letter, only in empty cells
        const updatedGrid = [...gridItems];
        const emptyCells = updatedGrid
            .map((item, index) => ({ ...item, index }))
            .filter(item => item.letter === '')
            .map(item => item.index);
        
        // Controlla se la griglia è completamente piena (tutti i 81 celle hanno una lettera)
        if (emptyCells.length === 0) {
            // Griglia completamente piena! Sblocca il trofeo
            console.log('Griglia completamente piena! Sbloccando trofeo Grid Filler...');
            fillGrid();
            setGameStarted(false);
            return;
        }
        
        if (emptyCells.length < 2) {
            // Non abbastanza celle vuote, il gioco dovrebbe finire
            setGameStarted(false);
            return;
        }
        
        const randomIndices = [];
        while (randomIndices.length < 2) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const cellIndex = emptyCells[randomIndex];
            if (!randomIndices.includes(cellIndex)) {
                randomIndices.push(cellIndex);
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
        } 
        else if (selectedCell === index) {
        // Deselect on clicking same cell
        setSelectedCell(null);
        }
        else {
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
                const gameEndTime = Date.now();
                const gameTimeInSeconds = (gameEndTime - gameStartTime) / 1000;
                completeGame(gameTimeInSeconds);
                setTimeout(() => {
                    document.getElementById('game-container').classList.add('blur-sm', 'pointer-events-none');
                }, 50);
            } else {
                // Set 2 new random cells to 'A'
                setTimeout(() => {
                    setInitialLetters();
                    // Controlla se la griglia è piena dopo aver aggiunto le nuove celle
                    setTimeout(() => {
                        const filledCells = gridItems.filter(item => item.letter !== '').length;
                        console.log(`Celle piene dopo aggiunta nuove celle: ${filledCells}/81`);
                        if (filledCells === 81) {
                            console.log('Griglia completamente piena dopo aggiunta nuove celle! Sbloccando trofeo Grid Filler...');
                            fillGrid();
                        }
                    }, 50);
                }, 200);
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
        <div className="lg:w-1/2 flex flex-col items-center relative mb-10">
            <p className="text-2xl font-bold text-center mb-4 font-inter">
                <Link
                    to={gameStarted || currentLetter !== 'D' ? '#' : '/creations'} // Evita la navigazione se la condizione non è soddisfatta
                    onClick={(e) => {
                        if (currentLetter !== 'D') e.preventDefault(); // Evita la navigazione
                        if (!gameStarted && currentLetter !== 'D') handleStartGame(); // Avvia il gioco
                    }}
                    className={`text-black dark:text-white mb-4 px-2 py-1 rounded-lg ${
                        gameStarted || currentLetter === 'D'
                            ? 'cursor-not-allowed'
                            : 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
                    }`}
                    style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}
                >
                    {!gameStarted && currentLetter === 'D'
                        ? t('grid.thanks')
                        : !gameStarted
                        ? t('grid.clickDemo')
                        : t('grid.enjoyDemo')}
                </Link>
            </p>
            <div id="game-container" className="grid grid-cols-9 gap-1 relative z-10">
                {gridItems.map((item, index) => (
                    <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => handleCellClick(item.id)}
                        onMouseDown={() => handleDragStart(item.id)}
                        onMouseUp={() => handleDragEnd(item.id)}
                        aria-label={item.letter || t('grid.emptyCell', { defaultValue: 'Empty cell' })}
                        className={`w-8 h-8 bg-gray-300 rounded-md flex items-center justify-center dark:text-black cursor-pointer select-none ${
                            selectedCell === item.id ? 'ring-2 ring-blue-500' : ''
                        } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            delay: generateSpiralDelay(index), // Improved spiral effect
                            duration: 0.2,
                        }}
                        style={{
                            fontFamily: 'Arial, sans-serif',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                        }}
                    >
                        {item.letter}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}    
