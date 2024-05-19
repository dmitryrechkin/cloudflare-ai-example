import fs from 'fs';
import toml from 'toml';
import { exec } from 'child_process';

// Read and parse wrangler.toml
const wranglerToml = fs.readFileSync('wrangler.toml', 'utf8');
const config = toml.parse(wranglerToml);

// Extract DATABASE name (assuming it's under a top-level `d1_databases` section)
const databaseName = config.d1_databases[0]?.binding;

if (!databaseName) {
	console.error('DATABASE name not found in wrangler.toml');
	process.exit(1);
}

// Get the command line arguments
const args = process.argv.slice(2);
console.log(`Arguments: ${args}`);

// Build the migration command
let migrationCommand = `wrangler d1 migrations apply ${databaseName}`;

// Proxy any additional arguments provided after the script
if (args.length > 0) {
	migrationCommand += ` ${args.join(' ')}`;
}

console.log(`Running migration command: ${migrationCommand}`);

// Run the migration command
exec(migrationCommand, (error, stdout, stderr) => {
	if (error) {
		console.error(`Error: ${error.message}`);
		return;
	}

	if (stderr) {
		console.error(`stderr: ${stderr}`);
		return;
	}

	console.log(`stdout: ${stdout}`);
});
