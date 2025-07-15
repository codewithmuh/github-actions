import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddUser from '../AddUser';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock API service
jest.mock('../../services/api', () => ({
  createUser: jest.fn(),
}));

const { createUser } = require('../../services/api');

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('AddUser Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields', () => {
    renderWithRouter(<AddUser />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    expect(screen.getByText('Create User')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('updates form fields when typing', () => {
    renderWithRouter(<AddUser />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(nameInput.value).toBe('Test User');
    expect(emailInput.value).toBe('test@example.com');
  });

  test('shows error for empty required fields', async () => {
    renderWithRouter(<AddUser />);
    
    const submitButton = screen.getByText('Create User');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Name and email are required')).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com', role: 'user' };
    createUser.mockResolvedValue(mockUser);
    
    const mockOnUserAdded = jest.fn();
    renderWithRouter(<AddUser onUserAdded={mockOnUserAdded} />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByText('Create User');
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        role: 'user'
      });
    });
    
    await waitFor(() => {
      expect(screen.getByText('User created successfully! Redirecting...')).toBeInTheDocument();
    });
    
    expect(mockOnUserAdded).toHaveBeenCalledWith(mockUser);
  });

  test('handles API error', async () => {
    createUser.mockRejectedValue(new Error('API Error'));
    
    renderWithRouter(<AddUser />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByText('Create User');
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to create user. Please try again.')).toBeInTheDocument();
    });
  });

  test('navigates to users page when cancel clicked', () => {
    renderWithRouter(<AddUser />);
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/users');
  });

  test('disables form during submission', async () => {
    createUser.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    renderWithRouter(<AddUser />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByText('Create User');
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Creating...')).toBeInTheDocument();
    expect(nameInput).toBeDisabled();
    expect(emailInput).toBeDisabled();
  });
});