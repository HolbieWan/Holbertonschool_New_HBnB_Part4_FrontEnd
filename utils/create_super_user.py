from app import create_app
from app.extensions import db
from app.models.user import User

app = create_app(config_name='default')

with app.app_context():
    superuser = User(
        first_name="Admin",
        last_name="Admin",
        email="admin.admin@gmail.com",
        is_admin=True,
        password=None
    )
    superuser.hash_password("adminpassword")
    db.session.add(superuser)
    db.session.commit()

    print("Superuser created successfully!")


#To create super_user from this script, run in app repo: python3 -m utils.create_super_user