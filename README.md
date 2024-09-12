# Email

## Description

This is a web-based email client project built using Django. It allows users to register, log in, compose and send emails, view their inbox, sent emails, and archived emails.

## Getting Started

### Prerequisites

- Python 3.x
- Django 3.x
- A database system (e.g., SQLite)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MrSpectator/Email.git
    ```
2. Install the required packages:
    ```
    pip install -r requirements.txt
    ```
3. Run the migrations:
    ```
    python manage.py migrate
    ```
4. Start the development server:
    ```
    python manage.py runserver
    ```

### Running the Project
- Open a web browser and navigate to http://localhost:8000.
- Register for an account or log in if you already have one.
- Start using the email client!

### Usage
- Compose and send emails to other users.
- View your inbox, sent emails, and archived emails.
- Mark emails as read or archived.

### Code Structure
The project is built using Django and consists of the following apps:

- mail: contains the email client functionality.

The mail app has the following models:

- User: represents a user of the email client.
- Email: represents an email message.

The mail app has the following views:

- index: handles the homepage and inbox.
- compose: handles composing and sending emails.
- mailbox: handles viewing emails in different mailboxes (inbox, sent, archive).
- email: handles viewing and updating individual emails.
- login_view: handles user login.
- logout_view: handles user logout.
- register: handles user registration.

### Contributing
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

### Authors
- Oluwatoni Sobande

### Acknowledgments
- Django: a high-level Python web framework.
- SQLite: a self-contained, file-based database system.

### Contact
```
sobandeoluwatonie@gmail.com
```