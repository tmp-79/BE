const PostModel = require('../model/postModel')

async function getAllPost() {
    let option = {

    }
    try {
        let posts;
        await PostModel.find().then((result) => {
            posts = result;
        })
        return {
            data: posts,
            success: true,
        }
    } catch (err) {
        return { success: false, message: "Posts not found" };
    }
}

async function deletePost(id) {
    let post;
    try {
        post = await PostModel.findById(id);
        if (post == null) {
            return { success: false, message: 'Cannot find post' };
        }

        try {
            await post.remove()
            return {
                success: true,
                message: 'Deleted post'
            };
        } catch (err) {
            return { success: false ,message: err.message };
        }
    } catch (err) {
        return { success: false, message: err.message };
    }
}

module.exports = {
    getAllPost,
    deletePost
}