const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory "database" of blog posts
const posts = [];

// Route to display all posts and form to add new post
app.get('/posts', (req, res) => {
  res.render('posts', { posts });
});

// Route to display form for creating a new post
app.get('/posts/new', (req, res) => {
  res.render('new-post');
});

// Route to handle form submission for a new post
app.post('/posts', (req, res) => {
  const { title, body } = req.body;
  const newPost = { id: posts.length + 1, title, body };
  posts.push(newPost);
  res.redirect('/posts');
});

// Route to display an individual post by ID
app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = posts.find(p => p.id === postId);

  if (post) {
    res.render('post', { post });
  } else {
    res.status(404).send('Post not found');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
