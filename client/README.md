# Cookie Store

## About this project

The **Cookie Store** is an online cookie store that allows users to view the cookie menu and search and filter cookies. Users can also create and log into accounts using secure authorization, which will allow them to access additional features, such as managing their carts and account information.

## Contributors

**Jacqueline Trapp**  
GitHub: [JTrapp18](https://github.com/jtrapp18)

**Nem Stankovic**  
GitHub: [Nemswirls](https://github.com/nemswirls)

## Features

- **View Menu**: View cookie menu, search for cookies by name, and filter on one or more cookie attributes (maximum price, minimum rating, gluten-free, nut-free, frosted).
- **Create User Account**: Log in or sign up to access full features of the cookie store.
- **Manage Account Information**: View and edit user information.
- **Manage Cart**: Add/remove cookies to/from the cart, and update the quantity of cookies.
- **Order Cookies**: Place mock orders for cookies and view past orders.
- **Review Cookies**: Users can leave reviews and ratings for cookies they have tried.

## Technical

- **Full CRUD Actions**: Supports complete Create, Read, Update, and Delete functionality for cookies, users, and orders.
- **6 Models**: Implements 6 different models (e.g., User, Cookie, Order, CartItem, Favorite, Review) to manage data.
- **Form Validation (Formik)**: Uses Formik for front-end form validation to ensure smooth user experience when creating accounts, managing the cart, etc.
- **Backend Model Validation**: Ensures data integrity with model validation on the backend using Flask and SQLAlchemy.
- **RESTful API**: The backend is built with Flask, providing a RESTful API for communication with the React frontend.
- **SQLAlchemy**: Utilizes SQLAlchemy for ORM-based database interactions with full support for CRUD operations.
- **Secure Authentication**: Implements user authentication with JWT tokens for secure login and session management.
- **Responsive Frontend**: Built with React, providing a dynamic, responsive user interface.
- **Database Integration**: Uses SQLite to store and manage user, cookie, and order data.
- **Well-Organized Codebase**: Project is structured for maintainability, with clear separation of concerns, including dedicated modules for API routes, database models, and frontend components.

## Demo

See this gif for an example of how the app works.

![demo](https://github.com/jtrapp18/j-n-cookies/blob/main/client/public/images/j-n-cookies.gif?raw=true)

## Description of Key Directories and Files

- **`src/components/`**: Contains reusable React components, such as form elements, modals, and UI elements, as well as CRUD operations for managing data (e.g., `Cookie`, `Review`, `Order`, and `User` models).
- **`src/context/`**: Contains context providers for managing global state, such as `UserProvider` for user authentication and `WindowSizeProvider` for handling window size changes.
- **`src/pages/`**: Contains main route components, such as `Menu`, `Cart`, `Orders`, and `Account` pages.
- **`App.jsx`**: Serves as the main application file, responsible for rendering the app, managing routes, and setting up context providers.
- **`index.css`**: Global CSS file for styling the application.
- **`main.jsx`**: Entry point for the React application, rendering the root component and applying global configurations.
- **`MiscStyling.js`**: Contains additional styling configurations or helper functions for styling components.
- **`routes.jsx`**: Defines the application's routing structure and maps paths to corresponding pages.
- **`index.html`**: The base HTML file for the React application.
- **`package.json`**: Defines the project's dependencies, scripts, and metadata for the React frontend.
- **`Pipfile`**: Specifies dependencies and virtual environment setup for the Flask backend.
