#!/bin/bash

# Step 1: Ensure we're on the main branch and pull the latest changes
git checkout main
git pull origin main

# Step 2: Build the React app to generate the client/dist folder (locally)
cd client && npm run build

# Step 3: Switch to the production branch (create it if it doesn't exist)
git checkout production || git checkout -b production

# Step 4: Ensure production has a .gitignore to ignore the entire client folder (if not already)
# Explicitly ignore client/ before reset
echo "client/" >> .gitignore

# Step 5: Stage the .gitignore change and commit it (only if there were changes)
git add .gitignore
git commit -m "Ensure client/ folder is ignored in production branch"

# Step 6: Reset production branch to match main branch (this will overwrite any changes in production)
git reset --hard main

# Step 7: Copy the necessary files from main and the locally built client/dist
cp Dockerfile requirements.txt server/ client/dist/ .

# Step 8: Add the changes and commit
git add Dockerfile requirements.txt server/ client/dist/
git commit -m "Add production files for deployment, including locally built dist"

# Step 9: Push the production branch to remote
git push origin production --force

# Step 10: Switch back to the main branch
git checkout main
