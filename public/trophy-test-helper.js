// Script per resettare i trofei - da usare nella console del browser per i test
function resetTrophies() {
  localStorage.removeItem('user_trophies');
  localStorage.removeItem('visited_pages');
  window.location.reload();
}

// Funzione per simulare il completamento veloce del gioco
function simulateFastGameCompletion() {
  // Simula il completamento in 25 secondi (sotto i 30)
  console.log('Simulando completamento veloce del gioco...');
  // Questa funzione dovrebbe essere chiamata manualmente dopo aver giocato
}

console.log('Trophy testing helpers loaded:');
console.log('- resetTrophies(): Reset all trophies and reload page');
console.log('- simulateFastGameCompletion(): Log info about fast completion');
console.log('');
console.log('Per testare il completamento veloce:');
console.log('1. Chiamare resetTrophies() per iniziare da zero');
console.log('2. Completare il gioco in 30 secondi o meno');
console.log('3. Dovrebbero sbloccarsi sia "Maestro del Gioco" che "Demone della Velocità"');
console.log('');
console.log('Per testare il riempimento griglia:');
console.log('1. Giocare fino a riempire completamente la griglia');
console.log('2. Dovrebbe sbloccarsi "Riempitore di Griglie"');
