const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("./config");
require("dotenv").config();
const User = require("./users");
const Admin = require("./admin");
const app = express();

const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());

// Create a new user instance with the request body data
app.post("/register", async (req, resp) => {
  // Check if a student with the same roll number already exists
  const existingStudent = await User.findOne({
    RollNumber: req.body.RollNumber,
  });
  if (!existingStudent) {
    let user = new User(req.body);
    const hashedPassword = await bcrypt.hash(
      req.body.Semester + "#" + req.body.RollNumber,
      10
    );
    user.Userpassword = hashedPassword;
    let result = await user.save();
    resp.send(result);
  } else {
    resp.status(400).send("Student Already Exists!!!");
  }
});

app.post("/register/admin", async (req, resp) => {
  // Check if a student with the same roll number already exists
  const existingAdmin = await User.findOne({
    Email: req.body.Email,
  });
  if (!existingAdmin) {
    let user = new Admin(req.body);
    const hashedPassword = await bcrypt.hash(req.body.Userpassword, 10);
    user.Userpassword = hashedPassword;
    let result = await user.save();
    resp.send(result);
  } else {
    resp.status(400).send("Student Already Exists!!!");
  }
});

//login
app.post("/login/admin", async (req, resp) => {
  let existingAdmin = await Admin.findOne({ Email: req.body.Email });
  if (!existingAdmin) {
    return resp.status(404).json({
      message: "Admin doesn't exist, Kindly enter correct email",
    });
  }

  try {
    bcrypt.compare(
      req.body.Userpassword,
      existingAdmin.Userpassword,
      (err, result) => {
        if (err) {
          console.log(err);
          return resp
            .status(500)
            .json({ message: "We are unable to log you in" });
        }
        if (!result) {
          return resp
            .status(401)
            .json({ message: "Incorrect email or password" }); //un authorized
        }

        //jwt token generation
        const token = jwt.sign(
          { Email: existingAdmin.Email },
          process.env.jwt_key,
          {
            expiresIn: "5h",
          }
        );

        resp.status(200).json({
          userToken: token,
          userID: existingAdmin._id,
          admin: existingAdmin,
          message: "Authenticated",
        });
      }
    );
  } catch (err) {
    console.log(err);
    resp.send(500).json({ message: "We are unable to log you in." });
  }
});

//verify phoneNumber
app.post("/login/student", async (req, resp) => {
  let existingStudent = await User.findOne({ RollNumber: req.body.RollNumber });
  if (!existingStudent) {
    return resp.status(404).json({
      message: "Student doesn't exist, Kindly enter correct roll number",
    });
  }

  try {
    bcrypt.compare(
      req.body.Userpassword,
      existingStudent.Userpassword,
      (err, result) => {
        if (err) {
          console.log(err);
          return resp
            .status(500)
            .json({ message: "We are unable to log you in" });
        }
        if (!result) {
          return resp
            .status(401)
            .json({ message: "Incorrect roll number or password" }); //un authorized
        }

        //jwt token generation
        const token = jwt.sign(
          { RollNumber: existingStudent.RollNumber },
          process.env.jwt_key,
          {
            expiresIn: "5h",
          }
        );

        resp.status(200).json({
          userToken: token,
          userID: existingStudent._id,
          student: existingStudent,
          message: "Authenticated",
        });
      }
    );
  } catch (err) {
    console.log(err);
    resp.send(500).json({ message: "We are unable to log you in." });
  }
});

//show student data
app.get("/getData", async (req, resp) => {
  let user = await User.find({ RollNumber: { $exists: true } }).sort({
    Semester: 1,
  });
  if (user.length > 0) {
    resp.send(user);
  } else {
    resp.send({ result: " no user" });
  }
});

//delete student
app.delete("/users/:id", async (req, resp) => {
  const result = await User.deleteOne({ _id: req.params.id });
  resp.send(result);
});

