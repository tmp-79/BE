const express = require('express');
const { getUsers, deleteUser, createUser } = require('../controllers/userController');
const router = express.Router()
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')



/**
 * @swagger
 * /api/users:
 *   get:
 *     description: All users
 *     responses:
 *       200:
 *         description: Returns all the catachphrases
 */
router.get('/api/users',verifyToken, async function (req, res) {
	let response = await getUsers();
	console.log("res:", response)
	if (response.success) {
		res.status(200);
		res.send(response)
	} else {

	}
})

router.post('/api/users', async function (req, res) {
	let body = {
		username: req.body.username,
		password: req.body.password,
	};
	let response = await createUser(body);

	if (response.success == true) {
		res.status(201);
		res.send(response)
	} else {
		res.status(404)
		res.send(response)
	}
})

/*
	create user
*/



/*
	delete user
*/

// authen

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
	let response = await getUsers();
	let users;
	if (response.success) {
		users = response.data.map((u) => {
			if (u.username === username)
				return {
					...u,
					refreshToken
				}
			return u
		})
	}
}

router.post('/api/login', async (req, res) => {
	let response = await getUsers();
	let users = response.data
	if (response.success) {
		console.log(response)
		let user = users.find((u) => (u.username === req.body.username && u.password === req.body.password))
		if (user) {
			const username = req.body.username
			const tokens = generateTokens(user)
			updateRefreshToken(username, tokens.refreshToken);
			res.status(201)
			res.json({ ...tokens, success: true, message: "Đăng nhập thành công" })
		} else {
			res.status(403);
			res.send({
				success: false,
				message: "Không tìm thấy thông tin!"
			})
		}
	}
})

router.post('/api/token', (req, res) => {
	const refreshToken = req.body.refreshToken
	if (!refreshToken) return res.sendStatus(401)

	const user = users.find(user => user.refreshToken === refreshToken)
	if (!user) return res.sendStatus(403)

	try {
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

		const tokens = generateTokens(user)
		updateRefreshToken(user.username, tokens.refreshToken)

		res.json(tokens)
	} catch (error) {
		console.log(error)
		res.sendStatus(403)
	}
})

router.delete('/api/logout', verifyToken, (req, res) => {
	const user = users.find(user => user.id === req.userId)
	updateRefreshToken(user.username, null)

	res.sendStatus(204)
})


module.exports = router