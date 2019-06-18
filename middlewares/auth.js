const jwt = require("jsonwebtoken")

authenticating = (req, res, next) =>{
    const token = req.header("Authorization")
    try{
        const decoded = jwt.verify(token, "XEDIKE")
        console.log(decoded)
        req.user = decoded
        next()
    }
    catch(error){
        res.status(403).json({errors:"You can't see me"})
    }
}
const authorizing = (userTypeArray) =>{
    return (req, res, next) =>{
        const {userType}  = req.user
        if(userTypeArray.indexOf(userType) > -1){
            return next()
        } else {
            res.status(403).json({errors: "Đã đăng nhập, bạn không xem được điều này"})
        }
    }
}
module.exports = {
    authenticating, authorizing
}