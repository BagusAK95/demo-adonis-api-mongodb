'use strict'

const Model = use('Model')

class Article extends Model {
  static get dates () {
    return super.dates.concat(['published'])
  }
}

module.exports = Article
