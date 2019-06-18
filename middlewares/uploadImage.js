const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      let type = '';
      if(file.mimetype ==="application/octet-stream" || !file.mimetype) type = ".jpg" 
      cb(null,Date.now() + '-' + file.originalname + type)
    }
  })
  
var upload = multer({ storage: storage })

module.exports = upload;