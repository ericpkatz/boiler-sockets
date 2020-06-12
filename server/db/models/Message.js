const socket = require('../../socket');

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
}, {
  hooks: {
    afterCreate: function(message){
      //io.emit('message', message);
      return message.reload({
        include: [ db.models.user ]
      })
      .then( message => {
        console.log(message)
        if(socket.getIO()){
          socket.getIO().emit('message', message);
        }
      });
    }
  }
})

module.exports = Message
