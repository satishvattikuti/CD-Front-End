const { execSync, spawn } = require('child_process')

// Grabs the action we want to run against `react-scripts`
// argv always contains the program name and path, so we skip those
// to get the first argument.
const action = process.argv.slice(2)[0]

// This grabs the SHA of the last tagged commit.
const tagSha = execSync(
    'git rev-list --tags --max-count=1',
    {
        stdio: ['pipe', 'pipe', 'ignore'],
    }
).toString().trim()

// This takes a sha and returns the tag name.
const desc = execSync(
    `git describe --tags ${tagSha}`,
    {
        stdio: ['pipe', 'pipe', 'ignore'],
    }
).toString().trim()

const path = require('path')

// We then spawn `react-scripts` (cross platform)
// with our envrionment variables & REACT_APP_VERSION added
spawn(path.join(__dirname, 'node_modules', '.bin', `react-scripts${process.platform === 'win32' ? '.cmd':''}`), [action], {
    stdio: 'inherit',
    env: {
        REACT_APP_VERSION: desc,
        ...process.env
    }
}).on('close', code => process.exit(code))


