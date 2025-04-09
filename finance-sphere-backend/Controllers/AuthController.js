const logger = require('../configuration/logger');
const {ficomparePasswords, generateJwtToken } = require('../utils/authUtils');
const { findUserByEmail, hashPassword } = require('../utils/authUtils')
const signup=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const user=await findUserByEmail(email)
        if(user){
            return res.status(409)
                .json({message:"User Already exists!", success:false});
        }
     
       const hashedPassword = await hashPassword(password);

       
       const userModelNew = new userModel({ name, email, password: hashedPassword });
       await userModelNew.save();

       res.status(201).json({ message: "SignUp Successful", success: true });
   } catch (err) {
       logger.error(err);
       res.status(500).json({ message: "Internal server error", success: false });
   }
};




const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errorMsg = "Authentication failed!";

      
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

      
        const isPassEqual = await comparePasswords(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const jwtToken = generateJwtToken(user);

        res.status(200).json({
            message: "Logged In Successfully",
            success: true,
            jwtToken,
            data: {
                email: user.email,
                name: user.name,
            },
        });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};



module.exports={
    signup,
    login
}

