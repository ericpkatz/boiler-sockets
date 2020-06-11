const Sequelize = require('sequelize')
const { UUID, UUIDV4, STRING } = Sequelize;
const db = require('../db')

const Message = db.define('message', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  text: {
    type: STRING,
    allowNull: false
  },
  userId: {
    type: UUID,
    allowNull: false
  }
})

module.exports = Message
