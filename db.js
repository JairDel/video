const Sequelize = require('sequelize');
const genreModel = require('./models/genre');
const directorModel = require('./models/director');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const movieActorModel = require('./models/movieActor');

const copyModel = require('./models/copy');
const bookingModel = require('./models/booking');
const memberModel = require('./models/member');
// Para conectar a una base de datos:
// 1) Nombre de la base de datos
// 2) Usuario de la base de datos
// 3) Constraseña de la base de datos
// 4) Objeto con la configuracion del ORM.

const sequelize =  new Sequelize('video-club',
'root', 'abcd1234', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

const Genre = genreModel(sequelize, Sequelize);
const Director = directorModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);

const Copy = copyModel(sequelize, Sequelize);
const Booking = bookingModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);

Movie.hasMany(Copy, { as: 'copies' });
Copy.belongsTo(Movie, { as: 'movie' });

Copy.hasMany(Booking, { as: 'bookings' });
Booking.belongsTo(Copy, { as: 'copy' });

Member.hasMany(Booking, { as: 'bookings' });
Booking.belongsTo(Member, { as: 'member' });


Member.hasMany(Booking, { as: 'bookings' });
//un genero puede tener muchas peliculas, 
Genre.hasMany(Movie, {as: 'movies'});

//pero un pelicula puede tener solo un genero
Movie.belongsTo(Genre, {as: 'genre'});

//un director puede tener muchas peliculas
Director.hasMany(Movie, {as: 'movies'});

// una pelicula solo puede tener un director
Movie.belongsTo(Director, {as: 'director'});

MovieActor.belongsTo(Actor, {foreignKey: 'actorId'});

Actor.belongsToMany(Movie,{
    foreignKey: 'movieId',
    as: 'movies',
    through: 'movie_actors'
});

// una pelicula participan muchos actores
MovieActor.belongsTo(Movie, {foreignKey: 'movieId'});

Movie.belongsToMany(Actor,{
    foreignKey: 'actorId',
    as: 'actors',
    through: 'movie_actors'
});


sequelize.sync({
    force:true
}).then(()=>{
    console.log("Base de datos actualizada");
});

module.exports = {Genre, Director, Movie, Actor, Copy, Booking, Member};
