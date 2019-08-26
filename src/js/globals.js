let R, // canvas context
    G, // Game instance
    W, // World instance
    P, // Player instance
    w = window,
    isTouch,
    mobile = navigator.userAgent.match(nomangle(/andro|ipho|ipa|ipo|windows ph/i));


let onMenu = true,
    isMouseDown;

let MOUSE_SENSITIVITY = parseFloat(localStorage[1]) || 0.5;
let POINTER_LOCKED;

const DAMAGE_ANGLES = [];
const MOVEMENT_CONTROL = {'angle': 0, 'force': 0};
const AIM_CONTROL = {'angle': 0, 'force': 0};
