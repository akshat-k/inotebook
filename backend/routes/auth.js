const { request } = require('express');
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SCERET = "aks";

//ROUTE-1 for create user

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be less than 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let sucess = false
    console.log(req.body);
    //If there are errors then return errors with status 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }
    // Returing a promise if the user creation is successful

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({sucess, error: "Email address already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);// we put await as fuction returns promise and function may take time to respond
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        // user can also be created like this
        /* then(user => res.json(user))
            .catch(err => {
                console.log(err)
                res.json({ error: 'Enter a unique email address',message:err.message });
            })}*/

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SCERET)
        //res.json(user); This will send a whole user related data in respone
        sucess= true // Indicator if insertion was sucessfull
        res.json({ sucess,authToken }); // This will return JWT authorization token in response which will be unique and we cal also verify if any data has been modified or not
    }
    catch (error) {
        console.error(error.message)
    }
})

//Route 2 : Check for login

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let sucess = false
    console.log(req.body);
    //If there are errors then return errors with status 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { email, password } = req.body; // getting hte vakue enter by user on login page
    try {
        const user = await User.findOne({ email });// finding the email from DB ; will return true false
        console.log(user.email);
        if (!user) {
            res.status(400).json({ sucess,error: "Please use correct credentials to login" });
        }

        passwordcompare = await bcrypt.compare(password, user.password);//comparing hte passoword
        console.log(passwordcompare, password);
        if (!passwordcompare) {
            console.log(passwordcompare, password);
            res.status(400).json({ sucess,error: "Please use correct credentials to login" });
        }
        //if sucessful the send an auth token same as above
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SCERET)
        sucess = true
        res.json({ sucess,authToken });
    } catch (error) {
        console.error(error.message)
        //res.status(500).send({ error: "Internal server error" });
    }
})

//Route-3 : 

//This fetchuser fucntion is passed to verify the auth token for specific user.
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password"); // . select is used to select evrything from user except password
        res.send(user);

    } catch (error) {
        console.error(error.message)
    }
})

module.exports = router 