const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const detectObject = require('../detection');
const getFileFormat = require('../utils');

const router = express.Router();
let upload = multer({ dest: 'uploads/' })

router.post('/image-recognition', upload.single('image'), async (req, res) => {
    try{
      if (!req.file)
      return res.status(400).json({ error: 'Please upload an image' });

    //If user specifies a confidence threshold, check if it is between 0 and 1
    if(req.body.confidenceThreshold){
      if(req.body.confidenceThreshold < 0 || req.body.confidenceThreshold > 1){
        return res.status(400).json({ error: 'Confidence threshold must be between 0 and 1' });
      }
    }

    //Check if uploaded file is an image
    const fileFormat = getFileFormat(req.file.originalname);
    if (!fileFormat || !['jpg', 'jpeg', 'png'].includes(fileFormat)) {
      return res.status(400).json({ error: 'Please upload an image' });
    }
    
    const processedImageBuffer = await sharp(req.file.path)
    .resize(224, 224)
    .toFormat('jpeg')
    .toBuffer();

    let fileName = req.file.filename;

    detectObject(processedImageBuffer, confidenceThreshold = req.body.confidenceThreshold || 0.1)
    .then((imageClassification) => {
      console.log(req.file.originalname);
      res.status(200).render("index",{
        message: 'Image classification successful',
        classification: imageClassification[0].className,
        probability: imageClassification[0].probability,
        image: processedImageBuffer.toString('base64')
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: err, message: 'Image classification failed' });
    });
    }catch(err){
      console.error(err);
      res
        .status(500)
        .json({ error: err, message: 'Internal server error' });
    }
});

router.get('/image-recognition', (req, res) => {
  res.render("index");
});

module.exports = router;