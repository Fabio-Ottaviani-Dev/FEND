/*jshint esversion: 6 */

// Instantiate players and enemies.

const player = new Player();
const allEnemies = [...Array(3)].map((_,i)=> new Enemy(0, i+1));

// Event Listener to monitoring / interact with the keyboard.

document.addEventListener('keyup', function(e)
{
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    // Character selection Key: 1,2,3,4,5.
        49: 'char-boy',
        50: 'char-cat-girl',
        51: 'char-horn-girl',
        52: 'char-pink-girl',
        53: 'char-princess-girl'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
