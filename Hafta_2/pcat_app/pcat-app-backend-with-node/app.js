const express = require('express')
const mongoose = require('mongoose');
const photoController = require('./controller/photo_controller');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const app = express();
const Photo = require('./model/photo_model');
const bodyParser = require('body-parser');
const fs = require('fs');
mongoose.connect('mongodb+srv://timurturbil:dort4444@youtubedb.k8omn.mongodb.net/alotech-bootcamp-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(cors())
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());
app.use(fileUpload());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.post('/photo', (req, res) => {
    const uploadDir = './public/uploads';

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
        //console.log(`title ${JSON.stringify(req)}`)
        await Photo.create({
            title: req.body.title,
            description: req.body.description,
            image: '/uploads/' + uploadImage.name,
        });
        res.redirect('/');
    });
});

app.get('/photo', async (req, res) => {
    const photos = await Photo.find({});
    const sortedPhotos = photos.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.dateCreated) - new Date(a.dateCreated);
      });
    res.send(sortedPhotos)
});

app.put('/photo/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.image = '/uploads/' + req.files.image.name;
    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;
    uploadImage.mv(uploadPath, async () => {
        //console.log(`title ${JSON.stringify(req)}`)
        photo.save();
        res.send("okay")
    });

})

app.delete('/photo/:id', async (req, res) => {
    await Photo.findByIdAndDelete(req.params.id);
    res.send("photo deleted");
})


app.listen(process.env.PORT || 8080, () => {
    console.log("8080 portunda çalışıyor")
})