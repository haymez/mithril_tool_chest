var formsExample = {};

formsExample.controller = function() {
  this.rootCtrl = new rootLayout.controller();
  var a = m.prop('hey');


  this.formChanged = function(data) {
    console.log('Form Changed: ', data, data);
  }


  var test = function(data) {
    console.log('button callback. this: ', data);
  }


  var inputObjects = [
    {
      tagName:     'input',
      placeholder: 'Enter Username',
      label:       'Username: ',
      groupClass:  'field',
    },
    {
      tagName:     'input',
      type:        'password',
      placeholder: 'Enter Password',
      label:       'Password: ',
      groupClass:  'field',
    },
    {
      tagName: 'select',
      value: 'Value 1',
      options: ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
      label: 'List: ',
      groupClass: 'field',
    },
    {
      tagName: 'input',
      type: 'checkbox',
      label: 'Finished: ',
      checked: false,
    },
    {
      tagName: 'button',
      label: 'Submit: ',
      textValue: 'Custom Callback',
      groupClass: 'field',
      class: 'base-btn base-btn-success',
      callback: test,
    },
  ];
  var fieldSets = [
    {
      legend: 'Example showcasing multiple types of inputs',
      inputs: inputObjects,
    },
  ];

  var formOpts = {
    showUndo: true,
    undoClass:          'base-btn base-btn-primary',
    redoClass:          'base-btn base-btn-secondary',
    cancelChangesClass: 'base-btn base-btn-error',
    undoGroupClass:     'undo-group',
  }

  this.forms = new forms.controller(fieldSets, this.formChanged, formOpts, this);
}


formsExample.view = function(ctrl) {

  var content = m('.base-well', [
    m('h1', 'Forms'),
    forms.view(ctrl.forms),
  ]);
  return rootLayout.view(ctrl.rootCtrl, m('.fade-in#body', content));
}