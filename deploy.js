const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Paths to the necessary directories
const clientDistPath = path.join(__dirname, 'client', 'dist');
const serverDirPath = path.join(__dirname, 'server');

// Build the React app
console.log('Building the React app...');
execSync('cd client && npm run build', { stdio: 'inherit' });

// Copy additional files (Dockerfile, requirements.txt, etc.) to a temporary directory
console.log('Copying additional files...');
fs.copyFileSync(path.join(__dirname, 'Dockerfile'), path.join(serverDirPath, 'Dockerfile'));
fs.copyFileSync(path.join(__dirname, 'requirements.txt'), path.join(serverDirPath, 'requirements.txt'));

// Create a temporary directory to hold everything you want to deploy
const deployDir = path.join(__dirname, 'deploy-temp');
fs.mkdirSync(deployDir, { recursive: true });

// Copy the build output and additional files to the deploy directory
fs.cpSync(clientDistPath, path.join(deployDir, 'dist'), { recursive: true });
fs.copyFileSync(path.join(serverDirPath, 'Dockerfile'), path.join(deployDir, 'Dockerfile'));
fs.copyFileSync(path.join(serverDirPath, 'requirements.txt'), path.join(deployDir, 'requirements.txt'));

// Deploy to the remote prod branch
console.log('Deploying to remote prod branch...');
execSync(`npx gh-pages -d ${deployDir} -b prod -r origin`, { stdio: 'inherit' });

console.log('Deployment completed successfully!');