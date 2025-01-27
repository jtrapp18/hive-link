#!/bin/bash

# Step 1: Ensure we're on the main branch and pull the latest changes
git checkout main
git pull origin main

# Step 2: Build the React app to generate the client/dist folder (locally)
cd client && npm run build

# Step 3: Switch to the production branch (create it if it doesn't exist)
git checkout production || git checkout -b production

# Step 4: Ensure production has a .gitignore to ignore the entire client folder (if not already)
if ! git check-ignore -q client/; then
    echo "client/" >> .gitignore
fi

# Step 5: Reset production branch to match main branch (this will overwrite any changes in production)
git reset --hard main

# Step 6: Add the necessary files from main and the locally built client/dist
# We're copying Dockerfile, requirements.txt, server/, and client/dist/ to the production branch
cp Dockerfile requirements.txt server/ client/dist/ .

# Step 7: Add the changes and commit
git add Dockerfile requirements.txt server/ client/dist/
git commit -m "Add production files for deployment, including locally built dist"

# Step 8: Push the production branch to remote
git push origin production --force

# Step 9: Switch back to the main branch
git checkout main