const ProductRepo = require('../repository/product');
const multer = require('multer');
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const extArray = file.originalname.split('.');
        const extension = extArray[extArray.length - 1];
        cb(null, `${Date.now()}.${extension}`);
    },
    destination: 'public/uploads/bulkUpload/',
});

const uploads = multer({ storage }).array('avatar');

exports.getProductByProperties = async(req, res) => {
    try {
        const {color, size} = req.query;
        const productResult = await ProductRepo.fetchProductProperties(color, size);
        if(productResult && productResult.length > 0){
            res.status(200).json({message: "data fetched successfully", productResult});
        } else {
            res.status(404).json({message: "data not found", productResult});
        }
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

exports.getHighPricedProductByCategory = async(req, res) => {
    try {
        const products = await ProductRepo.getProductByCategory();
        if(products && products.length > 0) {
            res.status(200).json({message: "data fetched successfully", products});
        } else {
            res.status(404).json({message: "data not found", products});
        }
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}
exports.getNthHighestPrice = async(req, res) => {
    try {
        const num = req.params;
        const nThHighestPrice = await ProductRepo.getHighestPrice(num);
        if(nThHighestPrice && nThHighestPrice.length > 0){
            res.status(200).json({message: "data fetched successfully", nThHighestPrice});
        } else {
            res.status(404).json({message: "data not found", nThHighestPrice});
        }
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

exports.uploadBulkFiles = async(req, res) => {
    try {
        //const type = req.files;
        //console.log("req type---->", type);
        uploads(req, res, async (err) => {
            if (err) {
                res.status(500);
            }
            let uploadedFile = await ProductRepo.uploadFiles(req.files);
            if (!uploadedFile) {
                res.status(400).json({ message: 'Error while uploading file!' })
            } else {
                res.status(200).json({ uploadFile });
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"});
    }
}
