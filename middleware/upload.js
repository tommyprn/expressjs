const multer = require('multer');

exports.upload = async (req, res, next) => {
	const storage = multer.diskStorage({
		destination: function(req, file, cb) {
			cb(null, 'storage');
		},
		filename: function(req, file, cb) {
			cb(null, Date.now() + '-' + file.originalname);
		}
	});

	const upload = multer({ storage: storage }).single('attach');

	upload(req, res, function(error) {
		if (error instanceof multer.MulterError) {
			return res.status(500).json(error);
    } 
    else if (error) {
			return res.status(500).json(error);
		}
		next();
	});
};