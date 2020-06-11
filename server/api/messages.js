const router = require('express').Router()
const {Message, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      include: [
        User
      ]
    })
    res.json(messages)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next)=> {
  Message.create({...req.body, userId: req.user.id})
    .then( message => message.reload({ include: [User]}))
    .then( message => res.send(message))
    .catch(next);

});
