var table = {};

// For every table on DOM
table.addTableListener = function() {
  var list = document.getElementsByClassName('mithrilTable');
  for(var i = 0; i < list.length; i++) {
    console.log(list[i]);
    table.addEventListener('scroll', function(evt) {
      table.state.pageY = Math.max(evt.pageY || window.pageYOffset, 0);
      // table.state.divHeight = table.
    });
  }
}

table.controller = function(rows, opts) {
  this.header      = rows.splice(0, 1)[0];
  this.body        = rows;
  this.filtered    = this.body;
  this.styles      = (opts.style) ? opts.style : {};
  this.paginate    = (opts.paginate) ? m.prop(opts.paginate) : m.prop(this.body.length);
  this.height      = (opts.height) ? m.prop(opts.height) : m.prop();
  this.search      = (opts.search) ? opts.search : false;
  this.currColumn  = m.prop();
  this.reverse     = m.prop(false);
  this.currentPage = m.prop(1);


  this.sortFunction = function(a, b) {
    var curr = this.header.indexOf(this.currColumn());
    if(a[curr] === b[curr]) return 0;
    else {
      if(this.reverse())
        return (a[curr] < b[curr]) ? 1 : -1;
      else
        return (a[curr] < b[curr]) ? -1 : 1;
    }
  }.bind(this);

  this.sortByColumn = function(value) {
    if(value === this.currColumn()) this.reverse(!this.reverse());
    else this.reverse(false);
    this.currColumn(value);
  }.bind(this);

  this.getArrow = function(th) {
    var columnStyles = this.styles.up && this.styles.down;
    if(th === this.currColumn() && columnStyles) {
      var direction = (this.reverse()) ? this.styles.down : this.styles.up;
      return m('i' + direction, {style: 'float:right;'});
    }
    return [];
  }.bind(this);

  this.filterTable = function(value) {
    this.filtered = [];

    var searchRow = function(row) {
      for(var i = 0; i < row.length; i++) {
        if(String(row[i]).search(new RegExp(value, 'i')) > -1) {
          this.filtered.push(row);
          break;
        }
      }
    }.bind(this)

    this.body.forEach(searchRow);
  }.bind(this);

  this.goToPage = function(page) {
    var page = Number(page.replace(',', ''));
    if(page != this.currentPage()) this.currentPage(page);
  }.bind(this);

};

table.view = function(ctrl) {
  var sliceStart = (ctrl.currentPage() - 1) * ctrl.paginate();
  var table = m('table' + ctrl.styles.table, [
    m('thead', [
      m('tr', {onclick: ctrl.filtered.sort(ctrl.sortFunction)}, ctrl.header.map(function(item, index) {
        var arrow = ctrl.getArrow(item);
        return m('th', {onclick: m.withAttr('textContent', ctrl.sortByColumn)}, [
          item,
          arrow,
        ]);
      }))
    ]),
    ctrl.filtered.slice(sliceStart, sliceStart + ctrl.paginate()).map(function(row, index) {
      return m('tr', row.map(function(td) {
        return m('td', td);
      }))
    })
  ])

  var inputClass = (ctrl.styles.input) ? ctrl.styles.input : ''
  var search = [];
  if(ctrl.search)
    search = m('input' + inputClass, {type: 'text', onkeyup: m.withAttr('value', ctrl.filterTable)});

  var paginate    = [];
  var totalPages  = Math.ceil(ctrl.filtered.length / ctrl.paginate());
  var startNumber = (ctrl.currentPage() - 5 < 0) ? 0 : ctrl.currentPage() - 5;
  var endNumber   = (startNumber + 10 > totalPages) ? totalPages : startNumber + 10;
  if(ctrl.paginate() < ctrl.filtered.length) 
    for(var i = startNumber; i < endNumber; i++) {
      var number = i + 1;
      if(startNumber > 1 && i === startNumber) paginate.push('... ');
      if(i < Math.ceil(ctrl.filtered.length / ctrl.paginate()) - 1) number += ' ';
      if(i+1 !== ctrl.currentPage())
        paginate.push(m('span', {onclick: m.withAttr('textContent', ctrl.goToPage)}, number));
      else {
        paginate.push(
          m('span', {style: 'font-weight: bold;', onclick: m.withAttr('textContent', ctrl.goToPage)}, number)
        );
      }
      if(endNumber < totalPages && i === endNumber - 1) paginate.push('...');
    }

  return [
    m('.mithril-table', {style: ['height:', ctrl.height(), 'px;overflow-y:auto;overflow-x:hidden'].join('')}, [search, table]),
    paginate,
  ];
}
