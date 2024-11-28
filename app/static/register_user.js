document.addEventListener('DOMContentLoaded', function () {
    const register_form = document.getElementById('register-user-form');
    const jwtToken = getCookie("jwt_token");
    const parsedToken = parseJwt(jwtToken);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    function parseJwt(token) {
      if (!token) return null;
      try {
        const base64Url = token.split(".")[1]; // Get the payload part
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        return JSON.parse(jsonPayload);
      } catch (e) {
        console.error("Error parsing JWT:", e);
        return null;
      }
    }

    register_form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const token = getCookie('jwt_token');
        console.log('Retrieved Token:', token); // Debugging log

        if (!token || !parsedToken.sub.is_admin) {
            console.error('Token is missing');
            alert('Please log in as admin to register a new user.')
            window.location.href = '/HBnB/login';
            return;
        }

        const first_name = document.getElementById("user_first_name").value;
        const last_name = document.getElementById("user_last_name").value;
        const email = document.getElementById("user_email").value;
        const password = document.getElementById("user_password").value;
        const confirm_password = document.getElementById("confirm_user_password").value;

        if (password === confirm_password) {
            console.log("Passwords match ok");
        } else {
            console.error("Passwords do not match!");
            alert('Second password does not match !');
            window.location.href = "/HBnB/register";
            return;
        }

        const userData = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
        };

        try {
            const response = await fetch('/api/v1/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            console.log('Register user response status:', response.status); // Debugging log

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                alert(`Error: ${errorData.msg}`);
                return;
            }

            const user_data = await response.json();
            console.log('User registered successfully:', user_data);
            alert(`New-user: ${user_data.first_name} ${user_data.last_name} registered successfully!\n You can log in with your credentials now`);

            // Redirect to the login page
            window.location.href = '/HBnB/login';

        } catch (error) {
            console.error('Error during registration:', error);
        }
    });
});
