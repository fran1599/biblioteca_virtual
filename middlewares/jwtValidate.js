const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtValidate = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        res.status(403).json({ msg: "Error: token no enviado, acceso denegado" });
    } else {
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if (error) {
                res.status(401).json({ msg: "Error: Token inválido, acceso denegado" });
            } else {
                req.usuario = decoded;
                next();
            }
        });
    }
    console.log(res.statusCode)
};

module.exports =  jwtValidate;