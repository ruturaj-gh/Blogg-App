require('dotenv').config({path : __dirname+'/.env'});
const express = require('express');
const cors=require('cors');
const User=require('./models/User');
const app=express();
app.use('/uploads',express.static(__dirname+'/uploads'));
const Post=require('./models/Post')
const cookieParser=require('cookie-parser');
app.use(cors({credentials:true,origin:`http://localhost:3000`}));
app.use(express.json());
const jwt=require('jsonwebtoken');
const multer=require('multer');
const uploadMiddleware=multer({dest: './uploads/'});
app.use(cookieParser());
const bcrypt=require('bcryptjs'); 
//use this for hashing passwords
const fs=require('fs')
const salt=bcrypt.genSaltSync(10);
const mongoose=require('mongoose');
mongoose.connect(process.env.DATABASE);
app.post('/register',async (req,res)=>{
  const username=req.body.username;
  const password=req.body.password;
  try{
    const userDoc=await User.create(
      {
        username,
        password: bcrypt.hashSync(password,salt)
      }
    );
  res.json(userDoc);
  }catch(err){
    res.status(400).json(err);
  }
  
  
});

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const userDoc = await User.findOne({ username });
    if (userDoc) {
      const passok = bcrypt.compareSync(password, userDoc.password);
      if (passok) {
        jwt.sign({ username, id: userDoc._id }, process.env.JWT, { expiresIn: '1h' }, (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json({
            id: userDoc._id,
            username,
          });
        });
      } else {
        res.status(400).json({ error: 'Wrong credentials' });
      }
    } else {
      res.status(400).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/profile',async (req,res)=>{

  const token=req.cookies.token;
  jwt.verify(token,'secretkey',{},(err,info)=>{
    if(err)  throw err;
    res.json(info);
  });
}
);
app.post('/post', uploadMiddleware.single('file'),async (req,res)=>{
  console.log(req.file);
  const {originalname,path} = req.file;
  const parts=originalname.split('.');
  const ext=parts[parts.length-1];
  const newpath=path+'.'+ext;
  fs.renameSync(path,newpath);
  const {token}=req.cookies;
  jwt.verify(token,'secretkey',{},async (err,info)=>{
    if(err) throw err;
    const {id,title,summary,content} =req.body;
    const postDoc=await Post.create({
      id,
      title,
      summary,
      content, 
      cover:newpath,
      author:info.id,
  });
    res.json(postDoc);
  });
 
});
app.get('/post',async (req,res)=>{
  res.json(
    await Post.find()
    .populate('author',['username'])
    .sort({createdAt: -1})
    .limit(20)
  );
});
app.post('/logout',(req,res)=>{
  res.cookie('token','').json('ok');
});
app.get('/post/:id',async(req,res)=>{
  const {id} =req.params;
  const posdDoc=await Post.findById(id).populate('author',['username']);
  res.json(posdDoc);
});

app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.update({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });

});

app.listen(4000,()=>console.log(`server started on port 3000`));


// NDyuB9oBSlpTdoVL

// 
