#!/bin/bash

# Step 1: Ensure we're on the main branch and pull the latest changes
git checkout main

# Step 2: Build the React app to generate the client/dist folder (locally)
cd client && npm run build

# Step 3: Switch to the production branch (create it if it doesn't exist)
git checkout production || git checkout -b production

# Step 4: Reset production branch to match main branch (this will overwrite any changes in production)
git reset --hard main

# Step 5: Copy the necessary files from main and the locally built client/dist
cp Dockerfile requirements.txt server/ client/dist/ .

# Step 6: Add the changes and commit
git add Dockerfile requirements.txt server/ client/dist/
git commit -m "Add production files for deployment, including locally built dist"

# Step 7: Push the production branch to remote
git push origin production --force

# Step 8: Switch back to the main branch
git checkout main