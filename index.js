const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol this is so funny'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Saki',
        comment: 'Hey delete that lol'
    },
    {
        id: uuid(),
        username: 'pochi1203',
        comment: 'the hell was that'
    },
]

// display all comments: index
app.get('/comments', (req,res) => {
    res.render('comments/index', {comments})
})

// form to create a new comment: New 
app.get('/comments/new', (req,res) => {
    res.render('comments/new')
})

// creates new comment on server: Create
app.post('/comments', (req,res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuid() })
    res.redirect('/comments');
})

// details for one specific comment: Show
app.get('/comments/:id', (req,res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', {comment});
})

// Form to edit specific comment:  Edit 
app.patch('/comments/:id', (req,res) => {
    const {id} = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})

app.get('/comments/:id/edit', (req,res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', {comment})
})

// deletes specific item on server: Destroy
app.delete('/comments/:id', (req,res) => {
    const {id} = req.params;
    // const foundComment = comments.find(c => c.id === id);
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.listen(8080, (req,res) => {
    console.log("ON PORT 8080")
})

app.get('/tacos', (req,res) => {
    res.send("GET /tacos response")
})
app.post('/tacos', (req,res) => {
    const {meat,qty} = req.body;
    console.log(req.body)
    res.send(`Purchased ${qty} ${meat} tacos. Please wait.`)
})