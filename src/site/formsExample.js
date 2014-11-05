var formsExample = {};

formsExample.controller = function() {
  this.rootCtrl = new rootLayout.controller();
  var a = m.prop('hey');
  var inputObjects = [
    {
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
    },
    {
      inputType: 'select',
      value: 'Value 1',
      options: ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
    }
  ];
  this.handleForm = function(data) {
    console.log(data);
  }
  this.forms = new forms.controller(inputObjects, this.handleForm);
}

formsExample.view = function(ctrl) {

  var content = m('.base-well', [
    m('h1', 'Forms'),
    forms.view(ctrl.forms),
  ]);
  return rootLayout.view(ctrl.rootCtrl, m('.fade-in#body', content));
}