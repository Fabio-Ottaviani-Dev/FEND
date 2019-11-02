/*jshint esversion: 6 */
// -----------------------------------------------------------------------------------
// Inspired by: Webinar Arcade Game Project conducted by @Rodrick
// link: https://zoom.us/recording/play/aulotDlzKFegQFIJTaTzKgWvNkVsYtlwO454vL1UPE1Cm6lOUBQCtfVurPOIAGAS
// -----------------------------------------------------------------------------------

class Helper
{

// Return a pseudo random value used from set the bugs speed.

    getSpeed()
    {
        return (100 * (Math.random() * 0.07));
    }
}

// Main class with the common properties and methods, Inherit from the subclasses.

class Entity extends Helper
{
    constructor()
    {
        super();
        this.x = 2;
        this.y = 5;
    }

    update(dt)
    {
        this.EdgeX = this.x > 5;
        this.EdgeY = this.y < 1;
    }

    render()
    {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 71);
    }

// Check the collision between the player and the bugs.

    checkCollisions(actor)
    {
        if (this.y === actor.y) {
            if (this.x >= actor.x - 0.5 && this.x <= actor.x + 0.5) {
                return true;
            }
        } else {
            return false;
        }
    }
// --
}


class Player extends Entity
{
    constructor()
    {
        super();
        this.sprite = 'images/char-boy.png';
        this.moving = false;
        this.win = false;
        this.charChange = true;
    }

    reset()
    {
        this.x = 2;
        this.y = 5;
        this.win = false;
    }

    update(dt)
    {
        super.update();

    // win check, base modal message, player reset.

        if (this.EdgeY && !this.moving && !this.win) {
            this.win = true;
            alert('You Win! :)');
            this.reset();
        }

    }

    render()
    {
       super.render();
       this.moving = false;
    }

// Handle the labeled keys (see: js/app.js).

    handleInput(input)
    {

    // Number keys between 1 to 5 and change the character (if is in the starting point).

        this.charChange = (this.x === 2 && this.y === 5) ? true : false;

        if (this.charChange) {
            switch (input) {
                case 'char-boy':
                this.sprite = 'images/char-boy.png';
                break;
                case 'char-cat-girl':
                    this.sprite = 'images/char-cat-girl.png';
                break;
                case 'char-horn-girl':
                    this.sprite = 'images/char-horn-girl.png';
                break;
                case 'char-pink-girl':
                    this.sprite = 'images/char-pink-girl.png';
                break;
                case 'char-princess-girl':
                    this.sprite = 'images/char-princess-girl.png';
                break;
            }
        }

    // Arrow keys to move the character into the boundaries.

        switch (input) {
            case 'left':
                this.x = this.x > 0 ? this.x - 1 : this.x;
            break;
            case 'up':
                this.y = this.y > 0 ? this.y - 1 : this.y;
            break;
            case 'right':
                this.x = this.x < 4 ? this.x + 1 : this.x;
            break;
            case 'down':
                this.y = this.y < 5 ? this.y + 1 : this.y;
            break;
        }

        this.moving = true;
    }
// --
}


class Enemy extends Entity
{
    constructor(x, y)
    {
        super();
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = this.getSpeed();
    }

// Get and set the speed to the enemies, move the enemies, (every enemies have is own speed).

    update(dt)
    {
        super.update();

        if (this.EdgeX) {
            this.speed = this.getSpeed();
        }

        this.x = this.EdgeX ? -1 : this.x += this.speed * dt;
    }
// --
}
