class Pokemon {
    constructor(name, sprite, hp, moves) {
        this.name = name;
        this.sprite = sprite;
        this.hp = hp;
        this.fullhp = hp;
        this.moves = moves;
    }
}




function spawn(bool) {
    let p = pkmList[Math.floor(Math.random() * pkmList.length)];
    let pkm = new Pokemon(p[0], p[1], p[2], p[3]);

    if (bool) {
        for (let i = 0; i < 4; i++) {
            document.getElementById('m' + i).value = pkm.moves[i][0];
        }
    }
    return pkm;
}

function addHandler(btn, move, pk1, pk2) {
    btn.addEventListener('click', function(e) {
        attack(move, pk1, pk2, 'hp2', '');
        setTimeout(attack, 2000, pk2.moves[Math.floor(Math.random() * 3)], pk2, pk1, 'hp1', 'Foe ');
    });
}

function attack(move, attacker, receiver, hp, owner) {
    document.getElementById('comment').innerHTML = '<p>' + owner + attacker.name + ' used ' + move[0] + '!</p>';
    if (Math.random() < move[3]) {
        let power = move[2] += Math.floor(Math.random() * 10);
        let rtype = typeMatch[receiver.name];
        let mtype = move[1];
        let scale = 1;

        for (let i = 0; i < rtype.length; i++) {
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
        });
    }
    checkWinner(hp);
}

function checkWinner(hp) {
    let f = (pk1.hp <= 0) ? pk1 : (pk2.hp <= 0) ? pk2 : false;
    if (f != false) {
        alert('GAME OVER: ' + f.name + ' fainted!');
        document.getElementById(hp).innerHTML = '<p>HP: 0/' + f.fullhp + '</p>';
        setTimeout(function() {
            location.reload();
        }, 1500);
    }
}

// Initialize the battle
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

for (let i = 0; i < 4; i++) {
    let btn = document.getElementById('m' + i);
    let move = pk1.moves[i];
    addHandler(btn, move, pk1, pk2);
}
