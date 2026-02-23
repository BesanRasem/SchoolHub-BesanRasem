const jwt = require("jsonwebtoken");
const UserToken = require("../models/userToken");

async function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}


function schoolAdmin(req, res, next) {
  if (!req.user || req.user.role !== "schooladmin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}
function superAdmin(req, res, next) {
  if (!req.user || req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}
function teacher(req, res, next) {
  if (!req.user || req.user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}
function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}
module.exports = { auth, schoolAdmin ,superAdmin,teacher,allowRoles};
