var formsExample = {};

formsExample.controller = function() {
  this.rootCtrl = new rootLayout.controller();
  var a = m.prop('hey');
  var inputObjects = [
    {
      id: 'id1',
      placeholder: 'Text Here',
      inputType: 'input',
      type: 'text',
      value: 'Test',
      listener: 'onkeyup',
    },
    {
      inputType: 'input',
      type: 'text',
      placeholder: 'More Text',
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