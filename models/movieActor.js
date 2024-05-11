module.exports = (sequalize,type) => {
    const MovieActor = sequalize.define('movie_actors',{
        id:{type: type.INTEGER, primaryKey:true, autoIncrement: true},
        movieId: type.INTEGER,
        ActorId: type.INTEGER
    });
    return MovieActor;
};