const jwt = require('jsonwebtoken')
const { getUsers } = require('../controllers/userController')

const verifyToken = (req, res, next) => {
	// const authHeader = req.header('Authorization')
	// const token = authHeader && authHeader.split(' ')[1]
	// if (!token) return res.sendStatus(401)
	// try {
	// 	const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

	// 	req.userId = decoded.id
	// 	next()
	// } catch (error) {
	// 	console.log(error)
	// 	return res.sendStatus(403)
	// }
	return res.senStatus(200)
}



const generateTokens = payload => {
	const { id, username } = payload

	// Create JWT
	const accessToken = jwt.sign(
		{ id, username },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: '5m'
		}
	)

	const refreshToken = jwt.sign(
		{ id, username },
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: '1h'
		}
	)

	return { accessToken, refreshToken }
}

const updateRefreshToken = async (username, refreshToken) => {
	return {
		status: true,
		data: []
	}
}

module.exports = { verifyToken, updateRefreshToken, generateTokens }
