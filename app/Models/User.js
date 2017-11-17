'use strict'

const Model = use('Model')

class User extends Model {
  static get hidden () {
       return ['password']
  }
}

module.exports = User
