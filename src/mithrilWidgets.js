// Code for mithril widgets

var todo = {};

todo.Todo = function(data) {
  this.description = m.prop(data.description);
  this.done = m.prop(false);
};

todo.controller = function() {
  this.list = [];

  this.description = m.prop('');

  this.add = function() {
    this.list.push(new todo.Todo({description: this.description()}));
    this.description('');
  }.bind(this);
};

todo.view = function(ctrl) {
  return m('body', [
    m('input', {onchange: m.withAttr('value', ctrl.description), value: ctrl.description()}),
    m('button', {onclick: ctrl.add}, 'Add'),
    m('table', [
      ctrl.list.map(function(item, index) {
        return m('tr', [
          m('td', [
            m('input[type=checkbox]')
          ]),
          m('td', item.description()),
        ])
      })
    ])
  ])
};
var ctrl = new todo.controller();
m.module(document.body, todo)
