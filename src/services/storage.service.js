require("dotenv").config();
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file, fileName) {
    try {
        const response = await imagekit.upload({
            file: file,
            fileName: fileName
        });

        return response;
    } catch (err) {
        res.status(400).json({ message: "Image upload failed" });
        return null;
    }
}

module.exports = { uploadFile };
