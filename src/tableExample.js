var tableExample = {
  controller: function() {
    var firstNames = ['Sandy', 'Cheroll', 'Tommy', 'Ellis', 'Jordan', 'Linus', 'Pam'];
    var lastNames  = ['Hill', 'Goodman', 'Burgandy', 'Schrute', 'Doe', 'Smith', 'Higgins'];
    var cities     = ['Stonewall', 'Arcadia', 'Berwick', 'Pineville', 'Homer', 'Covington'];
    var states     = ['Louisiana', 'Mississippi', 'Florida', 'Texas', 'Arkansas', 'Tennessee'];

    this.rows      = [
      ['Index', 'First Name', 'Last Name', 'Phone Number', 'City', 'State', 'Zip'],
    ];

    // Generate semi-random list of contacts
    for(var i = 0; i < 500; i++) {
      this.rows.push([
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
    var opts = {
      // paginate: 8,
      height: 400,
      infinite: true,
      search: true,
      style: {
        up:     '.fa.fa-arrow-circle-up',
        down:   '.fa.fa-arrow-circle-down',
        table:  '.pure-table.pure-table-bordered.table-example',
        input: '.search'
      },
    }

    // Instantiate table controller
    this.table = new table.controller(this.rows, opts);
  },
  
  view: function(ctrl) {
    var example = m('div', [
      m('h1', 'Table Example'),
      table.view(ctrl.table),
    ]);

    return rootLayout(example)
  }
};