const UserModel = require('../model/userModel');
const { generateTokens, updateRefreshToken } = require('../middleware/auth');

async function getUsers() {
    let option = {

    }
    try {
        let users;
        await UserModel.find().then((result) => {
            users = result;
        })
        return {
            data: users,
            success: true,
        }
    } catch (err) {
        return { success: false, message: "User not found" };
    }
}

async function deleteUser(id) {
    let user;
    try {
        user = await UserModel.findById(id);
        if (user == null) {
            return { success: false, message: 'Cannot find user' };
        }

        try {
            await user.remove()
            return {
                success: true,
                message: "Xóa tài khoản thành công."

            };
        } catch (err) {
            return { success: false, message: err.message };
        }
    } catch (err) {
        return { success: false, message: err.message };
    }
}

async function createUser(body) {
    const user = new UserModel(body);

    try {
        const newUser = await user.save();
        return {
            success: true,
            data: newUser,
            message: "Thêm mới tài khoản thành công."
        };
    } catch (err) {
        return { success: false, message: "Thêm mới tài khoản thất bại." };
    }
}

async function LoginUser(req) {
    let response = await getUsers();
    let users = response.data
    if (response.success) {
        console.log(response)
        let user = users.find((u) => (u.username === req.body.username && u.password === req.body.password))
        if (user) {
            const username = req.body.username
            const tokens = generateTokens(user)
            updateRefreshToken(username, tokens.refreshToken);
            return {
                success: true,
                data: tokens,
                message: "Đăng nhập thành công."
            }
        } else {
            return {
                success: false,
                data: null,
                message: "Đăng nhập thất bại"
            }
        }
    }
}
module.exports = {
    getUsers,
    deleteUser,
    createUser,
    LoginUser
}