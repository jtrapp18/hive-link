# Use Python as the base image
FROM python:3.8-slim

# Install system dependencies for PostgreSQL, Python, and Node.js
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    curl \
    && apt-get clean

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt ./ 
RUN pip install --no-cache-dir -r requirements.txt

# Copy the React 'dist' folder directly
COPY client/dist ./client/dist

# Copy the rest of the Flask backend
COPY server ./server

# Expose the port and set the command to start Gunicorn
EXPOSE 5000
CMD ["gunicorn", "--chdir", "server", "--log-level", "debug", "-b", "0.0.0.0:5000", "app:app"]
