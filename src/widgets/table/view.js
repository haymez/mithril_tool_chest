table.view = function(ctrl) {
  var table      = [];
  var sliceStart = (ctrl.state.currentPage() - 1) * ctrl.state.paginate();
  var divHeight  = ctrl.state.filtered.length * ctrl.state.rowHeight()
  var begin      = ctrl.state.divY() / ctrl.state.rowHeight() | 0;
  var end        = begin + (ctrl.state.divHeight() / ctrl.state.rowHeight() | 0 + 2);
  var offset     = (end > ctrl.state.filtered.length) ? -(ctrl.state.divY() % ctrl.state.rowHeight()) : 0;

  if(ctrl.state.infinite()) {
    table = m('div', 
    {
      style: {
        height: ctrl.state.filtered.length * ctrl.state.rowHeight() + 'px',
      }
    },
    [
      m('table' + ctrl.state.classNames.table,
        {
          style: {
            top: ctrl.state.divY() + offset + 'px',
            width: '100%',
            position: 'relative',
          }
        },
        [
          m('thead', [
            m('tr', {onclick: ctrl.state.filtered.sort(ctrl.state.sortFunction)}, ctrl.state.header.map(function(item, index) {
              var arrow = ctrl.getArrow(item);
              return m('th', {onclick: m.withAttr('textContent', ctrl.state.sortByColumn)}, [item, arrow]);
            }))
          ]),
          ctrl.state.filtered.slice(begin, end).map(function(row, index) {
            return m('tr', row.map(function(td) {
              return m('td', td);
            }))
          })
      ])
    ]);
  } 
  else {
    table = m('table' + ctrl.state.classNames.table, {style:{width:'100%'}}, [
      m('thead', [
        m('tr', {onclick: ctrl.state.filtered.sort(ctrl.state.sortFunction)}, ctrl.state.header.map(function(item, index) {
          var arrow = ctrl.getArrow(item);
          return m('th', {onclick: m.withAttr('textContent', ctrl.state.sortByColumn)}, [
            item,
            arrow,
          ]);
        }))
      ]),
      ctrl.state.filtered.slice(sliceStart, sliceStart + ctrl.state.paginate()).map(function(row, index) {
        return m('tr', row.map(function(td) {
          return m('td', td);
        }))
      })
    ])
  }

  var inputClass = (ctrl.state.classNames.input) ? ctrl.state.classNames.input : ''
  var search     = [];
  if(ctrl.state.search) {
    search = [];
    if(ctrl.state.infinite()) 
      search = m('input' + inputClass,
      {
        style: {
          width: '99.5%',
          'z-index': 1,
          position: 'relative',
          top: ctrl.state.divY()+'px'
        },
        type: 'text',
        onkeyup: m.withAttr('value', ctrl.filterTable)
      });
    else
      search = m('input' + inputClass,
      {
        style: {
          width:     '99.5%',
          'z-index': 1,
        },
        type: 'text',
        onkeyup: m.withAttr('value', ctrl.filterTable)
      });
  }

  var paginate    = [];
  var totalPages  = Math.ceil(ctrl.state.filtered.length / ctrl.state.paginate());
  var startNumber = (ctrl.state.currentPage() - 5 < 0) ? 0 : ctrl.state.currentPage() - 5;
  var endNumber   = (startNumber + 10 > totalPages) ? totalPages : startNumber + 10;
  if(ctrl.state.paginate() < ctrl.state.filtered.length) 
    for(var i = startNumber; i < endNumber; i++) {
      var number = i + 1;
      if(startNumber > 1 && i === startNumber) paginate.push('... ');
      if(i < Math.ceil(ctrl.state.filtered.length / ctrl.state.paginate()) - 1) number += ' ';
      if(i+1 !== ctrl.state.currentPage())
        paginate.push(m('span', {onclick: m.withAttr('textContent', ctrl.goToPage)}, number));
      else {
        paginate.push(
          m('span', {style: 'font-weight: bold;', onclick: m.withAttr('textContent', ctrl.goToPage)}, number)
        );
      }
      if(endNumber < totalPages && i === endNumber - 1) paginate.push('...');
    }

  return [
    m('.mithril-table',
      {
        style: {
          height: ctrl.state.height() + 'px',
          'overflow-y': 'auto',
          'overflow-x': 'hidden',
        }, 
        onscroll: ctrl.state.updateState
      },
      [search, table]
    ),
    paginate,
  ];
}
