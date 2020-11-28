const express = require('express');
const bodyParser = require('body-parser');
const steamtotp = require('steam-totp');

const app = express();

const port = process.env.PORT || 3000;
const { version } = require('./package.json');

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.json({ version: version, post_to: '/totp' });
});

app.post('/totp', async (req, res) => {

	// Reject non-json requests, we don't care about them.
	if (!req.is('application/json')) {
		return res.status(400).json({
			expected: 'application/json',
			got: req.get('content-type')
		});
	}

	// Get the value from the json.
	if (!req.body || !req.body.shared_secret) {
		return res.status(400).json({
			error: 'shared_secret was not supplied'
		});
	}

	// This should pretty much always give us a code, even if the input is scuffed.
	res.json({ code: await getCode(req.body.shared_secret) });
});

app.listen(port, () => {
	console.log(`Listening @ ::${port}`);
});

/*
 * Helper functions
 */

async function getCode(shared_secret) {
	let timeOffset = await getTimeOffset();

	// I think this can throw an error, however I don't really care because the current version of node
	// will just keep running anyways.
	return await steamtotp.getAuthCode(shared_secret, timeOffset);
}

async function getTimeOffset() {
	return new Promise(resolve => {
		steamtotp.getTimeOffset((err, offset, latency) => {
			resolve(err ? 0 : offset);
		});
	});
}
