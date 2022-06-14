const Template = require('../model/templateModel')

async function getAllTemplate() {
    try {
        let templates;
        await Template.find().then((result) => {
            templates = result;
        })
        return {
            data: templates,
            success: true,
            message: "Lấy danh sách thành công"
        }
    } catch (err) {
        return { success: false, message: "Không tìm thấy giao diện nào." };
    }
}

async function deleteTemplate(id) {
    let template;
    try {
        template = await Template.findById(id);
        if (template == null) {
            return { success: false, message: 'Không tìm thấy giao diện' };
        }

        try {
            await template.remove()
            return {
                success: true,
                message: "Xóa giao diện thành công.",
                data: template

            };
        } catch (err) {
            return { success: false, message: err.message };
        }
    } catch (err) {
        return { success: false, message: err.message };
    }
}

async function updateTemplate(id, body) {
    let template;
    try {
        template = await Template.updateOne({
            _id: id
        }, { ...body });
        if (template == null) {
            return { success: false, message: 'Không tìm thấy giao diện' };
        }
        try {
            return {
                success: true,
                message: "Cập nhật giao diện thành công.",
                data: template

            };
        } catch (err) {
            return { success: false, message: err.message };
        }
    } catch (err) {
        return { success: false, message: err.message };
    }
}


async function createTemplate(body) {
    const template = new Template(body);
    try {
        const newTemplate = await template.save();
        return {
            success: true,
            data: newTemplate,
            message: "Thêm sản phẩm mới thành công."
        };
    } catch (err) {
        return { success: false, message: "Thêm sản phẩm mới thất bại." };
    }
}

module.exports = {
    getAllTemplate,
    deleteTemplate,
    createTemplate,
    updateTemplate
}