"""
Front-End Controller Module

This module defines routes for rendering HTML templates associated with 
the front-end of the application. It provides endpoints for serving various 
pages such as the home page, place details, login page, and the add review page.

Blueprints:
    home_bp (Blueprint): A Flask blueprint for front-end related routes.

Routes:
    /HBnB: Renders the main home page.
    /place: Renders the place details page.
    /login: Renders the login page.
    /add_review: Renders the add review page.
"""

from flask import Blueprint, render_template

home_bp = Blueprint('home', __name__)


# @home_bp.route('/')
# def home():
#     """
#     Renders the main home page.

#     Returns:
#         Response: The HTML content of the home page.
#     """
#     return render_template('index.html')

# @home_bp.route('/place')
# def home_place():
#     """
#     Renders the place details page.

#     Returns:
#         Response: The HTML content of the place details page.
#     """
#     return render_template('place.html')

# @home_bp.route('/login')
# def home_login():
#     """
#     Renders the login page.

#     Returns:
#         Response: The HTML content of the login page.
#     """
#     return render_template('login.html')

# @home_bp.route('/logout')
# def home_logout():
#     """
#     Renders the add review page.

#     Returns:
#         Response: The HTML content of the add review page.
#     """
#     return render_template('logout.html')

@home_bp.route('/')
def home():
    return render_template('index.html', current_page='places')

@home_bp.route('/place')
def home_place():
    return render_template('place_details.html', current_page='place-details')

@home_bp.route('/login')
def home_login():
    return render_template('login.html', current_page='login')

@home_bp.route('/register_user')
def home_register_new_user():
    return render_template('register_new_user.html', current_page='register_user')

@home_bp.route('/register_place')
def home_register_new_place():
    return render_template('register_new_place.html', current_page='register-place')

@home_bp.route('/<user_id>/my_account')
def home_user_account(user_id):
    return render_template('user_account.html', current_page='user_places')

@home_bp.route('/places/<place_id>/update_place')
def home_update_place(place_id):
    return render_template('update_place.html', current_page='update_place')

@home_bp.route('/reviews/<place_id>/<review_id>/update_review')
def home_update_review(place_id, review_id):
    return render_template('update_review.html', current_page='update_review')

@home_bp.route('/update_user_datas')
def home_update_user_account():
    return render_template('update_user_datas.html', current_page='update_user_datas')