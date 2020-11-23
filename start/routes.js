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
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Helpers = use('Helpers')

Route.on('/').render('welcome')

Route.post('/upload', 'UploadController.upload')
Route.get('/file', 'UploadController.getFile')
Route.get('/list', 'UploadController.listFiles')
Route.get('/delete', 'UploadController.deleteFile')