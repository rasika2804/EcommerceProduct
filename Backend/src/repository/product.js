const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root12345',
    database: 'products',
    insecureAuth : true
});

connection.connect((err) => {
    if(err){
        console.log(err);
        console.log("error while connecting to databse");
        return;
    } 
    console.log('Connection estimated')
});

exports.fetchProductProperties = (color, size) => {
    return new Promise( async (resolve, reject) => {
        try {
            await connection.query(`select * from products where color = ? and size = ?`, [color, size], (error, result) => {
                if(error) throw err;
                return resolve(result);
            });
        } catch (error) {
            return reject (error);
        }
    })
}

exports.getProductByCategory = async() => {
    return new Promise( async (resolve, reject) => {
        try {
            await connection.query(`select name, category, max(price) from products group by category;`, (error, result) => {
                if(error) throw err;
                return resolve(result);
            });
        } catch (error) {
            return reject (error);
        }
    })
}

exports.getHighestPrice = async(num) => {
    return new Promise( async (resolve, reject) => {
        try {
            await connection.query(`select * from ( select prd.*, row_number() over (order by price DESC) rownumb from products prd) as a where rownumb = ${num}`, (error, result) => {
                if(error) throw error;
                return resolve(result);
            });
        } catch (error) {
            return reject (error);
        }
    })
}

exports.uploadFiles = async(fileArray) => {
    return new Promise( async (reject, resolve) => {
        try {
            let result;
            const query = `insert into bulkUploads(fileName, mimeType, encoding, originalName, url) values(?,?,?,?,?)`;
            if(fileArray && fileArray.length > 0){
                for(let file of fileArray){
                    try {
                        result = await connection.query(query, [file.filename, file.mimetype, file.encoding, file.originalname, file.destination]);
                    } catch (error) {
                        console.log(error);
                    }
                }
                if(result){
                    return resolve(result);
                } else {
                   return result;
                }
            }
        } catch (error) {
            return reject(error);
        }
    })
}