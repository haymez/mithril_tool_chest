var tableExample = {
  controller: function() {
    this.header = ['First Name', 'Last Name', 'Phone Number', 'City', 'State', 'Zip']
    this.data = [
      ['James', 'Miltenberger', '9855021337', 'Shreveport', 'Louisiana', '71104'],
      ['Abbie', 'Miltenberger', '3188347081', 'Shreveport', 'Louisiana', '71104'],
      ['Walter', 'Miltenberger', '9855021209', 'Houston', 'Texas', '38543'],
      ['Lauren', 'Miltenberger', '5046743383', 'Houston', 'Texas', '38543'],
    ];
    this.table = new table.controller(this.data, this.header);
  },
  
  view: function(ctrl) {
    return m('div', [
      m('h1', 'Table Example'),
      table.view(ctrl.table),
    ]);
  }
};