var tableExample = {
  controller: function() {
    var firstNames = ['Sandy', 'Cheroll', 'Tommy', 'Ellis', 'Jordan', 'Linus', 'Pam'];
    var lastNames  = ['Hill', 'Goodman', 'Burgandy', 'Schrute', 'Doe', 'Smith', 'Higgins'];
    var cities     = ['Stonewall', 'Arcadia', 'Berwick', 'Pineville', 'Homer', 'Covington'];
    var states     = ['Louisiana', 'Mississippi', 'Florida', 'Texas', 'Arkansas', 'Tennessee'];

    this.header    = ['Index', 'First Name', 'Last Name', 'Phone Number', 'City', 'State', 'Zip'];
    this.body      = [];

    // Generate semi-random list of contacts
    for(var i = 0; i < 20; i++) {
      this.body.push([
        i,
        firstNames[Math.floor(Math.random()*(firstNames.length))],
        lastNames[Math.floor(Math.random()*(lastNames.length))],
        Math.floor(Math.random() * 9000000000 + 1000000000),
        cities[Math.floor(Math.random()*(cities.length))],
        states[Math.floor(Math.random()*(states.length))],
        Math.floor(Math.random() * 9000 + 10000),
      ]);
    }

    // Styles for table and search bar
    var styles = {
      up:     '.fa.fa-arrow-circle-up',
      down:   '.fa.fa-arrow-circle-down',
      table:  '.pure-table.pure-table-bordered',
      search: '.pure-form'
    }

    // Instantiate table controller
    this.table = new table.controller(this.header, this.body, styles);
  },
  
  view: function(ctrl) {
    return m('div', [
      m('h1', 'Table Example'),
      table.view(ctrl.table),
    ]);
  }
};