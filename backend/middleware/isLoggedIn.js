const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "No token found" });

  try {
    const verified = jwt.verify(token, "secret key");
    req.user = verified;
    console.log(verified)
    next();
    // res.status(200).json(verified)
  } catch (err) {
    res.status(400).json({error: "invalid token"})
    console.log("await");
    console.log(err.message);
  }
};


module.exports = isLoggedIn;
