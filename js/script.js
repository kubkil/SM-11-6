$(function() {

  //ID GENERATOR
  function randomString() {
    const chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    let str = '';
    for (let i = 0; i < 10 ; i++) {
      str += chars[Math.floor(Math.random() * chars.length)]; // = np chars[12]
    }
    return str;
  }

  function Column(name) {
    let self = this; //or const?
    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    // CREATE COLUMN FUNCTION
    function createColumn() {
      const $column = $('<div>').addClass('column');
      const $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      const $columnCardList = $('<ul>').addClass('column-card-list');
      const $columnDelete = $('<button>')
    }
  }

}) // END $(document).ready()