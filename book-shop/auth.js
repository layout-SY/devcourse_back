const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const ensureAuthorization = (req, res) => {
	try {
		let receivedJWT = req.headers['authorization'];
		console.log(receivedJWT);

		if (receivedJWT) {
			let decodedUser = jwt.verify(receivedJWT, process.env.PRIVATE_KEY);
			console.log(decodedUser);
			return decodedUser;
		} else {
			throw new ReferenceError('jwt must be provided');
		}
	} catch (error) {
		console.error(error.name);
		console.error(error.message);
		return;
	}
};

module.exports = ensureAuthorization;
