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

  // COLUMN CONSTRUCTOR
  function Column(name) {
    let self = this; //or const?
    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

  }

  // CREATE COLUMN FUNCTION
  function createColumn() {

    // COLUMN ELEMENTS
    const $column = $('<div>').addClass('column');
    const $columnTitle = $('<h2>').addClass('column-title').text(self.name);
    const $columnCardList = $('<ul>').addClass('column-card-list');
    const $columnDelete = $('<button>').addClass('btn-delete').text('X');
    const $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

    // DELETE COLUMN EVENT
    $columnDelete.click(function() {
      self.removeColumn();
    });

    // ADD COLUMN EVENT
    $columnAddCard.click(function() {
      self.addCard(new Card(prompt('Enter the name of the card')));
    });

    // APPEND COLUMN ELEMENTS
    $column.append($columnTitle);
    $column.append($columnAddCard);
    $column.append($columnDelete);
    $column.append($columnCardList);

    // RETURN CREATED COLUMN
    return $column;
  }

}) // END $(document).ready()