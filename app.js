const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")


//express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://GogoMogo1989:1234@cluster0.dms2yv8.mongodb.net'
mongoose.connect(dbURI, )

//register view engine
app.set('view engine', 'ejs');


//listen for requiest
app.listen(3000);

//middleware & static files

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log('new request made: ');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next()
})

app.use((req, res, next) => {
    console.log('in the next middleware');
    next()
})


app.get('/', (req, res) => {
 
   res.redirect('./blogs')
});

app.get('/about', (req, res) => {

   res.render('about', { title: "About"})

});

app.get('/blogs', (res, req) => {
    Blog.find().sort({ createdAT: -1})
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch((err) => {
            console.log(error)
        })
})

app.post('/blogs', (req, res) => {

    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('./blogs')
        })
        .catch((err) => {
            console.log(error)
        })

})

app.get('/blogs/create', (req, res) => {

    res.render('create', { title: "Create"})

})

//404
app.use((req, res) => {

    res.status(404).render('404', { title: "404"})

})
