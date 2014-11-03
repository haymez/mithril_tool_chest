var formsExample = {};

formsExample.controller = function() {
  this.rootCtrl = new rootLayout.controller();
  var a = m.prop('hey');
  var inputObjects = [
    {
      element: m('input', {type: 'text', placeholder: 'Text Here'}),
      value: 'Test',
      id: 'id1',
      listener: 'onkeyup',
    },
    {
      element: m('input', {type: 'text', placeholder: 'More Text'}),
      value: 'Another test',
      id: 'id2',
    },
  ];
  this.forms = new forms.controller(inputObjects);
}

formsExample.view = function(ctrl) {

  var content = m('.base-well', [
    m('h1', 'Forms'),
    forms.view(ctrl.forms),
  ]);
  return rootLayout.view(ctrl.rootCtrl, m('.fade-in#body', content));
}