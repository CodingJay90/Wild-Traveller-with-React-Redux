const isLoggedIn = require("../middleware/isLoggedIn");
const Location = require("../models/Location");

const router = require("express").Router();

//GET ALL LOCATION FROM DB
router.get("/", (req, res) => {
  try {
    console.log(req.user)
    Location.find({}).populate("comment")
    .then((foundLocation) => {
        res.status(200).json(foundLocation);
      })
      .catch((err) =>
        res.status(400).json({ success: false, message: err.message})
      );
    } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
});

//ADD A LOCATION TO DB
router.post("/", isLoggedIn, (req, res) => {
  try {
    const author = {
      id: req.user.id,
      username: req.user.username
    };
    console.log(author, req.user._id)
    console.log(req.user)
    const data = {
      location: req.body.location,
      image: req.body.image,
      description: req.body.description,
      author: author
    }
    Location.create(data)
      .then((newLocation) => {
        console.log(newLocation);
        res.status(200).json(newLocation);
      })
      .catch((err) =>
        res.status(400).json({ success: false, message: err.message })
      );
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
});

//GET A SPECIFIC LOACTION BY ID
router.get("/:id", (req, res) => {
  try {
    Location.findById(req.params.id).populate("comment")
      .then((foundLoaction) => {
        // console.log(foundLoaction);
        res.status(200).json(foundLoaction);
      })
      .catch((err) =>
        res.status(400).json({ success: false, message: err.message })
      );
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
});

//GET A SPECIFIC LOCATION BY ID AND UPDATE
router.put("/:id", isLoggedIn, (req, res) => {
  try {
    Location.findByIdAndUpdate(req.params.id, req.body)
      .then((updatedLocation) => {
        console.log(updatedLocation);
        res.status(200).json({ success: true, updatedLocation });
      })
      .catch((err) =>
        res.status(400).json({ success: false, message: err.message })
      );
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
});

//DELETE A LOCATION FROM DB
router.delete("/:id", isLoggedIn, (req, res) => {
  try {
    Location.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).json({ success: true }))
      .catch((err) =>
        res.status(400).json({ success: false, message: err.message })
      );
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
});

module.exports = router;
