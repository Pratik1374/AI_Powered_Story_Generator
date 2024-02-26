import { signUpController } from "../controllers/authController";
import express from "express";


const router = express.Router();

//register route
router.post("/signup", signUpController);


// //protected route for user authentication
// router.get("/user-auth",requireSignIn,(req,res)=>{
//   res.status(200).send({ok:true});
// })


export default router;
