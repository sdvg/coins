import angular from 'angular'
import TagsController from './tags.controller'
import tagsTpl from './tags.html'
import './tags.scss'

export default angular
  .module('tags', [])
  .component('tags', {
    templateUrl: tagsTpl,
    controller: TagsController
  })
