const table = document.querySelector('.table')
let bomb = null;

const init = () => {
    bomb = document.createElement('img')
    bomb.id = 'bomb'
    bomb.setAttribute('src', 'bum.png')
    bomb.style.position = 'relative'
    bomb.style.top = '234px'
    bomb.style.left = '0px'
    bomb.style.display = 'inline'
    bomb.style.margin ='25px 0px 10px 5px'    
    table.appendChild(bomb)

    // setInterval(() => {
    //     let position = Math.floor(Math.random() * (165 + 150 + 1) - 150)
    //     generateBombs(position)
    // }, 3000);
}

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
    }
}

const moveLeft = () => {
    bomb.style.left = parseInt(bomb.style.left) - 25 + "px"
    console.log(bomb.style.left)

    // if (parseInt(bomb.style.left) >= -125) {
    //     bomb.style.left = parseInt(airplane.style.left) - 25 + "px"
    // }
}
const moveUp = () => {    
    let horizontal = (Math.random() * (200 + 125 + 1) - 125) // nu i bun parametru
    console.log(horizontal)

    bomb.style.top = horizontal + "px"
    console.log(bomb.style.top)

    // if (parseInt(airplane.style.top) >= -150) {
    //     airplane.style.top = parseInt(airplane.style.top) - 25 + "px"
    // }
}
const moveRight = () => {
    bomb.style.left = parseInt(bomb.style.left) + 25 + "px"
    console.log(bomb.style.left)
    // if (parseInt(airplane.style.left) <= 525) {
    //     airplane.style.left = parseInt(airplane.style.left) + 25 + "px"
    // }
}
const moveDown = () => {
    bomb.style.top = parseInt(bomb.style.top) + 25 + "px"
    console.log(bomb)
    // if (parseInt(airplane.style.top) <= 165) {
    //     airplane.style.top = parseInt(airplane.style.top) + 25 + "px"
    // }
}

const generateBombs = () => { // PUNE parametru position
    // console.log(position)
    let bomb = document.createElement('img')
    bomb.id = 'bomb'
    bomb.setAttribute('src', 'bum.png')
    bomb.style.position = 'relative'
    bomb.style.top = '0px'
    bomb.style.left = '0px'
    bomb.style.display = 'inline'
    bomb.style.top = parseInt(bomb.style.top) - 25 + "px"
    bomb.style.left = parseInt(bomb.style.top) - 25 + "px"
    table.appendChild(bomb)
}

window.onload = init

