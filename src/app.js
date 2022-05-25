const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000
//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Santosh Kumar Sriramadasu",
        authorTitle: "Full Stack Developer" 
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About page",
        name: "Santosh Kumar Sriramadasu",
        authorTitle: "Full Stack Developer" 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        name: "Santosh Kumar Sriramadasu",
        authorTitle: "Full Stack Developer" 
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorInfo: "No such help article found!"
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "No query address."
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: "Geocode error: " + error
            })
        }

        weather(latitude, longitude, location, (error, weatherData) => {
            if (error) {
                return res.send({
                    error: "Weather error: " + error
                })
            }
            res.send({
                weatherData: weatherData,
                location,
                address: req.query.address
            })

        })

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "No query string"
        })
    }

    res.send({
        products: []
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        errorInfo: "No such page found!"
    });
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})