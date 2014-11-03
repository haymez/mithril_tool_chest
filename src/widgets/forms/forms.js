var forms = {}

forms.controller = function(inputObjects) {
  this.inputObjects = inputObjects;
  this.undoStack = [];
  this.redoStack = [];
  this.formData = {};
  this.prevHash = {};


  this.initForm = function() {
    for(var el in this.inputObjects) {
      this.formData[this.inputObjects[el].id] = m.prop(this.inputObjects[el].value);
      this.prevHash[this.inputObjects[el].id] = this.inputObjects[el].value; 
    }
  }.bind(this);


  this.formChanged = function() {
    this.addToUndoStack(this.prevHash);
    var hash = {};
    for(var key in this.formData) {
      hash[key]          = this.formData[key]()
    }
    this.prevHash = this.cloneObj(hash);
  }.bind(this);


  this.inputChanged = function(evt) {
    var target = evt.target
    this.formData[target.id](target.value);
    this.formChanged();
    return target.value;
  }.bind(this);


  this.cloneObj = function(obj) {
    var clone = {}
    for(var key in obj) { clone[key] = obj[key]; }
    return clone;
  }


  this.cancelChanges = function(evt) {
    if(confirm('Are you sure you want to revert all Changes?\
     Changes to be reverted: ' + this.undoStack.length)) {
      var obj = this.undoStack[0];
      for(var key in obj) {
        this.formData[key](obj[key]);
      }
      this.undoStack = [];
      this.redoStack = [];
      return false;
    } else return false;
  }.bind(this);


  this.redo = function(evt) {
    var obj = this.redoStack.pop();
    var undoObj = {};
    console.log(this.redoStack);
    console.log(obj);
    for(var key in obj) {
      undoObj[key] = this.formData[key]();
      this.formData[key](obj[key]);
    }
    this.addToUndoStack(undoObj);
    return false;
  }.bind(this);


  this.undo = function(evt) {
    var obj = this.undoStack.pop();
    var redoObj = {}
    console.log(this.undoStack);
    console.log(obj);
    for(var key in obj) {
      redoObj[key] = this.formData[key]();
      this.formData[key](obj[key]);
    }
    this.addToRedoStack(redoObj);
    return false;
  }.bind(this);


  this.addToRedoStack = function(obj) {
    this.redoStack.push(this.cloneObj(obj));
  }.bind(this);


  this.addToUndoStack = function(obj) {
    this.undoStack.push(this.cloneObj(obj));
  }.bind(this);

  this.initForm();
}

forms.view = function(ctrl) {
  return m('form', [
    ctrl.inputObjects.map(function(input) {
      input.element.attrs.id = input.id;
      input.element.attrs.value = ctrl.formData[input.id]();

      if(input.listener)
        input.element.attrs[input.listener] = ctrl.inputChanged;
      else
        input.element.attrs.onchange = ctrl.inputChanged;
      return input.element;
    }),
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
}