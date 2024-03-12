const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json({limit : "10mb"}))

const PORT = process.env.PORT || 8000

// mongoose connetion 
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Database"))
  .catch((err) => console.log(err));

//schemas

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
  });

//
  const userModel = mongoose.model("userss", userSchema);  

//api
app.get("/", (req,res)=>{
    res.send("server is running")
})


// app.post("/signups", async (req, res) => {
//     try {
//       console.log(req.body);
  
//       const { email } = req.body;
  
//       const result = await userModel.findOne({ email: email });
  
//       console.log(result);
  
//       if (result) {
//         res.send({ message: "Email id is already registered" });
//       } else {
//         const data = new userModel(req.body);
//         const save = await data.save(); // Make sure to await the save operation
  
//         res.send({ message: "Successfully signed in" });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ message: "Internal Server Error" });
//     }
//   });
  
app.post("/signups", async (req, res) => {
    try {
      console.log("Request body:", req.body);
      const { email } = req.body;
  
      console.log("Searching for email:", email);
      const result = await userModel.findOne({ email: email });
  
      console.log("Search result:", result);
  
      if (result) {
        res.send({ message: "Email id is already registered" });
      } else {
        const data = new userModel(req.body);
        const save = await data.save(); // Make sure to await the save operation
  
        console.log("Save result:", save);
        res.send({ message: "Successfully signed in" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
  
  //api login 

//   app.post("/login", (req, res) => {
//     console.log(req.body);//
    
//     const { email } = req.body;
//     userModel.findOne({ email: email }, (err, result) => {
//       if (result) {
//         const dataSend = {
//           _id: result._id,
//           firstName: result.firstName,
//           lastName: result.lastName,
//           email: result.email,
//           image: result.image,
//         };
//         console.log(dataSend);
//         res.send({ message: "Login is successfully", alert: true, data: dataSend,
//         });
//       } else {
//         res.send({
//           message: "Email is not available, please sign up",
//           alert: false,
//         });
//       }
//     });
//   });
  

app.post("/login", async (req, res) => {
    try {
      console.log(req.body);
  
      const { email } = req.body;
      const result = await userModel.findOne({ email: email });
  
      if (result) {
        const dataSend = {
          _id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          image: result.image,
        };
  
        console.log(dataSend);
  
        res.status(200).send({
          message: "Login is successful",
          alert: true,
          data: dataSend,
        });
      } else {
        res.status(404).send({
          message: "Email is not available, please sign up",
          alert: false,
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).send({
        message: "Internal Server Error",
        alert: false,
      });
    }
  });


  //product section

  const schemaProduct = mongoose.Schema({
    name: String,
    category:String,
    image: String,
    price: String,
    description: String,
  });
  const productModel = mongoose.model("product",schemaProduct)
  

  //save product in data 
  app.post("/uploadProduct",async(req,res)=>{
    console.log(req.body);
    const data = await productModel(req.body)
    const datasave = await data.save()
    console.log(datasave);
    res.send({message : "upload successfully"})
  })

// 
app.get("/product",async(req,res)=>{
  const data =await productModel.find({})
  res.send(JSON.stringify(data))
})
//server is running
app.listen(PORT,()=>console.log("server is running at port : " + PORT))