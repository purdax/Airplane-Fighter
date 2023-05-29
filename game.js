const table = document.querySelector('.table')
const button = document.querySelector('.button')
let airplane = null;
let bombSpeed = 100
let sendTheBombIn = 2000
let stopBomb = false
let yourScore = 0
let bulletRelease = false
let bulletCopy = null
let newBullet = true

const init = () => {
    if (localStorage.getItem('record') === null) {
        localStorage.setItem('record', 0)
    }
    document.getElementById('record').innerHTML = 'Record: ' + localStorage.getItem('record') 

    const score = setInterval(() => {
        // yourScore += 1
        if (stopBomb ===false) {
            document.getElementById('score').textContent = 'Your score is: ' + yourScore
            localStorage.setItem('yourScore', yourScore)
        }
    }, 1000)

    airplane = document.getElementById('airplane')
    airplane.style.position = 'relative'
    airplane.style.top = '0px'
    airplane.style.left = '0px'
}

const warmingUp = setInterval(() => {
    generateBombs()
}, 3000)

const timeCheck = setInterval(() => {
    clearInterval(warmingUp)
    if (sendTheBombIn > 400) {
        sendTheBombIn -= 300
    }
    if (bombSpeed > 70) {
        bombSpeed -= 10
    }
    setInterval(() => {
        if (stopBomb === false) {
            generateBombs()
        } 
    }, sendTheBombIn)
}, 20000);



const getKeyAndMove = (e) => {
    let key_code = e.which || e.keyCode;
    switch (key_code) {
        case 37: //left arrow key
            moveLeft()
            break;
        case 38: //Up arrow key
            moveUp();
            break;
        case 39: //right arrow key
            moveRight();
            break;
        case 40: //down arrow key
            moveDown();
            break;
        case 32:
            releaseBullet()  
            break;  
    }
}

const moveLeft = () => {
    if (parseInt(airplane.style.left) >= -90) {
        airplane.style.left = parseInt(airplane.style.left) - 25 + "px"
    }
}
const moveUp = () => {
    if (parseInt(airplane.style.top) >= -130) {
        airplane.style.top = parseInt(airplane.style.top) - 25 + "px"
    }
}
const moveRight = () => {
    if (parseInt(airplane.style.left) <= 525) {
        airplane.style.left = parseInt(airplane.style.left) + 25 + "px"
    }
}
const moveDown = () => {
    if (parseInt(airplane.style.top) <= 165) {
        airplane.style.top = parseInt(airplane.style.top) + 25 + "px"
    }
}

const releaseBullet = () => {
    if (newBullet === true) {
        newBullet = false
        bulletRelease = true
        let bullet = document.createElement('img')
        bullet.setAttribute('src', 'arm.png')
        bullet.id = 'bullet'
        bullet.style.position = 'fixed'
        bullet.style.top = parseInt(airplane.style.top) + 300 + "px"
        bullet.style.left = parseInt(airplane.style.left) + 245 + "px"
        bulletCopy = bullet

        table.appendChild(bullet)
        setInterval(() => {
            if(parseInt(bullet.style.left) >= 815) {
                bullet.style.display = 'none'
                bullet.style.top = '-1000000px'
                bullet.style.left = '-1000000px'
                newBullet = true
            }
        }, 1)

        setInterval(() => {
            bullet.style.left = parseInt(bullet.style.left) + 10 + "px"
        }, 15);
    }
}


const generateBombs = () => {
    let top = Math.floor(Math.random() * (450 - 125 + 1) + 125)
    let bomb = document.createElement('img')
    bomb.id = 'bomb'
    bomb.setAttribute('src', 'bum.png')
    bomb.style.position = 'fixed'    
    bomb.style.top = top + 'px'
    bomb.style.right = '5px'
    bomb.style.bottom = '5px'
    bomb.style.left = '800px'
    table.appendChild(bomb)
    checkImpact(bomb, airplane, bulletCopy)
    sendBombtoTable(bomb)
}


const sendBombtoTable = (bomb) => {
    setInterval(() => {
        bomb.style.left = parseInt(bomb.style.left) - 25 + 'px'
        if (bomb.style.left === '75px') {
            bomb.style.display = 'none'
        }
    }, bombSpeed);

    setInterval(() => {
        checkImpact(bomb, airplane, bulletCopy)
    }, 1)

    setInterval(() => {
        increaseScore(bomb, bulletCopy)
    }, 250)
}

const checkImpact = (bomb, airplane, bulletCopy) => {
    if (bulletRelease === true) {
            if (parseInt(bomb.style.top) - parseInt(bulletCopy.style.top) >= -43 &&  parseInt(bomb.style.top) - parseInt(bulletCopy.style.top) <= 1) {
                if (parseInt(bomb.style.left) - parseInt(bulletCopy.style.left) <= 30) {
                    bomb.style.display = 'none'
                    bomb.style.top = '0px'
                    bomb.style.left = '0px'

                    bulletCopy.style.display = 'none'
                    bulletCopy.style.top = '0px'
                    bulletCopy.style.left = '0px'
                    newBullet = true
                }
            }
    }
    let bombTop = parseInt(bomb.style.top)
    let airplaneTop = parseInt(airplane.style.top)
    let index = bombTop - airplaneTop
   if (parseInt(bomb.style.left) - parseInt(airplane.style.left) === 225) {
        if (238 < index && index < 325) {
            gameOver(bomb)
            clearInterval(timeCheck)
            clearInterval(warmingUp)
            stopBomb = true
        }
   }
}

const increaseScore = (bomb, bulletCopy) => {
    if (bulletCopy !== null) {
        if (parseInt(bomb.style.top) - parseInt(bulletCopy.style.top) >= -43 &&  parseInt(bomb.style.top) - parseInt(bulletCopy.style.top) <= 1) {
            if (parseInt(bomb.style.left) - parseInt(bulletCopy.style.left) <= 30) {
                yourScore += 1
                bomb.style.left = '10000000px'
                document.getElementById('score').textContent = 'Your score is: ' + yourScore
            }
        }
    }
}


const gameOver = (bomb) => {
    bomb.style.display = 'none'
    const explosion = document.createElement('img')
    explosion.setAttribute('src', 'explosion.png')
    explosion.className = 'explosion'
    explosion.style.top = airplane.style.top
    explosion.style.right = airplane.style.right
    explosion.style.bottom = airplane.style.bottom
    explosion.style.left = airplane.style.left
    airplane.replaceWith(explosion)

    const restart = document.createElement('button')
    restart.textContent = 'Restart Game'
    restart.id = 'restart'
    restart.setAttribute('onclick', 'location.reload()')
    button.appendChild(restart)

   if (localStorage.getItem('record') === null) {
        localStorage.setItem('record', yourScore)
   } 
   if (parseInt(localStorage.getItem('record')) < yourScore) {
        localStorage.setItem('record', yourScore)
        document.getElementById('record').innerHTML = 'Record: ' + localStorage.getItem('record')
   }
}

window.onload = init
