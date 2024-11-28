# **HBnB_App**

HBnB is a web-based application that allows users to explore places, add reviews, and manage amenities, places, and users. 
<br> The app includes both a front-end interface and a RESTful API for backend operations.

---

![alt text](<images/Capture d’écran 2024-11-18 à 11.59.35.png>)

![alt text](<images/Capture d’écran 2024-11-18 à 12.00.32.png>)

![alt text](<images/Capture d’écran 2024-11-18 à 12.01.26.png>)

![alt text](<images/Capture d’écran 2024-11-18 à 12.01.42.png>)

![alt text](<images/Capture d’écran 2024-11-18 à 12.02.27.png>)

---

## **Features**

### Frontend
- **Homepage (`/HBnB`)**: Displays a list of available places with their details.
- **Place Details (`/HBnB/place?id=****`)**: Displays specific place details, allows users to add reviews, and view reviews left by others.
- **Login (`/HBnB/login`)**: Users can log in to access protected features.
- **Add Review (`/HBnB/place?id=****`)**: Authenticated users can add reviews to places.

### Backend
- **User Management**: Create, read, update, and delete user accounts.
- **Place Management**: Add and manage places, including details like price and location.
- **Review Management**: Users can post reviews and ratings for places.
- **Amenity Management**: Manage amenities associated with places.
- **Authentication**: User login and logout functionality with JWT-based authentication.
- **Blueprints and RESTful API**: Structured backend with modular routes for frontend and API namespaces.

---

## **Setup Instructions**

### Prerequisites
- Python 3.10+
- Flask
- Node.js (for managing static files, if necessary)
- A compatible database (e.g., SQLite or PostgreSQL)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/HolbieWan/Holbertonschool_New_HBnB_Part3_FronEnd.git
   cd Holbertonschool_New_HBnB_Part3_FronEnd
   ```
2.	**Create a Virtual Environment**
    ```bash
    python3 -m venv HBnBenv
    source HBnBenv/bin/activate
    ```
3.	**Install Dependencies**
    ```bash
    pip install -r requirements.txt
    ````
4. **Configure Environment Variables**
    ```bash
    export FLASK_ENV=development
    export REPO_TYPE=in_file (or in_DB)
    export PYTHONPATH=/root/Holbertonschool_New_HBnB_Part3_FronEnd:$PYTHONPATH
    ```

5.	**Set Up the Database**
+ Create and configure the database if not present or want to start fresh.. :

    ```bash
    flask db init
    flask db migrate -m "Initial migration"
    flask db upgrade
    ````
6. **Create a Superuser for admin rigths**
    ```bash
    python3 utils/manage.py create_superuser

    or with CLI:

    python3 utils/manage.py create_superuser
    ```
7.	**Start the Development Server**

    ```bash
    python3 run.py
    ```
8.	**Navigate to the App**
+ Open your browser and visit:
+ Frontend: http://127.0.0.1:5000/HBnB
+ API Docs: http://127.0.0.1:5000

9. **Testing**

+ Run coverage with  unittests:

    ```bash
    coverage run --source=app -m unittest discover tests
    ```

+ Generate and View Coverage Report:

    ```bash
    coverage report -m
    ```
+ If you want an HTML report for easier analysis, run:

    ```bash
    coverage html
    ```
    then open html file in your browser
---

## **Folder Structure**

```bash
HOLBERTONSCHOOL_NEW_HBNB_PART3_FRONTEND/
├── app/
│   ├── __pycache__/
│   ├── api/
│   │   ├── __pycache__/
│   │   ├── v1/
│   │   │   ├── __pycache__/
│   │   │   ├── __init__.py
│   │   │   ├── routes_amenities.py
│   │   │   ├── routes_FrontEnd.py
│   │   │   ├── routes_login.py
│   │   │   ├── routes_places.py
│   │   │   ├── routes_reviews.py
│   │   │   └── routes_users.py
│   │   └── __init__.py
│   ├── models/
│   ├── persistence/
│   │   ├── __pycache__/
│   │   ├── __init__.py
│   │   ├── repo_selector.py
│   │   └── repository.py
│   ├── services/
│   │   ├── __pycache__/
│   │   ├── __init__.py
│   │   ├── facade.py
│   │   ├── facade_amenity.py
│   │   ├── facade_place.py
│   │   ├── facade_relations_manager.py
│   │   ├── facade_review.py
│   │   ├── facade_user.py
│   │   └── sqlalchemy_facade_relation_manager.py
├── static/
│   ├── images/
│   ├── add_review.js
│   ├── auth_links.js
│   ├── fetch_place_details.js
│   ├── filter_by_country.js
│   ├── get_all_places.js
│   ├── login.js
│   ├── populate_dropdown_countries.js
│   └── styles.css
├── templates/
│   ├── index.html
│   ├── login.html
│   ├── logout.html
│   └── place.html
├── tests/
│   ├── __pycache__/
│   ├── htmlcov/
│   ├── tests_endpoints/
│   ├── tests_facades/
│   ├── tests_models/
│   ├── __init__.py
│   ├── .coverage
│   ├── run_all_tests.py
│   └── test_documentation_and_pep8.py
├── HBnBenv/
├── images/
├── instance/
├── utils/
├── .gitignore
├── config.py
├── README.md
├── requirements.txt
└── run.py
```
---
## **Mermaid Database Schema**

![Capture d’écran 2024-11-11 à 22.21.04.png](<images/Capture d’écran 2024-11-11 à 22.21.04.png>)

---
## **Frontend Functionality**

**Authentication**

+ Users can log in with their email and password.
+ JWT tokens are stored as secure cookies for making authenticated API requests.

**Adding Reviews**

+ Authenticated users can add reviews to places
+ with a rating between 1 and 5.
+ Example data sent via POST:


    ```bash
    {
    "user_id": "12345",
    "place_id": "67890",
    "text": "Great place to stay!",
    "rating": 5
    }
    ```
**Fetching Reviews**

+ Reviews for a specific place are dynamically fetched and displayed using JavaScript.

---
## **Backend Implementation**

**Modular Design**

+ Blueprints: The frontend and API routes are organized using Flask Blueprints for modularity.

+ Service Layer: The facade.py file implements the core logic for interacting with models and performing operations.

+ RESTful API: Flask-RESTx is used for clean and structured API routes, complete with Swagger documentation.

**Database Models**

+ User Model: Stores user information such as name, email, and hashed passwords.
+ Place Model: Contains details about a place (e.g., title, price, and amenities).
+ Review Model: Stores user reviews with a rating for a specific place.
+ Amenity Model: Manages amenities associated with places.

---
## **Contributing**

	1.	Fork the repository.
	2.	Create a new branch (git checkout -b feature-branch).
	3.	Commit changes (git commit -m "Add feature").
	4.	Push to the branch (git push origin feature-branch).
	5.	Open a pull request.

**Authentication**

+ Login: Users authenticate via /api/v1/login/ and receive a JWT token.

+ Logout: The token is invalidated by clearing cookies via /api/v1/auth/logout.

---
## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.