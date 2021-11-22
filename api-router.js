import express from "express";
import bodyParser from 'body-parser'
import {Auction} from "./models/auction.js";
import {UpdatePaintDTO} from "./models/update-dto-print.js";
import {UpdateDtoParticipation} from "./models/update-dto-participation.js";

export const apiRouter = express.Router();
apiRouter.use(bodyParser.json());

let auction = new Auction();
console.log(auction.paintings);
/**
 * GET
 * Главная страница аукциона
 * Картина по айди
 * Участники
 * */

apiRouter.get('/', (req, res, next) => {
    res.render('index.pug', {paintings: auction.paintings});
    next();
});
apiRouter.get('/get/:id', (req, res, next) => {
    let id = req.params.id;
    let el = auction.getPaintingByID(id);
    res.render("painting-card.pug", {el});
    next();
});
apiRouter.get('/participants', (req, res, next) => {
    res.render('participants.pug', {participants: auction.participants});
    next();
});
apiRouter.get('/settings', (req, res, next) => {
    res.render("settings.pug", {el: auction.params});
    next();
});

/**
 * POST
 * Добваить картину
 * Редактирование
 * Добавить участника
 * Редактирование настроек аукциона
 * Редактирование участника
 * */

apiRouter.post('/painting/add', (req, res, next) => {
    auction.addPainting(req.body.title,
        req.body.author,
        req.body.description,
        req.body.startPrice,
        req.body.minStep,
        req.body.maxStep,
        req.body.imgURL);
    next();
});
apiRouter.post('/edit/:id', (req, res, next) => {
    let dto = new UpdatePaintDTO({id: req.params.id, ...req.body});
    res.sendStatus(200);
    auction.editPaint(dto);
    next();
});
apiRouter.post('/participant/add', (req, res, next) => {
    res.sendStatus(200);
    auction.addParticipant(req.body.name, req.body.cashReserve, req.body.imgURL);
    console.log(req.body)
    next();
});
apiRouter.post('/settings/edit', (req, res, next) => {
    console.log(req.body);
    auction.setStartDateTime(req.body.dateTime);
    auction.setSaleTimeout(req.body.timeout);
    auction.setCountingTime(req.body.countingTime);
    auction.setPause(req.body.pause);
    res.sendStatus(200);
    next();

});
apiRouter.post('/participant/edit/:id', (req, res, next) => {
    let dto = new UpdateDtoParticipation({id: req.params.id, ...req.body});
    console.log(req.body);
    res.sendStatus(200);
    auction.editParticipant(dto);
    next();
});

/**
 * DELETE
 * Удалить картину
 * Удалить учасника
 * */

apiRouter.delete('/',(req, res, next) => {
    auction.paintings.splice(req.body.id, 1);
    next();
});
apiRouter.delete('/participant/',  (req, res, next) => {
    auction.removeParticipant(req.body.id);
    res.sendStatus(200);
    next();
});
