const router = require('express').Router()
const {Message, User} = require('../db/models')
const Sequelize = require('sequelize');
module.exports = router

router.get('/', async (req, res, next) => {
  if(!req.user){
    try {
      const messages = await Message.findAll({
        order: [['createdAt', 'DESC']],
        include: [
          User,
          {
            model: User, as: 'dm'
          }
        ],
        where: {
          dmId: {
            [Sequelize.Op.eq] : null
          }
        }
      })
      res.json(messages)
    } catch (err) {
      next(err)
    }
  }
  else {
    try {
      const messages = await Message.findAll({
        order: [['createdAt', 'DESC']],
        include: [
          User,
          {
            model: User, as: 'dm'
          }
        ],
        where: {
          [Sequelize.Op.or] : [
            {
              dmId: { [Sequelize.Op.eq]: null }
            },
            {
              dmId: { [Sequelize.Op.eq]: req.user.id }
            },
            {
              userId: { [Sequelize.Op.eq]: req.user.id }
            }
          ]
        }
      })
      res.json(messages)
    } catch (err) {
      next(err)
    }

  }
})

router.post('/', (req, res, next)=> {
  Message.create({...req.body, userId: req.user.id})
    .then( message => message.reload({ include: [User, { model: User, as: 'dm'}]}))
    .then( message => res.send(message))
    .catch(next);

});
