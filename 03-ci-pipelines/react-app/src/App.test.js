import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the API service
jest.mock('./services/api', () => ({
  getUsers: jest.fn(() => Promise.resolve([
    { id: 1, name: 'Test User', email: 'test@example.com', role: 'user' }
  ]))
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('App Component', () => {
  test('renders app header', () => {
    renderWithRouter(<App />);
    const headerElement = screen.getByText(/React CI\/CD Demo/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderWithRouter(<App />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Add User')).toBeInTheDocument();
  });

  test('renders welcome message on home page', () => {
    renderWithRouter(<App />);
    
    const welcomeMessage = screen.getByText(/Welcome to React CI\/CD Demo!/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('displays user count after loading', async () => {
    renderWithRouter(<App />);
    
    await waitFor(() => {
      const userCount = screen.getByText('1');
      expect(userCount).toBeInTheDocument();
    });
  });

  test('renders footer', () => {
    renderWithRouter(<App />);
    
    const footer = screen.getByText(/Built with React • GitHub Actions CI\/CD • Version 1.0.0/i);
    expect(footer).toBeInTheDocument();
  });
});