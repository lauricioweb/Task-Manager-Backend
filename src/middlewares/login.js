const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  
  const authHeader = req.headers.authorization;
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  

	try{
  
    const decoded = jwt.verify(token, "teste123");
    if (!decoded) {
      res.json({ msg: "não autorizado" });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json(error);
  }
}

module.exports = auth;
