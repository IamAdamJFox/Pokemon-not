import React from 'react'

function attack(move, attacker, receiver, hp, owner) {
  document.getElementById('comment').innerHTML = '<p>' + owner + attacker.name + ' used ' + move[0] + '!</p>';
  if (Math.random() < move[3]) {
      let power = move[2] += Math.floor(Math.random() * 10);
      let rtype = typeMatch[receiver.name];
      let mtype = move[1];
      let scale = 1;

      for (i = 0; i < rtype.length; i++) {
          if (rtype[i].includes(mtype)) {
              switch (i) {
                  case 0:
                      scale = 0;
                      setTimeout(function() {
                          document.getElementById('comment').innerHTML = '<p>It had no effect!</p>';
                      }, 1000);
                      break;
                  case 1:
                      scale = 2;
                      setTimeout(function() {
                          document.getElementById('comment').innerHTML = '<p>It was super effective!</p>';
                      }, 1000);
                      break;
                  case 2:
                      scale = 0.5;
                      setTimeout(function() {
                          document.getElementById('comment').innerHTML = '<p>It was not very effective!</p>';
                      }, 1000);
                      break;
              }
              break;
          }
      }
      power *= scale;
      receiver.hp -= Math.floor(power);
      document.getElementById(hp).innerHTML = '<p>HP: ' + receiver.hp + '/' + receiver.fullhp + '</p>';
  } else {
      setTimeout(function() {
          document.getElementById('comment').innerHTML = '<p>Attack missed!</p>';
      })
  }
  checkWinner(hp);


}