const express = require('express');
const { getUsers, deleteUser, LoginUser, createUser } = require('../controllers/userController');
const router = express.Router()
const jwt = require('jsonwebtoken');
const { verifyToken, generateTokens, updateRefreshToken } = require('../middleware/auth');
const { createTemplate, getAllTemplate, deleteTemplate } = require('../controllers/templateController');



/**
 * @swagger
 * /api/users:
 *   get:
 *     description: All users
 *     responses:
 *       200:
 *         description: Returns all the catachphrases
 */
router.get('/api/users', async function (req, res) {
	let response = await getUsers();
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



router.post('/api/login', async (req, res) => {
	let response = await LoginUser(req);
	if (response.success) {
		res.status(201)
		res.json({ ...response.data, success: true, message: "Đăng nhập thành công" })
	} else {
		res.status(403);
		res.send({
			success: false,
			message: "Không tìm thấy thông tin!"
		})
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

router.post('/api/template/create', async (req, res) => {
	let response = await createTemplate(req.body);
	if(response.success){
		res.status(201);
		res.send({
			...response
		})
	} else{
		res.status(401);
		res.send({
			...response
		})
	}
})

router.post('/api/template',async (req,res)=>{
	const response = await getAllTemplate();
	if(response.success){
		res.status(201);
		res.send({
			...response
		})
	} else{
		res.status(401);
		res.send({
			...response
		})
	}
})

router.delete('/api/template/:id',async(req,res)=>{
		let idTemplate = req.params.id;
		console.log(idTemplate)
		let response = await deleteTemplate(idTemplate);
		if(response.success){
			res.status(201);
			res.send({
				...response
			})
		} else{
			res.status(401);
			res.send({
				...response
			})
		}
})


module.exports = router