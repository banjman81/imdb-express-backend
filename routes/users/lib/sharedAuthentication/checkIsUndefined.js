function checkIsUndefined(req, res, next){
    if(Object.keys(req.body).length === 0){
        return res.status(500).json({
            message:  'failure',
            error: '  Please fill out form'
        })
    }
    else{
        next()
    }
}

module.exports = {
    checkIsUndefined,
}