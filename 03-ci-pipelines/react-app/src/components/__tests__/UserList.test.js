import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserList from '../UserList';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
];

describe('UserList Component', () => {
  test('displays loading state', () => {
    renderWithRouter(
      <UserList users={[]} loading={true} error={null} onRefresh={() => {}} />
    );
    
    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  test('displays error state with retry button', () => {
    const mockRefresh = jest.fn();
    
    renderWithRouter(
      <UserList 
        users={[]} 
        loading={false} 
        error="Failed to load users" 
        onRefresh={mockRefresh} 
      />
    );
    
    expect(screen.getByText('Failed to load users')).toBeInTheDocument();
    
    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);
    expect(mockRefresh).toHaveBeenCalled();
  });

  test('displays users when loaded', () => {
    renderWithRouter(
      <UserList 
        users={mockUsers} 
        loading={false} 
        error={null} 
        onRefresh={() => {}} 
      />
    );
    
    expect(screen.getByText('Users (2)')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  test('displays empty state when no users', () => {
    renderWithRouter(
      <UserList 
        users={[]} 
        loading={false} 
        error={null} 
        onRefresh={() => {}} 
      />
    );
    
    expect(screen.getByText('Users (0)')).toBeInTheDocument();
    expect(screen.getByText('No users found.')).toBeInTheDocument();
  });

  test('calls refresh function when refresh button clicked', () => {
    const mockRefresh = jest.fn();
    
    renderWithRouter(
      <UserList 
        users={mockUsers} 
        loading={false} 
        error={null} 
        onRefresh={mockRefresh} 
      />
    );
    
    const refreshButton = screen.getByText('Refresh');
    fireEvent.click(refreshButton);
    expect(mockRefresh).toHaveBeenCalled();
  });

  test('renders view details links', () => {
    renderWithRouter(
      <UserList 
        users={mockUsers} 
        loading={false} 
        error={null} 
        onRefresh={() => {}} 
      />
    );
    
    const viewDetailsLinks = screen.getAllByText('View Details');
    expect(viewDetailsLinks).toHaveLength(2);
  });
});