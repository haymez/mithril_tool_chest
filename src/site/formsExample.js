var formsExample = {};

formsExample.controller = function() {
  this.rootCtrl = new rootLayout.controller();
  var a = m.prop('hey');
  var inputObjects = [
    {
      tagName:     'input',
      type:        'text',
      placeholder: 'Enter Username',
      label:       'Username: ',
      inputClass:  'field',
    },
    {
      tagName:     'input',
      type:        'password',
      placeholder: 'Enter Password',
      label:       'Password: ',
      inputClass:  'field',
    },
    {
      tagName: 'select',
      value: 'Value 1',
      options: ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
      label: 'List: ',
      inputClass: 'field',
    },
    {
      tagName: 'input',
      type: 'checkbox',
      label: 'Finished: ',
      checked: false,
    }
  ];
  var fieldSets = [
    {
      legend: 'Example showcasing multiple types of inputs',
      inputs: inputObjects,
    },
  ];
  this.handleForm = function(data) {
    console.log(data);
  }
  this.forms = new forms.controller(fieldSets, this.handleForm);
}

formsExample.view = function(ctrl) {

  var content = m('.base-well', [
    m('h1', 'Forms'),
    forms.view(ctrl.forms),
  ]);
  return rootLayout.view(ctrl.rootCtrl, m('.fade-in#body', content));
}