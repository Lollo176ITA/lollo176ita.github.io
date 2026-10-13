import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import App from './App';

// Helper: renderizza App con tutti i provider necessari (stessa struttura di index.js)
function renderApp() {
  return render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

test('renders without crashing', () => {
  renderApp();
  // L'app non deve mostrare l'errore boundary
  expect(screen.queryByText(/errore di caricamento/i)).not.toBeInTheDocument();
});

test('renders main hero heading', () => {
  renderApp();
  // Il titolo e' spezzato in piu' elementi ("Web", "&", "Game Developer")
  // Quindi verifica con getAllByText o con una parte non spezzata
  expect(screen.getByText(/Game Developer/i)).toBeInTheDocument();
});
