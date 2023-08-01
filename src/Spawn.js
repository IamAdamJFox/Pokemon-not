import React from 'react'

export default function spawn(bool) {
  let p = pkmList[Math.floor(Math.random() * pkmList.length)];
  let pkm = new Pokemon(p[0], p[1], p[2], p[3]);

  if (bool) {
      for (i = 0; i < 4; i++) {
          document.getElementById('m' + i).value = pkm.moves[i][0];
      }
  }
  return pkm;

  let pk1 = spawn(true);
  s1 = document.createElement('img');
  s1.src = pk1.sprite;
  document.getElementById('pk1').appendChild(s1);
  document.getElementById('hp1').innerHTML = '<p>HP: ' + pk1.hp + '/' + pk1.fullhp + '</p>';


  let pk2 = spawn(false);
  s2 = document.createElement('img');
  s2.src = pk2.sprite;
  document.getElementById('pk2').appendChild(s2);
  document.getElementById('hp2').innerHTML = '<p>HP: ' + pk2.hp + '/' + pk2.fullhp + '</p>';

}