// Find a user in the database based on the provided ID
app.get("/users/:id", async (req, resp) => {
  let result = await User.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No record Found" });
  }
});

//update student
app.put("/users/:id", async (req, resp) => {
  let result = await User.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

//update Userpassword
app.put("/users/:id/change-password", async (req, res) => {
  if (!req.body.newPassword) {
    return res.status(400).send("newPassword is required.");
  }

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found.");
    }
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    user.Userpassword = hashedPassword;
    await user.save();

    res.send({ message: "password changed successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

//////////change admin password
app.put("/users/:id/change-ADMIN-password", async (req, res) => {
  if (!req.body.newPassword) {
    return res.status(400).send("newPassword is required.");
  }

  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).send("User not found.");
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    admin.Userpassword = hashedPassword;
    await admin.save();

    res.send({ message: "password changed successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

//send message

app.put("/sendMessage/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    user.Message = req.body.textMessage;
    const result = await user.save();

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete message

app.put("/deleteMessage/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    user.Message = "";
    const result = await user.save();

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

////////////////////////////

//importing schema
require("./imageDetails");
const Images = mongoose.model("ImageDetails");

app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

//////////////////////////////////////////////////////////////

const multer = require("multer");
const Grid = require("gridfs-stream");
const { GridFsStorage } = require("multer-gridfs-storage");

const conn = mongoose.createConnection(process.env.online_DATABASE);
let gfs, gridfsBucket;

conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads"); // Set the collection name
});

// Set up GridFS storage
const storage = new GridFsStorage({
  url: process.env.online_DATABASE, // Database connection URL
  file: (req, file) => {
    return {
      filename: `File_${file.originalname}`,
      bucketName: "uploads", // Must match the collection name above
    };
  },
});

const upload = multer({ storage: storage });

app.post("/upload-image", upload.single("image"), async (req, res) => {
  const imageName = req.file.filename;
  // console.log(req.file);
  try {
    const image = new Images({ image: imageName, fileId: req.file.id });
    await image.save();
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-image", async (req, res) => {
  try {
    Images.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/image/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
});

app.delete("/deleteImage/:id/:fileId", async (req, res) => {
  try {
    const image = await Images.findOne({ _id: req.params.id });
    if (image) {
      const result = await Images.deleteOne({ _id: req.params.id });
      // Delete the file from GridFS
      gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads",
      });
      gridfsBucket.delete(new mongoose.Types.ObjectId(req.params.fileId));
      res.send(result);
    } else {
      res.status(404).send({ message: "Image not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error deleting image" });
  }
});

/////////////////////////////

////////   EXCEL SHEET FILE UPLOAD LOGIC ////////////////////////

const XLSX = require("xlsx");
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/src/frontend/files/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, "Student-Data" + uniqueSuffix + file.originalname);
  },
});

const uploadFile = multer({ storage: fileStorage });

app.post("/upload/file", uploadFile.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    for (let item of data) {
      const hashedPassword = await bcrypt.hash(
        item.Semester + "#" + item.Roll_No,
        10
      );
      const student = {
        Name: item.Name,
        Email: item.Email,
        RoomNumber: item.Room_No,
        Block: item.Block,
        PhoneNumber: item.Phone_No,
        RollNumber: item.Roll_No,
        Semester: item.Semester,
        Branch: item.Branch,
        Address: item.Address,
        Userpassword: hashedPassword,
      };

      // Check if a student with the same roll number already exists
      const existingStudent = await User.findOne({
        RollNumber: student.RollNumber,
      });

      if (!existingStudent) {
        // If the student doesn't exist, insert their data
        await User.create(student);
      } else {
        // Replace the old student's data with the new one
        await User.findOneAndUpdate(
          { RollNumber: student.RollNumber }, // search criteria
          student, // new data
          { upsert: true } // if the student doesn't exist, insert it
        );
      }
    }
    res.status(200).send("Students data uploaded successfully.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error uploading data.");
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
