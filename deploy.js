const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Define paths
const clientDistPath = path.join(__dirname, 'client', 'dist');
const serverClientPath = path.join(__dirname, 'server', 'client');
const serverDirPath = path.join(__dirname, 'server');

// Run build in the client directory
console.log('Building client...');
execSync('cd client && npm install && npm run build', { stdio: 'inherit' });

// Copy build output and other necessary files
console.log('Copying files...');
fs.cpSync(clientDistPath, serverClientPath, { recursive: true });
fs.copyFileSync(path.join(__dirname, '.gitignore'), path.join(serverDirPath, '.gitignore'));
fs.copyFileSync(path.join(__dirname, 'Dockerfile'), path.join(serverDirPath, 'Dockerfile'));
fs.copyFileSync(path.join(__dirname, 'requirements.txt'), path.join(serverDirPath, 'requirements.txt'));

// Commit and push to prod branch
console.log('Committing changes...');
execSync('git add .', { stdio: 'inherit' });
execSync('git commit -m "Deploy React app"', { stdio: 'inherit' });
execSync('git push origin prod', { stdio: 'inherit' });

console.log('Deployment complete!');
