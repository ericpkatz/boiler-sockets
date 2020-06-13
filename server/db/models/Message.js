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
  },
  dmId: {
    type: UUID,
    set: function(value){
      this.setDataValue('dmId', value || null);
    }
  }
}, {
  hooks: {
    afterCreate: function(message){
      //io.emit('message', message);
      return message.reload({
        include: [ db.models.user ]
      })
      .then( message => {
        if(socket.getIO()){
          if(!message.dmId){
            socket.getIO().emit('message', message);
          }
          else {
            socket.sendTo(message.dmId, message);
          }
        }
      });
    }
  }
})

module.exports = Message
