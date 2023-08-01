import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList'
import axios from 'axios'
import Pagination from './Pagination';

function checkWinner(hp) {
  let f = (pk1.hp <= 0) ? pk1 : (pk2.hp <= 0) ? pk2 : false;
  if (f != false) {
      alert('GAME OVER: ' + f.name + ' fainted!');
      document.getElementById(hp).innerHTML = '<p>HP: 0/' + f.fullhp + '</p>';
      setTimeout(function() {
          location.reload();
      }, 1500)
  }

}

export default App;