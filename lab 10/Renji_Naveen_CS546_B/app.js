// Setup server, session and middleware here.
const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');

app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(
  session({
    name: 'AuthCookie',
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: false,
    resave: false,
    //cookie: {maxAge: 60000}
  })
);

app.use('/protected', (req, res, next) => {
  if (!req.session.username) {
    return res.status(400).render('forbiddenAccess',{title:"Forbidden Access"});
  } else {
    next();
  }
});

app.use((req,res,next)=>{
  let curDate = new Date().toUTCString();
  let url = req.originalUrl;
  let method = req.method;

  let authMessage = "Authenticated User";
  if(!req.session.username)
    authMessage = "Non-Authenticated User";
  console.log(`[${curDate}]: ${method} ${url} (${authMessage})`);
  next();
})


configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});