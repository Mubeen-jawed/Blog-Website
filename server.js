//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose")

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

let posts = []
// adding to db

mongoose.connect("mongodb+srv://Mubeen:blog@cluster1.pimiody.mongodb.net/blogDB", { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String
})

const Post = mongoose.model('post', blogSchema);




app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get('/', function (req, res) {
  Post.find({})
    .then(function () {
      res.render('home', { blogContent: homeStartingContent, postsArray: posts })
    })
})

app.get('/Contact', function (req, res) {
  res.render('contact', { contactText: contactContent })
})
app.get('/About', function (req, res) {
  res.render('about', { aboutText: aboutContent })
})


app.get('/Compose', function (req, res) {
  res.render('compose')
});

aboutContent.substring(0, 100)

app.post('/Compose', function (req, res) {

  // let post = {
  //   titleText: req.body.titleText,
  //   postText: req.body.postText
  // };

  const post = new Post({
    title: req.body.titleText,
    content: req.body.postText
  })

  post.save()
    .then(function () {
      console.log("blog is added to the home page");
      res.redirect('/');

    })
    .catch(function (err) {
      console.log("There was some error in adding page");
    })
  posts.push(post);
});

app.get('/posts/:postId', function (req, res) {

  let postId = req.params.postId;


  let storedTitle = posts._id;


  Post.findOne({ _id: postId })
    .then(function (post) {
      res.render('topic', { title: post.title, text: post.content }) //topic: storedTitle 
    })
    .catch(function (err) {
      console.log("Can't find the path");
    })


})






app.listen(3000, function () {
  console.log("Server started on port 3000");
});
