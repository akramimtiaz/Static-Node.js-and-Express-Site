const express = require('express');
const data = require('./data.json');
const projects = data.projects;

const app = express();

/*set the view engine to pug*/
app.set('view engine', 'pug');

/*static route to serve the static files located in the public folder */
app.use('/static', express.static('public'));

/*Index route (/) to render the "Home" page*/
app.get('/', (req, res) => {
    res.render('index', { projects });
});

/*About route (/about) to render the "About" page*/
app.get('/about', (req, res) => {
    res.render('about');
});

/*Dynamic Project routes (/project<id>) to render a customized version of 
  the Pug project template to show off each project dependent on the supplied id*/
app.get('/project:id', (req, res) => {

    const index = parseInt(req.params.id);
    if(index >= 0 && index < projects.length){
        const data = {
            id: projects[index].id,
            name: projects[index].project_name,
            description: projects[index].description,
            technologies: projects[index].technologies,
            live: projects[index].live_link,
            github: projects[index].github_link,
            images: projects[index].image_urls.slice(1)
        };
        return res.render('project', data);
    }else{
        res.redirect('error'); 
    }
});

/*If no matching route exists*/
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

/*Error handler*/
app.use((err, req, res, next) => {
    console.log(`${req.path} - ${err.status} - it appears this page was not found.`);
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

/*The port on which our App is running*/
app.listen(3000, () => {
    console.log('app running on port 3000');
});

