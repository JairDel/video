const express = require('express');
const { Movie, Actor } = require('../db');

function create(req, res, next){
    const title = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;

    Movie.create({
        title:title,
        genreId: genreId,
        directorId: directorId
    }).then(object => res.json(object))
    .catch(err => res.send(err));
}

function list(req, res, next) {
    Movie.findAll({include:['genre', 'director', 'actors']}).then(objects => res.json(objects))
    .catch(err => res.send(err));
}

function addActor(req, res, next){
    const idMovie = req.body.idMovie;
    const idActor = req.body.idActor;

    Movie.findByPk(idMovie).then(movie => {
        Actor.findByPk(idActor).then(actor => {
            movie.addActor(actor);
            res.json(movie);
        }).catch(err => res.send(err));
    }).catch(err => res.send(err));
}

function index(req, res, next){
    res.send(`Movie => index => ${req.params.id}`);
}

function replace(req, res, next){
    res.send(`Movie => replace => ${req.params.id}`);
}

function update(req, res, next){
    res.send(`Movie => update => ${req.params.id}`);
}

function destroy(req, res, next){
    res.send(`Movie => destroy => ${req.params.id}`);
}

module.exports = { create, list, index, replace, update, destroy, addActor};
