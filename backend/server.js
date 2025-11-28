import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import 'dotenv/config'
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import multer from "multer"

// app config
const app = express()
const port = process.env.PORT || 4000 

// middleware
app.use(express.json())
app.use(cors())
app.use("/images",express.static('uploads'))

// db connection
connectDB();


// api end point 
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
    res.send("API working")
})

app.get("/test",(req,res)=>{
    res.json({message:"Test route working"})
})

// Debug endpoint to test file upload
const testStorage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`test-${Date.now()}-${file.originalname}`)
    }
})
const testUpload = multer({storage:testStorage})

app.post("/test-upload", testUpload.single("image"), (req,res)=>{
    console.log("Test upload - Body:", req.body);
    console.log("Test upload - File:", req.file);
    if(req.file) {
        res.json({success:true, message:"File uploaded", file:req.file})
    } else {
        res.json({success:false, message:"No file received"})
    }
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})

