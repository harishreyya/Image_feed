require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { middleware, errorHandler } = require("supertokens-node/framework/express");
const supertokens = require("supertokens-node");
const Passwordless = require("supertokens-node/recipe/passwordless");
const Session = require("supertokens-node/recipe/session");

const app = express();


supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "https://try.supertokens.com",
    },
    appInfo: {
        appName: "superToken",
        apiDomain: "http://localhost:5002",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        Passwordless.init({
            flowType: "MAGIC_LINK",
            contactMethod: "EMAIL"
        }),
        Session.init()
    ]
});


mongoose.connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => console.error("Could not connect to MongoDB", err));


const imageSchema = new mongoose.Schema({
    url: String,
    uploadedAt: { type: Date, default: Date.now }
});

const Image = mongoose.model("Image", imageSchema);


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype.toLowerCase());

        if (mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
        }
    }
});


app.use(cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));


app.use(middleware());
app.use(errorHandler());

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded or invalid file type.');
    }

    const file = req.file;

    cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) {
            return res.status(500).send('Error uploading image');
        }

        const image = new Image({ url: result.secure_url });
        image.save()
            .then(() => res.json({ url: result.secure_url }))
            .catch(err => res.status(500).send('Error saving image URL'));
    }).end(file.buffer);
});

app.get('/images', async (req, res) => {
    try {
        const images = await Image.find().sort({ uploadedAt: -1 });
        res.json(images);
    } catch (error) {
        res.status(500).send('Error retrieving images');
    }
});

app.delete('/images/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).send('Image not found');
        }
        
        await Image.findByIdAndDelete(req.params.id);
        res.send('Image deleted');
    } catch (error) {
        res.status(500).send('Error deleting image');
    }
});

app.use((err, req, res, next) => {
    res.status(500).send("Internal server error: " + err.message);
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
