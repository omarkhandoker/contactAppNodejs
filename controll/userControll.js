import Connect from '../model/contactSchem.js'
import mongoose from 'mongoose'
import { validationResult } from 'express-validator'
import uploadFile from '../model/fileSchem.js'
import userLog from '../model/userLog.js'
import bcrypt from 'bcrypt'



export const getAllData = async (req, res) => {
  try {
    const { page = 1, limit = 4 } = req.query;
    const option = {
      page : parseInt(page),
      limit : parseInt(limit)
    }
    const result = await Connect.paginate({}, option);
    

    res.render("home", {
      totalDocs: result.totalDocs,
      limit: result.limit,
      totalPages: result.totalPages,
      currentPage: result.page,
      counter: result.pagingCounter,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      getData: result.docs,
      view : req.session.view
    });

  } catch(err) {
    res.render('500' , {message : err})
  }
  
}

export const showAllData = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render('404' , {message : 'Invalid Id'})
  }
  try {
    const getData = await Connect.findById(req.params.id)
    if (!getData) return res.render("404", { message: "User Not Found" });
    return res.render('show' , {getData})
  } catch (err) {
     res.render("500", { message: err });
  }
}

export const addData = async (req, res) => {
  try {
    await res.render('add')
  } catch (err) {
      res.render("500", { message: err });
  }
}

export const addNewData = async (req, res) => {
  try {
    const error = validationResult(req);
    if (error.isEmpty()) {
      await Connect.create(req.body);
      const { page = 1 ,limit = 5 } = req.query
      
      const option = {
        page: parseInt(page),
        limit : parseInt(limit)
      }

      const result = await Connect.paginate({}, option)

      var a = result.totalPages;
        res.redirect(`/?page=${a}`);
    } else {
      res.send(error)
    }

    
  } catch(err) {
      res.render("500", { message: err });
  }

}
export const updateData = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render("404", { message: "Invalid Id" });
  }
  try {
    const getData = await Connect.findById(req.params.id);
    if(!getData) return res.render("404", { message: "User Not Found" });
    res.render('update', {getData})
  } catch (err) {
     res.render("500", { message: err });
  }
}

export const updateNewData = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
     return res.render("404", { message: "Invalid Id" });
  }
  try {
    const error = validationResult(req)
    if (error.isEmpty) {
      const getData = await Connect.findByIdAndUpdate(req.params.id, req.body);
      if (!getData) return res.render("404", { message: "User Not Found" });
      res.redirect("/");
    } else {
      res.send(error);
    }
    
  } catch (err) {
    res.render("500", { message: err });
  }
  const getData = await Connect.find()
  res.json(getData)
}


export const deleteData = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render("404", { message: "Invalid Id" });
  }
  try {
    const getData = await Connect.findByIdAndDelete(req.params.id);
    if(!getData) return res.render('404' , {message : "Invalid Id"})
    return res.redirect("/");
  } catch (err) {
    res.render("500", { message: err });
  }
}

export const addingImg = (req, res) => {
  res.render('imgadd')
}

export const addUser = async (req, res) => {
  try {
    const newUser = await uploadFile.create({
      name: req.body.name,
      image: req.file.filename,
    });
    res.json(newUser)
  } catch (err) {
     res.render("500", { message: err });
  }
}


export const userLogin = async (req, res) => {
  if (req.session.user) {
  res.redirect("/");
  } else {
     res.render("login", { error: null });
 }
  
}

export const userLoginPost = async (req, res) => {
  const { userName, userPassword } = req.body;
  
  const user = await userLog.findOne({ userName });
  if (!user) return res.render('login', { error: "User Not Found" })
  

  const isMatch = await bcrypt.compare(userPassword, user.userPassword)
  if (!isMatch) return res.render('login', { error: "Invalid Password" })
  
  return res.redirect('/')
  
}

export const userSing = async (req, res) => {
  if (req.session.user) {
    res.redirect('/')
  } else {
    res.render("singUp");
  }
};

export const userSingPost = async (req, res) => {
  const { name, userName, userPassword } = req.body;
  const userHash = await bcrypt.hash(userPassword ,10)
  await userLog.create({ name, userName, userPassword: userHash });
  req.session.user = userName;
  res.redirect("/")
};

