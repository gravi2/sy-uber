/**
 * jwt.js
 *
 * @description :: This file contains the config for JWT for our app 
 */
module.exports.jwt = {
	algorithm: 'HS256',
	secret: 'my super secret',
	expiresInMinutes: '43200', /* 30 days */
	issuer: 'urn:issuer',
	audience: 'urn:audience'
};