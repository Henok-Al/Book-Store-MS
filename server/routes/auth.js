import express from 'express'
import { Admin } from '../models/Admin.js';
import { Student } from '../models/Student.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const router = express.Router();

router.post('/login', async (req, res) => {
    try{
    const {username, password, role} = req.body;
    if(role === 'admin') {
        const admin = await Admin.findOne({username})
        if(!admin) { 
            return res.json({message: "admin not registered"})
        }
        const validPassword = await bcrypt.compare(password, admin.password)
        if(!validPassword) {
            return res.json({message: "wrong password"})
        }

        //if everything is okay generate a token then store it on cookie
        const token = jwt.sign({username: admin.username, role: 'admin'}, process.env.Admin_Key)
        res.cookie('token', token, {httpOnly: true, secure: true})
        return res.json({login:true, role: 'admin'})
    } else if(role === 'student') {
        const student = await Student.findOne({username})
        if(!student) {
            return res.json({message: "student not registered"})
        }
        const validPassword = await bcrypt.compare(password, student.password)
        if(!validPassword) {
            return res.json({message: "wrong password"})
        }
        const token = jwt.sign({username: student.username, role: 'student'}, process.env.Student_Key)
        res.cookie('token', token, {httpOnly: true, secure: true})
        return res.json({login:true, role: 'student'})
    } else {

    }
    } catch(er) {
        res.json(er)
    }
})

export {router as AdminRouter}


