import Connect from '../model/contactSchem.js'
import mongoose from 'mongoose'


export const getAllData = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
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
    });

  } catch(err) {
    res.render('500' , {message : err})
  }
  
}

// export const showAllData = async (req, res) => {
//   const getData = await Connect.find()
//   res.json(getData)
// }
// export const addData = async (req, res) => {
//   const getData = await Connect.find()
//   res.json(getData)
// }
// export const addNewData = async (req, res) => {
//   const getData = await Connect.find()
//   res.json(getData)
// }
// export const updateData = async (req, res) => {
//   const getData = await Connect.find()
//   res.json(getData)
// }
// export const updateNewData = async (req, res) => {
//   const getData = await Connect.find()
//   res.json(getData)
// }
// export const deleteData = async (req, res) => {
//   const getData = await Connect.find()
//   res.json(getData)
// }