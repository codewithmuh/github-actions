"""
Flask API for GitHub Actions CI/CD demonstration
"""
import os
from datetime import datetime
from typing import Dict, List, Optional

from flask import Flask, jsonify, request
from flask_cors import CORS


def create_app() -> Flask:
    """Create and configure Flask application"""
    app = Flask(__name__)
    CORS(app)
    
    # Configuration
    app.config['DEBUG'] = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    app.config['TESTING'] = False
    
    return app


app = create_app()

# Sample data
users_data = [
    {"id": 1, "name": "Alice Johnson", "email": "alice@example.com", "role": "admin"},
    {"id": 2, "name": "Bob Smith", "email": "bob@example.com", "role": "user"},
    {"id": 3, "name": "Carol Davis", "email": "carol@example.com", "role": "user"},
]


@app.route('/')
def home() -> Dict:
    """Home endpoint"""
    return jsonify({
        "message": "🐍 Hello from Python Flask CI/CD Demo!",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat(),
        "environment": os.getenv('FLASK_ENV', 'development')
    })


@app.route('/health')
def health_check() -> Dict:
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "python_version": os.sys.version.split()[0]
    })


@app.route('/api/users', methods=['GET'])
def get_users() -> List[Dict]:
    """Get all users"""
    return jsonify(users_data)


@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id: int) -> Dict:
    """Get specific user by ID"""
    user = next((u for u in users_data if u["id"] == user_id), None)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user)


@app.route('/api/users', methods=['POST'])
def create_user() -> Dict:
    """Create new user"""
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    required_fields = ['name', 'email']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    new_user = {
        "id": max([u["id"] for u in users_data]) + 1 if users_data else 1,
        "name": data["name"],
        "email": data["email"],
        "role": data.get("role", "user"),
        "created_at": datetime.utcnow().isoformat()
    }
    
    users_data.append(new_user)
    return jsonify(new_user), 201


@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id: int) -> Dict:
    """Update existing user"""
    user = next((u for u in users_data if u["id"] == user_id), None)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    # Update user fields
    for field in ['name', 'email', 'role']:
        if field in data:
            user[field] = data[field]
    
    user['updated_at'] = datetime.utcnow().isoformat()
    return jsonify(user)


@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id: int) -> Dict:
    """Delete user"""
    user_index = next((i for i, u in enumerate(users_data) if u["id"] == user_id), None)
    if user_index is None:
        return jsonify({"error": "User not found"}), 404
    
    deleted_user = users_data.pop(user_index)
    return jsonify({"message": "User deleted", "user": deleted_user})


@app.errorhandler(404)
def not_found(error) -> Dict:
    """Handle 404 errors"""
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(500)
def internal_error(error) -> Dict:
    """Handle 500 errors"""
    return jsonify({"error": "Internal server error"}), 500


def add_numbers(a: float, b: float) -> float:
    """Simple function for testing"""
    return a + b


def validate_email(email: str) -> bool:
    """Simple email validation"""
    return "@" in email and "." in email.split("@")[1]


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=app.config['DEBUG'])