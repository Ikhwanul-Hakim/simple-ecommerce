const { request } = require('express')
const responseBuilder = require('../helper/response')

module.exports.getAll = (req, res) => {
    // const response = responseBuilder('ERROR', 'not implemented : get all category',)
    const sql = 'SELECT * FROM `category` WHERE deleted_at IS NULL'

    req.db.query(sql, (err, result) => {
        if (err){
            res.send(
                responseBuilder(0, err.message)
            )
            console.log(err.message);
        } else {
            console.log('RESULT : ', result);
            res.send(
                responseBuilder(1, null, result)
            )
        }
    })
}

module.exports.getProduct = (req, res) => {
    const sql = 'SELECT * FROM `category` WHERE id = ? AND deleted_at IS NULL'

    req.db.query(sql, req.params.id, (err, result) => {
        if (err){
            res.send(
                responseBuilder(0, err.message)
            )
            console.log(err.message);
        } else {
            const sql2 = 'SELECT * FROM `product` WHERE id_category = ? AND deleted_at IS NULL'
            req.db.query(sql2, req.params.id, (err2, result2) => {
                if (err2){
                    res.send(
                        responseBuilder(0, err2.message) 
                    )
                    console.log(err2.message);
                    } else {                                
            console.log('RESULT : ', result2);
            res.send(
                responseBuilder(1, null, {...result[0], products: result2})
            )
        }
    })
    }
})
}

module.exports.insert = (req, res) => {
    if (req.body.name){
        const sql = 'INSERT INTO  `category` (`name`) VALUES (?)'        
    req.db.query(sql, req.body.name, (err, result) => {
        if (err){
            res.send(
                responseBuilder(0, err.message)
            )
            console.log(err.message);
        } else {
            console.log('RESULT : ', result);
            const sql2 = 'SELECT * FROM `category` WHERE `id` = ?'
            req.db.query(sql2, result.insertId, (err2, result2) => {
                if (err2){
                    res.send(
                        responseBuilder(0, err2.message)
                    )
                    console.log(err2.message);
                } else {
                    res.send(
                        responseBuilder(1, null, result2[0])
                    )
                }
            })
        }
    })
    } else {
        res.send(
            responseBuilder(0, 'property name is required')
        )

    }
}

module.exports.update = (req, res) => {    
    const sql = 'UPDATE `category` SET `name` = ?, updated_at = NOW() WHERE id = ?'    
    req.db.query(sql, [req.body.name, req.params.id], (err, result) => {
        if (err){
            res.send(
                responseBuilder(0, err.message)
            )
            console.log(err.message);
        } else {
            console.log('RESULT : ', result);
            const sql2 = 'SELECT * FROM `category` WHERE `id` = ?'
            req.db.query(sql2, req.params.id, (err2, result2) => {
                if (err2){
                    res.send(
                        responseBuilder(0, err2.message)
                    )
                    console.log(err2.message);
                } else {
                    res.send(
                        responseBuilder(1, null, result2[0])
                    )
                }
            })
        }
    })
}

module.exports.delete = (req, res) => {
    const sql = 'UPDATE `category` SET updated_at = NOW(), deleted_at = NOW() WHERE id = ?'    
    req.db.query(sql, req.params.id, (err, result) => {
        if (err){
            res.send(
                responseBuilder(0, err.message)
            )
            console.log(err.message);
        } else {
            console.log('RESULT : ', result);
            const sql2 = 'SELECT * FROM `category` WHERE `id` = ?'
            req.db.query(sql2, req.params.id, (err2, result2) => {
                if (err2){
                    res.send(
                        responseBuilder(0, err2.message)
                    )
                    console.log(err2.message);
                } else {
                    res.send(
                        responseBuilder(1, null, result2[0])
                    )
                }
            })
        }
    })
}