var tableExample = {
  controller: function() {
    this.header = ['First Name', 'Last Name', 'Phone Number', 'City', 'State', 'Zip', 'Testing']
    this.body = [
      ['James', 'Miltenberger', '9855021337', 'Shreveport', 'Louisiana', '71104', 84],
      ['Abbie', 'Miltenberger', '3188347081', 'Shreveport', 'Louisiana', '71104', 6],
      ['Walter', 'Miltenberger', '9855021209', 'Houston', 'Texas', '38543', 19],
      ['Lauren', 'Miltenberger', '5046743383', 'Houston', 'Texas', '38543', 9],
    ];
    var styles = {
      up:    '.fa.fa-arrow-circle-up',
      down:  '.fa.fa-arrow-circle-down',
      table: '.pure-table.pure-table-bordered'
    }
    this.table = new table.controller(this.header, this.body, styles);
  },
  
  view: function(ctrl) {
    return m('div', [
      m('h1', 'Table Example'),
      table.view(ctrl.table),
    ]);
  }
};