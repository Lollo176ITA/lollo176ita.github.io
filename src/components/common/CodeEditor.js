import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Build Button Component
function BuildButton() {
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildResult, setBuildResult] = useState(null);
  const [buildAttempts, setBuildAttempts] = useState(0);

  const handleBuild = () => {
    setIsBuilding(true);
    setBuildResult(null);
    
    const newAttempts = buildAttempts + 1;
    setBuildAttempts(newAttempts);

    // Simulate build process
    setTimeout(() => {
      let success = false;
      let message = '';
        if (newAttempts === 1) {
        // 80% failure rate on first attempt
        success = Math.random() < 0.2;
        message = success 
          ? "🎉 Hacking successful! You're in the mainframe!" 
          : "❌ Access denied! Firewall detected...";
      } else if (newAttempts === 2) {
        // 20% failure rate on second attempt  
        success = Math.random() < 0.8;
        message = success 
          ? "✅ Backdoor opened! Data extraction complete!" 
          : "❌ ICE detected! Abort mission!";
      } else {
        // Always works on third attempt or later
        success = true;
        message = "✅ System compromised! Welcome to the dark side!";
      }
        
      setBuildResult({ success, message });
      setIsBuilding(false);
      
      // If success, keep the result and hide the button (no reset)
      // If failure, user can retry with the same button
    }, Math.random() * 1000 + 1500);
  };

  return (
    <div className="flex items-center space-x-3">
      {isBuilding ? (
        <motion.div
          className="flex items-center text-yellow-400 text-sm font-mono"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-3 h-3 border border-yellow-400 border-t-transparent rounded-full mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />          <span>
            {buildAttempts === 1 ? "🔍 Scanning network..." : 
             buildAttempts === 2 ? "🔓 Bypassing security..." : "💻 Deploying payload..."}
          </span>
        </motion.div>
      ) : buildResult?.success ? (
        // Hide button after success
        null
      ) : (
        <motion.button
          onClick={handleBuild}
          className={`px-3 py-1 rounded text-xs font-mono transition-all ${
            buildAttempts === 0 
              ? 'bg-green-600 hover:bg-green-500 text-white'
              : buildAttempts === 1 
              ? 'bg-yellow-600 hover:bg-yellow-500 text-white'
              : 'bg-red-600 hover:bg-red-500 text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}        >
          {buildAttempts === 0 ? "Execute" : 
           buildAttempts === 1 ? "🔄 Retry Hack" : 
           "🙏 Final Attempt"}
        </motion.button>
      )}
      
      {buildResult && (
        <motion.span
          className={`text-xs font-mono ${
            buildResult.success ? 'text-green-400' : 'text-red-400'
          }`}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {buildResult.message}
        </motion.span>
      )}
      
      {buildAttempts > 0 && !isBuilding && !buildResult?.success && (
        <motion.span
          className="text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          #{buildAttempts}
        </motion.span>
      )}
    </div>
  );
}

// Main Code Editor Component
export default function CodeEditor() {
  
  // Add custom scrollbar styles to document head
  useEffect(() => {
    const styleId = 'custom-scrollbar-styles';
    
    // Remove existing styles if any
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Create new style element
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .code-editor-scroll::-webkit-scrollbar {
        height: 4px;
      }
      .code-editor-scroll::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 2px;
      }
      .code-editor-scroll::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        transition: background 0.2s ease;
      }
      .code-editor-scroll::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.4);
      }
      .code-editor-scroll {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.2) rgba(0, 0, 0, 0.1);
      }
      @media (max-width: 768px) {
        .code-editor-scroll::-webkit-scrollbar {
          display: none;
        }
        .code-editor-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      }
    `;
    
    document.head.appendChild(style);
    
    // Cleanup on unmount
    return () => {
      const styleToRemove = document.getElementById(styleId);
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, []);
  // Mock "dangerous" hacker code with advanced syntax highlighting
  const codeLines = [
    { 
      code: [
        { text: "import", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "{ useEffect, useState, useRef }", color: "text-blue-300" },
        { text: " ", color: "text-white" },
        { text: "from", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "'react'", color: "text-green-400" },
        { text: ";", color: "text-white" }
      ], 
      indent: 0 
    },
    { 
      code: [
        { text: "import", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "CryptoJS", color: "text-red-400" },
        { text: " ", color: "text-white" },
        { text: "from", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "'crypto-js'", color: "text-green-400" },
        { text: ";", color: "text-white" }
      ], 
      indent: 0 
    },
    { 
      code: [
        { text: "import", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "axios", color: "text-red-400" },
        { text: " ", color: "text-white" },
        { text: "from", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "'axios'", color: "text-green-400" },
        { text: ";", color: "text-white" }
      ], 
      indent: 0 
    },
    { code: [], indent: 0 },
    { 
      code: [
        { text: "// WARNING: This is totally not a script to hack your device", color: "text-gray-500" }
      ], 
      indent: 0 
    },
    { 
      code: [
        { text: "const", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "DEFINITELY_NOT_MALICIOUS_API", color: "text-red-400" },
        { text: " = ", color: "text-white" },
        { text: "'https://not-suspicious-at-all.com/api'", color: "text-green-400" },
        { text: ";", color: "text-white" }
      ], 
      indent: 0 
    },
    { code: [], indent: 0 },
    { 
      code: [
        { text: "function", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "TotallyLegitComponent", color: "text-yellow-300" },
        { text: "()", color: "text-white" },
        { text: " ", color: "text-white" },
        { text: "{", color: "text-white" }
      ], 
      indent: 0 
    },
    { 
      code: [
        { text: "const", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "[", color: "text-yellow-300" },
        { text: "userSecrets", color: "text-red-400" },
        { text: ",", color: "text-white" },
        { text: " ", color: "text-white" },
        { text: "setUserSecrets", color: "text-red-400" },
        { text: "]", color: "text-yellow-300" },
        { text: " = ", color: "text-white" },
        { text: "useState", color: "text-cyan-300" },
        { text: "(", color: "text-white" },
        { text: "[]", color: "text-orange-400" },
        { text: ");", color: "text-white" }
      ], 
      indent: 1 
    },
    { 
      code: [
        { text: "const", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "[", color: "text-yellow-300" },
        { text: "isHacking", color: "text-red-400" },
        { text: ",", color: "text-white" },
        { text: " ", color: "text-white" },
        { text: "setIsHacking", color: "text-red-400" },
        { text: "]", color: "text-yellow-300" },
        { text: " = ", color: "text-white" },
        { text: "useState", color: "text-cyan-300" },
        { text: "(", color: "text-white" },
        { text: "false", color: "text-orange-400" },
        { text: ");", color: "text-white" }
      ], 
      indent: 1 
    },
    { code: [], indent: 0 },
    { 
      code: [
        { text: "const", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "stealPersonalData", color: "text-red-400" },
        { text: " = ", color: "text-white" },
        { text: "async", color: "text-purple-400" },
        { text: " () => {", color: "text-white" }
      ], 
      indent: 1 
    },
    { 
      code: [
        { text: "try", color: "text-purple-400" },
        { text: " {", color: "text-white" }
      ], 
      indent: 2 
    },
    { 
      code: [
        { text: "// Definitely not accessing your browser storage", color: "text-gray-500" }
      ], 
      indent: 3 
    },
    { 
      code: [
        { text: "const", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "browserData", color: "text-red-400" },
        { text: " = ", color: "text-white" },
        { text: "await", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "navigator", color: "text-cyan-300" },
        { text: ".", color: "text-white" },
        { text: "getBattery", color: "text-yellow-300" },
        { text: "();", color: "text-white" }
      ], 
      indent: 3 
    },
    { 
      code: [
        { text: "const", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "encryptedData", color: "text-red-400" },
        { text: " = ", color: "text-white" },
        { text: "CryptoJS", color: "text-cyan-300" },
        { text: ".", color: "text-white" },
        { text: "AES", color: "text-yellow-300" },
        { text: ".", color: "text-white" },
        { text: "encrypt", color: "text-yellow-300" },
        { text: "(", color: "text-white" },
        { text: "JSON", color: "text-cyan-300" },
        { text: ".", color: "text-white" },
        { text: "stringify", color: "text-yellow-300" },
        { text: "(", color: "text-white" },
        { text: "browserData", color: "text-red-400" },
        { text: "), ", color: "text-white" },
        { text: "'secret-key'", color: "text-green-400" },
        { text: ");", color: "text-white" }
      ], 
      indent: 3 
    },
    { code: [], indent: 0 },
    { 
      code: [
        { text: "// Send to definitely legitimate server", color: "text-gray-500" }
      ], 
      indent: 3 
    },
    { 
      code: [
        { text: "await", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "axios", color: "text-cyan-300" },
        { text: ".", color: "text-white" },
        { text: "post", color: "text-yellow-300" },
        { text: "(", color: "text-white" },
        { text: "DEFINITELY_NOT_MALICIOUS_API", color: "text-red-400" },
        { text: ", {", color: "text-white" }
      ], 
      indent: 3 
    },
    { 
      code: [
        { text: "data", color: "text-cyan-300" },
        { text: ": ", color: "text-white" },
        { text: "encryptedData", color: "text-red-400" },
        { text: ",", color: "text-white" }
      ], 
      indent: 4 
    },
    { 
      code: [
        { text: "userAgent", color: "text-cyan-300" },
        { text: ": ", color: "text-white" },
        { text: "navigator", color: "text-red-400" },
        { text: ".", color: "text-white" },
        { text: "userAgent", color: "text-yellow-300" },
        { text: ",", color: "text-white" }
      ], 
      indent: 4 
    },
    { 
      code: [
        { text: "timestamp", color: "text-cyan-300" },
        { text: ": ", color: "text-white" },
        { text: "Date", color: "text-yellow-300" },
        { text: ".", color: "text-white" },
        { text: "now", color: "text-yellow-300" },
        { text: "()", color: "text-white" }
      ], 
      indent: 4 
    },
    { 
      code: [
        { text: "});", color: "text-white" }
      ], 
      indent: 3 
    },
    { 
      code: [
        { text: "}", color: "text-white" },
        { text: " ", color: "text-white" },
        { text: "catch", color: "text-purple-400" },
        { text: " (", color: "text-white" },
        { text: "error", color: "text-red-400" },
        { text: ") {", color: "text-white" }
      ], 
      indent: 2 
    },
    { 
      code: [
        { text: "console", color: "text-cyan-300" },
        { text: ".", color: "text-white" },
        { text: "log", color: "text-yellow-300" },
        { text: "(", color: "text-white" },
        { text: "'Hacking failed, try again later'", color: "text-green-400" },
        { text: ");", color: "text-white" }
      ], 
      indent: 3 
    },
    { 
      code: [
        { text: "}", color: "text-white" }
      ], 
      indent: 2 
    },
    { 
      code: [
        { text: "};", color: "text-white" }
      ], 
      indent: 1 
    },
    { code: [], indent: 0 },
    { 
      code: [
        { text: "useEffect", color: "text-yellow-300" },
        { text: "(() => {", color: "text-white" }
      ], 
      indent: 1 
    },
    { 
      code: [
        { text: "// Auto-execute when user isn't looking", color: "text-gray-500" }
      ], 
      indent: 2 
    },
    { 
      code: [
        { text: "document", color: "text-cyan-300" },
        { text: ".", color: "text-white" },
        { text: "addEventListener", color: "text-yellow-300" },
        { text: "(", color: "text-white" },
        { text: "'visibilitychange'", color: "text-green-400" },
        { text: ", () => {", color: "text-white" }
      ], 
      indent: 2 
    },
    { 
      code: [
        { text: "if", color: "text-purple-400" },
        { text: " (", color: "text-white" },
        { text: "document", color: "text-cyan-300" },
        { text: ".", color: "text-white" },
        { text: "hidden", color: "text-yellow-300" },
        { text: ") ", color: "text-white" },
        { text: "stealPersonalData", color: "text-red-400" },
        { text: "();", color: "text-white" }
      ], 
      indent: 3 
    },
    { 
      code: [
        { text: "});", color: "text-white" }
      ], 
      indent: 2 
    },
    { 
      code: [
        { text: "}, []);", color: "text-white" }
      ], 
      indent: 1 
    },
    { code: [], indent: 0 },
    { 
      code: [
        { text: "return", color: "text-purple-400" },
        { text: " (", color: "text-white" }
      ], 
      indent: 1 
    },
    { 
      code: [
        { text: "<", color: "text-gray-400" },
        { text: "div", color: "text-red-400" },
        { text: " ", color: "text-white" },
        { text: "className", color: "text-cyan-300" },
        { text: "=", color: "text-white" },
        { text: '"totally-innocent-component"', color: "text-green-400" },
        { text: ">", color: "text-gray-400" }
      ], 
      indent: 2 
    },
    { 
      code: [
        { text: "<", color: "text-gray-400" },
        { text: "h1", color: "text-red-400" },
        { text: ">", color: "text-gray-400" },
        { text: "Welcome! Nothing suspicious here!", color: "text-white" },
        { text: "</", color: "text-gray-400" },
        { text: "h1", color: "text-red-400" },
        { text: ">", color: "text-gray-400" }
      ], 
      indent: 3 
    },
    { 
      code: [
        { text: "{", color: "text-yellow-300" },
        { text: "isHacking", color: "text-red-400" },
        { text: " && ", color: "text-white" },
        { text: "<", color: "text-gray-400" },
        { text: "div", color: "text-red-400" },
        { text: ">", color: "text-gray-400" },
        { text: "Accessing your files...", color: "text-white" },
        { text: "</", color: "text-gray-400" },
        { text: "div", color: "text-red-400" },
        { text: ">", color: "text-gray-400" },
        { text: "}", color: "text-yellow-300" }
      ], 
      indent: 3 
    },
    { 
      code: [
        { text: "</", color: "text-gray-400" },
        { text: "div", color: "text-red-400" },
        { text: ">", color: "text-gray-400" }
      ], 
      indent: 2 
    },
    { 
      code: [
        { text: ");", color: "text-white" }
      ], 
      indent: 1 
    },
    { 
      code: [
        { text: "}", color: "text-white" }
      ], 
      indent: 0 
    },
    { code: [], indent: 0 },
    { 
      code: [
        { text: "export", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "default", color: "text-purple-400" },
        { text: " ", color: "text-white" },
        { text: "TotallyLegitComponent", color: "text-yellow-300" },
        { text: ";", color: "text-white" }
      ], 
      indent: 0 
    }
  ];
  return (
    <motion.div
      className="bg-gray-900 rounded-lg p-3 md:p-6 font-mono text-xs md:text-sm overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 md:mb-4 pb-2 border-b border-gray-700">
        <div className="flex items-center space-x-1 md:space-x-2">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-gray-400 text-xs hidden sm:inline">NotAScriptToHackYourDevice.jsx</span>
        <span className="text-gray-400 text-xs sm:hidden">hack.jsx</span>
      </div>      {/* Code content */}
      <div className="text-left overflow-x-auto code-editor-scroll">
        {codeLines.map((line, i) => (
          <motion.div
            key={i}
            className="flex items-start min-w-max"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.08 }}
          >
            <span className="text-gray-600 text-xs w-6 md:w-8 text-right mr-2 md:mr-4 mt-0.5 flex-shrink-0">
              {line.code.length > 0 ? i + 1 : ''}
            </span>            <div 
              style={{ paddingLeft: `${line.indent * 12}px` }} 
              className="whitespace-pre flex-1"
            >
              {line.code.map((token, tokenIndex) => (
                <motion.span
                  key={tokenIndex}
                  className={token.color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 + i * 0.08 + tokenIndex * 0.01 }}
                >
                  {token.text}
                </motion.span>
              ))}
            </div>
            {line.code.length > 0 && i % 7 === 6 && (
              <motion.div
                className="w-1 h-1 bg-red-400 rounded-full ml-2 mt-2 flex-shrink-0"
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [1, 1.5, 1]
                }}
                transition={{ 
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Build Button integrated in the terminal */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-700 space-y-2 sm:space-y-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0 }}
      >
        <div className="flex flex-wrap space-x-2 md:space-x-4 text-xs md:text-sm">
          <span className="text-red-400">💀 Malware</span>
          <span className="text-yellow-400">🔐 Crypto</span>
          <span className="text-blue-400">🌐 Network</span>
          <span className="text-purple-400 hidden sm:inline">🎭 Stealth</span>
        </div>
        <BuildButton />
      </motion.div>
    </motion.div>
  );
}
