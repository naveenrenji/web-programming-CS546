//require express, express router and bcrypt as shown in lecture code
const helper = require('../helpers');
const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const bcrypt = require('bcryptjs');



router
  .route('/')
  .get(async (req, res) => {
    if(req.session.username)
      return res.redirect('/protected');
    //code here for GET
    try {
      res.render('userLogin', { title: "userLogin", error: "hidden" });
    }
    catch (e) {
      res.status(500).json({ error: e.message });
    }
  })

router
  .route('/register')
  .get(async (req, res) => {
    if(req.session.username)
      return res.redirect('/protected');
    //code here for GET
    try {
      res.render('userRegister', { title: "userRegister", error: "hidden" });
    }
    catch (e) {
      res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let username = req.body.usernameInput;
    let password = req.body.passwordInput;
    try {
      username = helper.checkUserName(username, 'username');
      password = helper.checkPassword(password, 'password');
    }
    catch (e) {
      return res.status(400).render('userRegister', { title: "userRegister", error: "" });
    }
    try {
      const a = await userData.createUser(username, password);
      if (a.userInserted) {
        res.redirect("/");
      }
      else {
        res.status(500).json({ error: e.message });
      }
    }
    catch (e) {
      res.status(400).render('userRegister', { title: "userRegister", error: "" });
    }
  })

router
  .route('/login')
  .post(async (req, res) => {
    //code here for POST
    let username = req.body.usernameInput;
    let password = req.body.passwordInput;
    try {
      username = helper.checkUserName(username, 'username');
      password = helper.checkPassword(password, 'password');
    }
    catch (e) {
      return res.status(400).render('userLogin', { title: "userLogin", error: "" });
    }
    try {
      const a = await userData.checkUser(username, password);
      if (a.authenticatedUser) {
        const now = new Date();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);
        req.session.username = username;
        // Providing a third parameter is optional, but allows you to set options for the cookies.
        // see: http://expressjs.com/en/api.html#res.cookie
        // for details on what you can do!
        res.cookie('AuthCookie', now.toString(), { expires: expiresAt });
        req.session.username = username;
        res.redirect('/protected');
      }
      else {
        throw 'Internal Server Error';
      }
    }
    catch (e) {
      return res.status(400).render('userLogin', { title: "userLogin", error: ""});
    }
  })

router
  .route('/protected')
  .get(async (req, res) => {
    //code here for GET
    try {
      res.render('private', { title: "View Page", username: req.session.username, dateAndTime: new Date(Date.now()) });
    }
    catch (e) {
      res.status(500).json({ error: e.message });
    }
  })

router
  .route('/logout')
  .get(async (req, res) => {
    //code here for GET
    try {
      console.log('now clearing the cookie');

      const anHourAgo = new Date();
      anHourAgo.setHours(anHourAgo.getHours() - 1);

      // invalidate, then clear so that lastAccessed no longer shows up on the
      // cookie object
      res.cookie('AuthCookie', '', { expires: anHourAgo });
      res.clearCookie('AuthCookie');
      res.render('logout');
    }
    catch (e) {
      res.status(500).json({ error: e.message });
    }
  })


  module.exports = router;