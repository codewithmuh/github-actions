"""
Tests for Flask API
"""
import json
import pytest
from app import create_app, add_numbers, validate_email


@pytest.fixture
def app():
    """Create test app"""
    app = create_app()
    app.config['TESTING'] = True
    return app


@pytest.fixture
def client(app):
    """Create test client"""
    return app.test_client()


class TestHomeEndpoints:
    """Test home and health endpoints"""
    
    def test_home_endpoint(self, client):
        """Test home endpoint"""
        response = client.get('/')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        assert 'message' in data
        assert 'Python Flask' in data['message']
        assert 'version' in data
        assert 'timestamp' in data
    
    def test_health_endpoint(self, client):
        """Test health check endpoint"""
        response = client.get('/health')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        assert data['status'] == 'healthy'
        assert 'timestamp' in data
        assert 'python_version' in data


class TestUserEndpoints:
    """Test user CRUD endpoints"""
    
    def test_get_users(self, client):
        """Test getting all users"""
        response = client.get('/api/users')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0
        assert 'id' in data[0]
        assert 'name' in data[0]
        assert 'email' in data[0]
    
    def test_get_user_by_id(self, client):
        """Test getting specific user"""
        response = client.get('/api/users/1')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        assert data['id'] == 1
        assert 'name' in data
        assert 'email' in data
    
    def test_get_nonexistent_user(self, client):
        """Test getting non-existent user"""
        response = client.get('/api/users/999')
        assert response.status_code == 404
        
        data = json.loads(response.data)
        assert 'error' in data
    
    def test_create_user(self, client):
        """Test creating new user"""
        new_user = {
            'name': 'Test User',
            'email': 'test@example.com',
            'role': 'user'
        }
        
        response = client.post('/api/users', 
                             data=json.dumps(new_user),
                             content_type='application/json')
        assert response.status_code == 201
        
        data = json.loads(response.data)
        assert data['name'] == new_user['name']
        assert data['email'] == new_user['email']
        assert 'id' in data
        assert 'created_at' in data
    
    def test_create_user_missing_fields(self, client):
        """Test creating user with missing required fields"""
        incomplete_user = {'name': 'Test User'}
        
        response = client.post('/api/users',
                             data=json.dumps(incomplete_user),
                             content_type='application/json')
        assert response.status_code == 400
        
        data = json.loads(response.data)
        assert 'error' in data
    
    def test_update_user(self, client):
        """Test updating existing user"""
        update_data = {'name': 'Updated Name'}
        
        response = client.put('/api/users/1',
                            data=json.dumps(update_data),
                            content_type='application/json')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        assert data['name'] == update_data['name']
        assert 'updated_at' in data
    
    def test_update_nonexistent_user(self, client):
        """Test updating non-existent user"""
        update_data = {'name': 'Updated Name'}
        
        response = client.put('/api/users/999',
                            data=json.dumps(update_data),
                            content_type='application/json')
        assert response.status_code == 404
    
    def test_delete_user(self, client):
        """Test deleting user"""
        response = client.delete('/api/users/2')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        assert 'message' in data
        assert 'user' in data
    
    def test_delete_nonexistent_user(self, client):
        """Test deleting non-existent user"""
        response = client.delete('/api/users/999')
        assert response.status_code == 404


class TestUtilityFunctions:
    """Test utility functions"""
    
    def test_add_numbers(self):
        """Test add_numbers function"""
        assert add_numbers(2, 3) == 5
        assert add_numbers(-1, 1) == 0
        assert add_numbers(0.5, 0.5) == 1.0
    
    def test_validate_email(self):
        """Test email validation"""
        assert validate_email('test@example.com') is True
        assert validate_email('user@domain.org') is True
        assert validate_email('invalid-email') is False
        assert validate_email('no-at-sign.com') is False
        assert validate_email('no-domain@') is False


class TestErrorHandlers:
    """Test error handlers"""
    
    def test_404_handler(self, client):
        """Test 404 error handler"""
        response = client.get('/nonexistent-endpoint')
        assert response.status_code == 404
        
        data = json.loads(response.data)
        assert 'error' in data