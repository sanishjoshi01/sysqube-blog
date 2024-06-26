# Running Laravel and React Project Locally

## Install these first:

1. **Install XAMPP**
   1. **PHP - Add 'C:\xampp\php' path to environment variable/system varirables/path/new**
   2. **MYSQL - Add 'C:\xampp\mysql\bin' path to environment variable/system varirables/path/new**
2. **Install Composer**
3. **Install Node**

## Database Setup

1. **AFTER XAMPP INSTALLATION**
   ```bash
   a. Run as admin XAMPP
   b. Start MySQL
   c. If MySQL is running on ports other than '3307' then update the my.ini file.
   d. Create a database by clicking Admin in XAMPP for MySQL
   e. Database details are in **Update .env File**:
   f. CREATE DATABASE sysqube-blog
   ```

## Laravel Backend Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/sanishjoshi01/sysqube-blog.git
   cd backend
   ```

2. **Install Dependencies**:

   ```bash
   composer install
   ```

3. **Create `.env` File**:

   ```bash
   cp .env.example .env
   ```

4. **Update `.env` File**:

   ```plaintext
   APP_URL=http://localhost:8000
   FRONTEND_URL=http://localhost:3000

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3307
   DB_DATABASE=sysqube-blog
   DB_USERNAME=root
   DB_PASSWORD=

   FILESYSTEM_DISK=public
   ```

5. **Run Migrations**:

   ```bash
   php artisan migrate:fresh --seed
   ```

6. **Run the Server**:
   ```bash
   php artisan serve
   ```

## React Frontend Setup

1. **Navigate to the React Project Directory**:

   ```bash
   cd frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install

   ```

3. **Run the React Application**:
   ```bash
   npm start
   ```

## App Usage

```plaintext
    1. You can use these credentials to login directly
       (Must have run below code in the terminal to work)
       php artisan migrate:fresh --seed

       Credentials
        - email: san@gmail.com
        - password: sandesh
    OR
    2. Manually register the user.
       (Auto logins the user after registration)

    3. Click on Your Account to view the Dashboard or Logout from the system.
    4. Create, Read, Delete, or Edit in the Dashboard
    5. Set status to draft or published
       (Draft posts are not visible in the system)
```

## Summary

1. **Start Laravel Backend**:

   ```bash
   sysqube-blog/
   cd backend
   php artisan serve
   ```

2. **Start React Frontend**:

   ```bash
   sysqube-blog/
   cd frontend
   npm start
   ```

3. **Access Your Application**:
   - Backend: `http://localhost:8000`
   - Frontend: `http://localhost:3000`

With these steps, you should be able to run your Laravel backend and React frontend locally with MySQL as the database. If you encounter any issues, double-check the configuration files and ensure all services are running correctly or contact me.
