const express = require('express');

const { Genre } = require('../db');

function create(req, res, next){
    res.send('Lists  create');
}

function list(req, res, next) {
    Genre.findAll()
    .then(objects => res.json(objects))
    .catch();
}

function index(req, res, next){
    res.send(`Lists => index => ${req.params.id}`);
}

function replace(req, res, next){
    res.send(`Lists => replace => ${req.params.id}`);
}

function update(req, res, next){
    res.send(`Lists => update => ${req.params.id}`);
}

function destroy(req, res, next){
    res.send(`Lists => destroy => ${req.params.id}`);
}

module.exports = { create, list, index, replace, update, destroy};
