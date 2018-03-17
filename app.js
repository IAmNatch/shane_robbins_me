const express = require('express');
const nunjucks = require('nunjucks')
const sanityClient = require('@sanity/client')
const app = express();
// Seed Data
const errorSeed = require('./seed-data/errorData.js');

// Dev Env
const isDev = app.get('env') === 'development';
//
const mediumHelpers = require('./lib/mediumHelpers');
const sanityHelpers = require('./lib/sanityHelpers')

//Init Nunjucks
nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

//Init Sanity Client
const client = sanityClient({
  projectId: 'dzohyqpu',
  dataset: 'production',
  token: 'skUYulTbzMrqyy0JQqr7sNmdXm6aBwO528A5OL5M3BJ0VTBjUJC8T1UvQhLP2DIC4rvIDvZPPsUnMT08QsNKfLGNKxgadpmLsZaKa7YyYzgTpiCUR0jiZHO4pzoRSBwMDUCR3Kaaep037s4muULW4oJ2Yrz9GzGxy8hsoVr4SBeJRweTcL1l',
  useCdn: true // `false` if you want to ensure fresh data
})




app.use(express.static('public'));


app.set('view engine', 'njk');

app.get('/', async (req, res) => {
    let mediumArticles = await mediumHelpers.getMediumArticles('shanerobbins');
    let sanityPageData = await sanityHelpers.getPage(client, 'Home')
    let sanityProjects = await sanityHelpers.getProjects(client);
    let homeData = {
        ...sanityPageData,
        articles: mediumArticles,
        projects: sanityProjects,
    }
    res.render('views/index', homeData);
});

app.get('/contact', async (req, res) => {
    let sanityPageData = await sanityHelpers.getPage(client, 'Contact')
    let contactData = {
        ...sanityPageData,
    }
    res.render('views/contact', contactData);
});

app.get('/about', async (req, res) => {
    let sanityPageData = await sanityHelpers.getPage(client, 'About')
    let aboutData = {
        ...sanityPageData,
    }
    res.render('views/about', aboutData);
});
app.get('/*', (req, res) => {
    res.render('views/404', errorSeed);
});



app.listen((process.env.PORT || 5000), () => {
    console.log(`shanerobbins.me server running on port: ${(process.env.PORT || 5000)}`);
});
