const fs = require('fs');
const path = require('path');

// Get the new version from the command line arguments
const newVersion = process.argv[2];
if (!newVersion) {
    console.error('Please provide a version (e.g., 1.0.1)');
    process.exit(1);
}

const filesToUpdate = [
    './package.json',
    './release/app/package.json',
    './release/app/package-lock.json',
];

filesToUpdate.forEach((filePath) => {
    const fullPath = path.resolve(filePath);
    const fileContent = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    fileContent.version = newVersion;
    fs.writeFileSync(fullPath, JSON.stringify(fileContent, null, 2));
    console.log(`Updated version to ${newVersion} in ${filePath}`);
});
