const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // for serving CSS files
app.set('view engine', 'ejs');

// Sample data (jobs)
let jobs = [
  { id: 1, title: "Software Engineer", description: "Full-time software engineering position" },
  { id: 2, title: "Web Developer", description: "Part-time web developer position" },
];

// Routes
app.get('/', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  // Handle registration (For now, just redirect to main)
  res.redirect('/main');
});

app.get('/main', (req, res) => {
  res.render('main', { jobs, loggedIn: false });
});

app.get('/main/logged-in', (req, res) => {
  res.render('main', { jobs, loggedIn: true });
});

app.get('/job/:id', (req, res) => {
  const jobId = req.params.id;
  const job = jobs.find(j => j.id == jobId);
  if (job) {
    res.render('jobDetails', { job, loggedIn: req.query.loggedIn === 'true' });
  } else {
    res.send("Job not found");
  }
});

app.get('/add-job', (req, res) => {
  res.render('addJob');
});

app.post('/add-job', (req, res) => {
  const { title, description } = req.body;
  jobs.push({ id: jobs.length + 1, title, description });
  res.redirect('/main/logged-in');
});

// Start server
app.listen(PORT, () => {
  console.log ('Server running on http://localhost:${PORT}');
});