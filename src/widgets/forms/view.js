forms.view = function(ctrl) {
  var currFieldsetIndex = null;

  var undoButtons = m('.undoButtons', [
    m('button', {
      onclick: ctrl.undo,
      style: {display: (ctrl.undoStack.length > 0) ? 'block' : 'none'},
    }, 'Undo'),
    m('button', {
      onclick: ctrl.redo,
      style: {display: (ctrl.redoStack.length > 0) ? 'block' : 'none'},
    }, 'Redo'),
    m('button', {
      onclick: ctrl.cancelChanges,
      style: {display: (ctrl.undoStack.length > 0) ? 'block' : 'none'},
    }, 'Cancel All Changes'),
  ]);

  var handleInputs = function(input, index) {
    var itemId = 'id' + currFieldsetIndex + index;
    var element = m(input.tagName, {
      id: itemId,
      type: input.type || 'input',
    });
    element.attrs[input.listener || 'onchange'] = ctrl.inputChanged;
    element.attrs[(input.checked != undefined) ? 'checked' : 'value'] = ctrl.formData[itemId]();
    if(input.placeholder) element.attrs.placeholder = input.placeholder;
    element.children = (input.options || []).map(function(option) { return m('option', option); })
    var label = (input.label) ? m('label', {for: itemId}, input.label) : [];
    return (input.inputClass) ? m('div', {class: input.inputClass}, [label, element]) : [label, element];
  }

  var handleFieldSets = function(fieldSet, fieldsetIndex) {
    currFieldsetIndex = fieldsetIndex;
    return m('fieldset', [
      (fieldSet.legend) ? m('legend', fieldSet.legend) : [],
      fieldSet.inputs.map(handleInputs),
      undoButtons,
    ]);
  }

  var form = m('form', ctrl.fieldSets.map(handleFieldSets));

  return form;
}