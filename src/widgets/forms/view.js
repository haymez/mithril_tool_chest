forms.view = function(ctrl) {
  var currFieldsetIndex = null;

  var undoButtons = []
  if(ctrl.opts.showUndo) {
    undoButtons = m('div', {class: ctrl.opts.undoGroupClass || ''}, [
      m('button', {
        onclick: ctrl.undo,
        class: ctrl.opts.undoClass,
        style: {display: (ctrl.undoStack.length > 0) ? 'inline-block' : 'none'},
      }, 'Undo'),
      m('button', {
        onclick: ctrl.redo,
        class: ctrl.opts.redoClass,
        style: {display: (ctrl.redoStack.length > 0) ? 'inline-block' : 'none'},
      }, 'Redo'),
      m('button', {
        onclick: ctrl.cancelChanges,
        class: ctrl.opts.cancelChangesClass,
        style: {display: (ctrl.undoStack.length > 0) ? 'inline-block' : 'none'},
      }, 'Cancel All Changes'),
    ]);
  }

  var handleElements = function(item, index) {
    var itemId = 'id' + currFieldsetIndex + index;
    // Create Element
    var type = (item.tagName !== 'input') ? null : item.type || 'text';
    var element = m(item.tagName, {
      id: itemId,
      class: item.class || '',
    }, (item.textValue) ? item.textValue : '');
    // Apply attributes
    element.attrs.type = type;
    element.attrs[item.listener || 'onchange'] = ctrl.inputChanged;
    element.attrs[(item.checked != undefined) ? 'checked' : 'value'] = ctrl.formData[itemId]();
    // bind callback if element is button
    if(item.tagName === 'button') element.attrs.onclick = ctrl.buttonCallback;
    // Set placeholder if exists
    if(item.placeholder) element.attrs.placeholder = item.placeholder;
    // If options exist map them.
    if(item.options) element.children = item.options.map(function(option) { return m('option', option); })
    // Set label if exists
    var label = (item.label) ? m('label', {for: itemId}, item.label) : [];
    if(item.groupClass)
      return m('div', {class: item.groupClass}, [label, element]);
    else return [label, element];
  }

  var handleFieldSets = function(fieldSet, fieldsetIndex) {
    currFieldsetIndex = fieldsetIndex;
    return m('fieldset', [
      (fieldSet.legend) ? m('legend', fieldSet.legend) : [],
      fieldSet.inputs.map(handleElements),
      undoButtons,
    ]);
  }

  var form = m('form', ctrl.fieldSets.map(handleFieldSets));

  return form;
}