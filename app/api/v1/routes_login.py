"""
routes_auth.py

This module defines Flask routes for user authentication, including login 
and logout functionality, using JWT for session management. It handles 
user authentication and session termination in a secure manner.

Classes:
    Login (Resource): Handles user authentication by verifying credentials
        and issuing a JWT token upon successful login.
    Logout (Resource): Handles user logout by clearing session cookies to 
        invalidate the current session.

Attributes:
    login_bp (Blueprint): Flask blueprint for authentication routes.
    api (Namespace): Namespace for authentication-related API endpoints.
    login_model (model): Model schema for login request payload, requiring
        email and password fields.

Models:
    login_model (model): API model representing login attributes, specifically
        email and password, required for user authentication.
"""

from flask import Blueprint, current_app, request, abort, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import create_access_token, jwt_required  # type: ignore
from datetime import timedelta


login_bp = Blueprint('login', __name__)
api = Namespace('auth', description='Authentication operations')

login_model = api.model('Login', {
    'email': fields.String(required=True, description='User email', example="johnny.rocker@gmail.com"),
    'password': fields.String(required=True, description='User password', example="mypassword")
})


@api.route('/login')
class Login(Resource):
    """Resource for authenticating users and generating a JWT token for authorization."""

    @api.expect(login_model)
    def post(self):
        """
        Authenticates a user based on provided email and password.

        Expects:
            JSON payload containing `email` and `password` fields.

        Returns:
            dict: JSON response containing the JWT `access_token` if
            authentication is successful.

        Raises:
            ValueError: If credentials are invalid or user is not found.
            HTTP 400: If any error occurs during authentication.
        """
        facade = current_app.extensions['HBNB_FACADE']
        credentials = request.get_json()

        try:
            user = facade.user_facade.get_user_by_email(credentials["email"])

            for user in user:
                if not user or not user.verify_password(
                        credentials["password"]):
                    raise ValueError("Error: invalid credentials")

            access_token = create_access_token(
                identity={'id': str(user.id), 'is_admin': user.is_admin}, expires_delta=timedelta(days=1))

        except ValueError as e:
            abort(400, str(e))

        return {
            'access_token': access_token,
            'user_id': str(user.id)
        }, 200

@api.route('/logout')
class Logout(Resource):
    """
    Endpoint to handle user logout.

    This endpoint allows users to log out by invalidating their current session. 
    It clears the JWT token and user ID from the client's cookies, effectively 
    ending the user's session.

    Methods:
        post: Handles the logout request and clears the session cookies.

    Returns:
        Response: A JSON response with a success message and cleared cookies.
    """
    @jwt_required()
    def post(self):
        """
        Handle POST request to log out the user.

        This method removes the JWT token and user ID from the cookies by setting 
        them to an empty string and expiring them immediately.

        Returns:
            Response: A JSON response with a message indicating successful logout.
        """
        response = jsonify({"msg": "Logout successful"})
        response.set_cookie('jwt_token', '', expires=0)
        response.set_cookie('user_id', '', expires=0)
        return response
