# Hive Link
[Click to Navigate to Deployed Project](https://hive-link.up.railway.app/)

## About this project

**Hive Link** is a platform designed for beekeepers to track hive inspections, analyze hive health, and connect with other beekeepers. Users can log and review hive data, visualize trends through interactive graphs, and leverage predictive models to improve colony management. 

## Demo

See this gif for an example of how the app works.

![demo](https://raw.githubusercontent.com/jtrapp18/hive-link/refs/heads/main/client/public/images/hive-link.gif)

## Features

- **Hive Tracking**: Log hive inspections with details such as hive status, honey pulls, environmental factors, and hive health metrics.
- **Data Visualization**: View hive trends over time with scatter plots showing impacts on honey production and varroa mites, with clickable pie charts filtering other graphs.
- **Predictive Analysis**: Utilize machine learning (MLP Regressor from sklearn) to predict honey production based on inspection data for each hive.
- **Personalized Hive Recommendations**: Get tailored insights based on the latest inspection data to optimize hive health and honey yield.
- **Beekeeper Networking**: Connect with other beekeepers, view nearby hives on a hive map, and share insights.
- **Authentication & Accounts**: Secure user authentication with JWT for managing hive data and accessing personalized recommendations.
- **Forum**: Discuss bee-related topics, treatments, and best practices with other beekeepers.
- **Specialized News Search**: Uses a Google Search API to find latest beekeeping-related news articles.
- **Beekeeping Events**: Sign up for or create events related to beekeeping and search for events within a certain radius of a specified ZIP code.

## Technical Details

- **Full-Stack Development**: Built with React on the frontend and Flask on the backend for a modern, responsive user experience.
- **Full CRUD Actions**: Supports Create, Read, Update, and Delete functionality for hive data, users, and inspections.
- **Machine Learning Integration**: Models stored using `joblib` to analyze hive health and predict honey production.
- **RESTful API**: Flask-based backend providing structured API endpoints for seamless communication with the React frontend.
- **SQLAlchemy ORM**: Manages database interactions efficiently with full support for relational data.
- **Secure Authentication**: Implements JWT authentication for user login and session management.
- **Data Cleaning & Processing**: Python scripts clean and structure beekeeping data for analysis.
- **Graphing & Analytics**: Uses Plotly in React to visualize hive trends, with interactive features such as zooming and dynamic filtering.
- **Docker Deployment**: The project is containerized for easy deployment using Docker.
- **Cloud Hosting**: Deployed on Railway for scalability and efficient management.
- **State Management**: Uses React Context API to handle global application state.

## File Structure

### Client (Frontend - React)

- **`src/cards/`** - Contains JSX components for displaying hive-related information in card format.
- **`src/components/`** - Reusable UI elements such as buttons, modals, and navbar.
- **`src/context/`** - Manages global state, including user authentication and UI preferences.
- **`src/forms/`** - Components for handling user input, such as adding inspections and registering accounts.
- **`src/graphing/`** - Graphing components utilizing Plotly for data visualization.
- **`src/hooks/`** - Custom React hooks for handling data fetching, in state management, etc.
- **`src/pages/`** - Main route components such as `Dashboard`, `HiveDetails`, and `Profile`.
- **`src/styles/`** - Reusable UI elements such as error messages, and modals.
- **`App.jsx`** - Root component handling routing and global context providers.
- **`helper.js`** - Utility functions used throughout the frontend.
- **`routes.jsx`** - Defines frontend route structure.
- **`index.css`** - Global styles.
- **`main.jsx`** - Application entry point.
- **`MiscStyling.js`** - Reusable styled components.

### Server (Backend - Flask)

- **`joblib/`** - Stores machine learning models for hive health and honey production predictions.
- **`lib/experience_data/`** - Scripts for cleaning and structuring data for graphing and research.
- **`lib/models/`** - SQLAlchemy models defining the database schema.
- **`lib/seeding/`** - Scripts for database seeding, including data population and schema initialization.
- **`lib/config.py`** - Configuration file for database and application settings.
- **`lib/migrations/`** - Handles database schema migrations.
- **`app.py`** - Main Flask application file handling API routes and business logic.
- **`Dockerfile`** - Defines containerization setup for deployment.
- **`requirements.txt`** - Lists dependencies for the backend.
- **`run_study.ipynb`** - Jupyter Notebook for running hive health experience studies and analyzing the latest data.

## Contributors

**Jacqueline Trapp**  
GitHub: [JTrapp18](https://github.com/jtrapp18)
