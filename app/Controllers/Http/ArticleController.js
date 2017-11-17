'use strict'
const Article = use('App/Models/Article')

class ArticleController {
  index () {
    return Article.all() //Doc: https://www.npmjs.com/package/lucid-mongo
  }

  store ({request}) {
    return Article.create(request.all()) //Doc: http://adonisjs.com/docs/4.0/request#_request_body
  }

  show({params}){
    return Article.where({"_id" : params.id})
                  .fetch()
  }

  update({params, request}){
    return Article.where({"_id" : params.id})
                  .update(request.all())
  }

  destroy({params}){
    return Article.where({"_id" : params.id})
                  .delete()
  }

  paginate({params}){
    return Article.query()
                  .paginate(Number(params.page), Number(params.limit)) //Doc: https://www.npmjs.com/package/lucid-mongo
  }

  filter({request}){
    return Article.where(request.all())
                  .fetch()
  }
}

module.exports = ArticleController
