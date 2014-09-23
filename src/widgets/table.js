var table = {
  controller: function(rows, header) {
    this.header = header; //Grab header row
    this.body = rows;
  },

  view: function(ctrl) {
    return m('table.pure-table.pure-table-bordered', [
      m('thead', [
        m('tr', ctrl.header.map(function(item) {
          return m('th', item);
        }))
      ]),
      ctrl.body.map(function(row, index) {
        return m('tr', row.map(function(td) {
          return m('td', td);
        }))
      })
    ])
  }
}


// c.multiselect = {
//   controller: function(tags) {

//     this.tags = tags;
//     this.tags.splice(0, 1, ''); // Add empty option at beginning of array
//   },

//   view: function(ctrl, opts) {
//     var multiselect = m('div.multiselect', [
//       m('select', { value: ctrl.currentSelection, onclick: m.withAttr('value', opts.add) },
//         ctrl.tags.map(function(tag) {
//           return m('option', {disabled: opts.value.indexOf(tag) > -1}, tag);
//       })),
//       m('ul', opts.value.map(function(tag) {
//         return m('li', [
//           m('span', tag),
//           m('i.fa.fa-times.fa-fw', {value: tag, onclick: m.withAttr('value', opts.remove)}),
//         ]);
//       })),
//     ]);
//     return multiselect;
//   }
// };
