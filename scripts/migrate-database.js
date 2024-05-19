import fs from 'fs';
import toml from 'toml';
import { exec } from 'child_process';

// Read and parse wrangler.toml
const wranglerToml = fs.readFileSync('wrangler.toml', 'utf8');
const config = toml.parse(wranglerToml);

// Extract DATABASE name (assuming it's under a top-level `d1_databases` section)
const databaseName = config.d1_databases[0]?.binding;

if (!databaseName)
{
	console.error('DATABASE name not found in wrangler.toml');
	process.exit(1);
}

// Run the migration command
exec(`wrangler d1 migrations apply ${databaseName}`, (error, stdout, stderr) =>
{
	if (error)
	{
		console.error(`Error: ${error.message}`);
		return;
	}

	if (stderr)
	{
		console.error(`stderr: ${stderr}`);
		return;
	}

	console.log(`stdout: ${stdout}`);
});
