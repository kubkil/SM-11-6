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

  // COLUMN PROTOTYPES
  Column.prototype.addCard = function(card) {
    this.$element.children('ul').append(card.$element);
  }

  Column.prototype.removeColumn = function() {
    this.$element.remove();
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

  //CARD CONSTRUCTOR
  function Card(description) {
    const self = this;
    this.id = randomString();
    this.description = description;
    this.$element = createCard();
    // CREATE CARD
    function createCard() {
      const $card = $('<li>').addClass('card');
      const $cardDescription = $('<p>').addClass('card-description').text(self.description);
      const $cardDelete = $('<button>').addClass('btn-delete').text('X');
      // REMOVE CARD EVENT
      $cardDelete.click(function() {
        self.removeCard();
      });
      // APPEND CARD ELEMENTS
      $card.append($cardDelete);
      $card.append($cardDescription);
      // RETURN CREATED CARD
      return $card;
    }
  }

  // CARD PROTOTYPE
  Card.prototype.removeCard = function() {
    this.$element.remove();
  }

  // BOARD OBJECT
  const board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
  };

  // FUNCTION SORTABLE
  function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }

  // EVENT ON .create-column
  $('.create-column').click(function() {
    let name = prompt('Enter column name'); // or const?
    let column = new Column(name);
    board.addColumn(column); // ?
  });

  // ADD BASIC ELEMENTS
  // CREATING COLUMNS
  const todoColumn = new Column('To do');
  const doingColumn = new Column('Doing');
  const doneColumn = new Column('Done');

  // ADDING COLUMNS TO THE BOARD
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  // CREATING CARDS
  const card1 = new Card('New task');
  const card2 = new Card('Create kanban boards');

  // ADDING CARDS TO COLUMNS
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);

}); // END $(document).ready()