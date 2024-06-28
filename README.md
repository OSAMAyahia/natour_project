# Natours

Natours is a Node.js application that provides a platform for booking tours around the world. This project was created as a part of learning Node.js and Express.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure user authentication and authorization using JWT tokens.
- **Tour Booking**: Browse and book tours with options for different packages and dates.
- **Payment Integration**: Integrated payment gateway for secure transactions.
- **Admin Dashboard**: Manage tours, bookings, and user accounts through an admin interface.
- **Geo-Location**: Utilizes geo-location services to show tours near the user's location.

## Installation

To run this project locally, ensure you have Node.js and npm installed. Then, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/natours.git
    ```
2. Navigate to the project directory:
    ```bash
    cd natours
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```plaintext
    PORT=3000
    DATABASE=<your_database_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```

5. Run the application:
    ```bash
    npm start
    ```

## Usage

- Access the application at `http://localhost:3001`.
- Register as a new user or login with existing credentials.
- Browse available tours, view details, and make bookings.
- Admins can access the dashboard at `/admin` to manage tours and users.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/improvement`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/improvement`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
