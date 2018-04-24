# Google Maps Application 

This is a NodeJS Express app which demonstrates implementing a Google API to show a region in the map.

## Getting Started

To get started simply clone this repository using `git clone https://github.com/cbartram/Google-maps-test.git`

install any dependencies with `npm install` and fire up the server with `npm start`

### Prerequisites

There is one pre-requisite dependency that is not listed in the package.json

Ensure that you install [Nodemon](https://github.com/remy/nodemon) so that the server
will be automatically reloaded with changes to the file system.

You can install this external dependency using `npm i -g nodemon`

### Installing

Once the project is cloned and dependencies are installed you can begin
to create the database and run the migrations.

Use postgres to create the database: `createdb google_maps` and then 
run the migrations using `sequelize db:migrate`.

At this point you should have a fully functioning database congratulations!

Finally we need to provide an Api key to the google maps API you can get a [Google Maps
API Key here](https://developers.google.com/maps/documentation/javascript/get-api-key)
and simply create a file in the root of your project called `.env`. Use this command `touch .env`

Once you've got the file created paste this line `GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY` and replace
`YOUR_GOOGLE_API_KEY` with your newly created key!

## Running the tests

Unit tests are still being written!


## Common Ways to Get Started

### Creating a new Route/Page

- go into `/routes/routeController` and add your new express route
- in the new express route ensure your `res.render('your_view')`
- create the new ejs view in the `views/` directory
- update links in the navbar/other pages to point to your route

### Creating a new User and Logging In

- To Create a new user go to the sign in page and submit the form!
- Note: The database must be operational for this to work
- You can login with your newly created credentials

## Deployment

This application can be deployed onto any machine with Node 6.0.0 or greater is installed.

Simply clone this repository to its production or test environment and follow the steps above to create a deployment

## Built With

* [NodeJS](https://nodejs.org/) - The non-blocking event driven server side IO system
* [Express](https://expressjs.com/) - The web framework used
* [EJS](http://ejs.co/) - Templating Engine
* [Postgres](https://www.postgresql.org/) - Database management System
* [Sequelize](docs.sequelizejs.com/) - Object relational mapper
* [NPM](https://www.npmjs.com/) - Dependency Management

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Jason Boykin** - *Project structure & Idea* - [dark5eid83](https://github.com/dark5eid83)
* **Christian Bartram** - *Backend Work* - [Cbartram](https://github.com/cbartram)

See also the list of [contributors](https://github.com/google-maps/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Jason for inspiring this project!
* Bootstrap for some great components
