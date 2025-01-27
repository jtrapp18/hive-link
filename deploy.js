const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Paths to the necessary directories
const clientDistPath = path.join(__dirname, 'client', 'dist');
const serverClientPath = path.join(__dirname, 'server', 'client');
const serverDirPath = path.join(__dirname, 'server');

// Copy build output and other necessary files
console.log('Copying files...');
fs.cpSync(clientDistPath, serverClientPath, { recursive: true });
fs.copyFileSync(path.join(__dirname, 'Dockerfile'), path.join(serverDirPath, 'Dockerfile'));
fs.copyFileSync(path.join(__dirname, 'requirements.txt'), path.join(serverDirPath, 'requirements.txt'));

// Create the prod branch if it doesn't exist
console.log('Creating prod branch if it does not exist...');
execSync('git fetch origin', { stdio: 'inherit' });
try {
  execSync('git checkout prod', { stdio: 'inherit' });
} catch (error) {
  // If the branch does not exist, create it from main
  execSync('git checkout -b prod main', { stdio: 'inherit' });
}

// Commit and push to prod branch
console.log('Committing changes...');
execSync('git add Dockerfile requirements.txt server client/dist', { stdio: 'inherit' });
execSync('git commit -m "Deploy React app"', { stdio: 'inherit' });
execSync('git push origin prod', { stdio: 'inherit' });