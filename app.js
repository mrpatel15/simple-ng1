var app = angular.module('firstApp', ['ui.bootstrap']);

app.controller('mainCtrl', function($scope, firstService) {
  var vm = this;
  vm.todos = [];
  vm.luke = {}
  vm.showMe = true;

  firstService
    .getLuke()
    .then(function(res) {
      console.log('res', res)
      vm.luke = res.data
      console.log('luke', vm.luke)
    })

  vm.addTodo = function(event) {
    event.preventDefault();
    vm.todos = firstService.addTodo(vm.todos, vm.newTodo);
    vm.newTodo = '';
  };
});

app.factory('firstService', function($http) {
  return {
    addTodo: function(todoList, newTodo) {
      var newTodoArray = [];
      todoList.push(newTodo);
      return todoList;
    },
    getLuke: function() {
      return $http.get(`https://swapi.co/api/people/1`)
    }
  };
});

app.component('todoList', {
  template: 'Hello world, this is my first {{vm.someVal}}.....{{vm.astring}}',
  controller: function() {
    var vm = this;

    vm.someVal = "component, dude."
  },
  bindings: {
    astring: '<'
  },
  controllerAs: 'vm'
})
