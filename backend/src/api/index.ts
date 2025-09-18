import { Router } from 'express';
import Services from './services';
import { time } from 'console';

const router = Router();

router.get('/', async (req, res) => {
    res.send('Hello, World!');
});

router.get('/day/:dayId', async (req, res) => {
    const day = await Services.getDay(parseInt(req.params.dayId, 10));
    if (!day) {
        res.status(404);
    }
    res.json(day);
});

router.post('/reserve/:dayId/:timeslotId', async (req, res) => {
    const dayOfTheWeek = parseInt(req.params.dayId, 10)
    const timeslotId = parseInt(req.params.timeslotId, 10)
    const body = req.body;
    const timeslot = await Services.reserveTimeslot(dayOfTheWeek, timeslotId, body);
    if (!timeslot) {
        res.status(404);
    }
    res.json(timeslot);
});

router.post('/unreserve/:dayId/:timeslotId', async (req, res) => {
    const dayOfTheWeek = parseInt(req.params.dayId, 10)
    const timeslotId = parseInt(req.params.timeslotId, 10)
    const timeslot = await Services.unreserveTimeslot(dayOfTheWeek, timeslotId);
    if (!timeslot) {
        res.status(404);
    }
    res.json(timeslot);
});

export default router;