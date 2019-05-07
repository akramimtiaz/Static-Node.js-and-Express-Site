const express = require('express');
const data = require('./data.json');
const projects = data.projects;

const app = express();

console.log(projects.length);

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {

    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

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

app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log('No Page Found');
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, () => {
    console.log('app running on port 3000');
});

