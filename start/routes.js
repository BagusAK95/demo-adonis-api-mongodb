'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.get('/articles', 'ArticleController.index')
  Route.get('/articles/:page/:limit', 'ArticleController.paginate')
  Route.post('/articles/filter', 'ArticleController.filter')
  Route.post('/articles', 'ArticleController.store')
  Route.get('/articles/:id', 'ArticleController.show')
  Route.put('/articles/:id', 'ArticleController.update')
  Route.delete('/articles/:id', 'ArticleController.destroy')
}).prefix('api/v1')
