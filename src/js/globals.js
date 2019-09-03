let R, // canvas context
    G, // Game instance
    W, // World instance
    P, // Player instance
    w = window;


let onMenu = true,
    isMouseDown;

let MOUSE_SENSITIVITY = parseFloat(localStorage[1]) || 0.5;
let POINTER_LOCKED;
let ON_PLAY_BUTTON;

let CANVAS = nomangle(g);

const DAMAGE_ANGLES = [];
