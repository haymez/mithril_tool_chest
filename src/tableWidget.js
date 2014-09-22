var table = {
  controller: function() {
    this.sample = "Hey!";
  },
  
  view: function(ctrl) {
    return m('h1', ctrl.sample);
  }
};