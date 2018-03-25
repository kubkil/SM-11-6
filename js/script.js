$(function() {

  'use strict';

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
  function Column(name) { //
    const self = this; //const bo nie zmienia się w tym kontekście, jest const tylko dla tej funkcji
    this.id = randomString(); //
    this.name = name;
    this.$element = createColumn(); //$element - wskazuje na element jquery (konwencja nazywania); wywołuje createColumn();
    // CREATE COLUMN FUNCTION
    function createColumn() { //tworzy htmla
      // COLUMN ELEMENTS
      const $column = $('<div>').addClass('column'); // TWORZY PUSTY DIV O KLASIE 'column'. NIE POTRZEBNE ZAMKNIĘCIE <>. ZNAK $ PRZED NAZWĄ ZMIENNEJ W CELU OZNACZENIA ZMIENNEJ TRZYMAJĄCEJ ELEMENT JQUERY > zamyka automatycznie - dodawany w linii 89 append
      const $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      const $columnCardList = $('<ul>').addClass('column-card-list');
      // const $columnLi = $columnCardList.append($('<li>'));
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
      $column.append($columnTitle); //O CO CHODZI W KODZIE Z INSTRUKCJI W TYM FRAGMENCIE?
      $column.append($columnDelete);
      $column.append($columnAddCard);
      $column.append($columnCardList);
      // RETURN CREATED COLUMN
      return $column; //to co zwrócone przechowywane w 20 this.$element > zwraca $column z 24 linii ze wszystkim w środku
    }
  }

  // COLUMN PROTOTYPES
  Column.prototype.addCard = function(card) {
    this.$element.children('ul').append(card.$element);
  }

  Column.prototype.removeColumn = function() {
    this.$element.remove();
  } // koniec obiektu Column, prototypy wchodzą do obiektu

  //CARD CONSTRUCTOR
  function Card(description) {
    const self = this; // or const?
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
  } // koniec obiektu card

  // BOARD OBJECT
  const board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element); // dodaje kolumnę -> todoColumn.$element z linii 20 na przykład
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
    const name = prompt('Enter column name'); //
    const column = new Column(name); // let i = ab(); wywołanie funkcji i przypisanie wyniku do i; nawiasy powoduję wywołanie nawet gdy przypisanie do zmiennej
    board.addColumn(column); // ?
  });

  // ADD BASIC ELEMENTS
  // CREATING COLUMNS
  const todoColumn = new Column('To do'); // do 16 linii tworzą obiekty
  const doingColumn = new Column('Doing'); // jw
  const doneColumn = new Column('Done'); // jw

  // ADDING COLUMNS TO THE BOARD
  board.addColumn(todoColumn); // addColumn jedna z właściwości obiektu, odwołanie do metody addColumn, tutaj jeszcze string name i $element (property mogą być wszystkim); wywołanie funkcji odpowiadającej za dodanie kolumny todo
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  // CREATING CARDS
  const card1 = new Card('New task');
  const card2 = new Card('Create kanban boards');

  // ADDING CARDS TO COLUMNS
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);

}); // END $(document).ready()

// NIE DZIAŁA PRZENOSZENIE DO DONE !