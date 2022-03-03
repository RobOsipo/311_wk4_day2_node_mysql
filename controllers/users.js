const mysql = require("mysql")
const pool = require("../sql/connection")
const { handleSQLError } = require("../sql/error")

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users AS u JOIN usersAddress AS ua ON u.id = ua.user_id JOIN usersContact AS uc ON u.id = uc.user_id", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = "SELECT * FROM ?? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users','id',req.params.id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "INSERT INTO ?? (??,??) VALUES (?, ?)"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["users","first_name","last_name", req.body.first_name, req.body.last_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const createUsersAddress = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "INSERT INTO ?? (??,??,??,??,??,??) VALUES (?, ?, ?, ?, ?, ?)" 
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["usersAddress","user_id","address","city", "state", "zip", req.body.user_id, req.body.address, req.body.city, req.body.state, req.body.zip])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const createUsersContact = (req, res) => { 
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "INSERT INTO ?? (??,??,??,??) VALUES (?, ?, ?, ?)"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["usersContact","user_id","phone1","phone2","email", req.body.user_id, req.body.phone1, req.body.phone2, req.body.email])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}


const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = "UPDATE ?? SET ?? = ?, ?? = ? WHERE id = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users','first_name',req.body.first_name,'last_name',req.body.last_name,req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(200).json(results);
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = "DELETE FROM ?? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["users","first_name",req.params.first_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}