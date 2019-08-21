let R, // canvas context
    G, // Game instance
    W, // World instance
    P, // Player instance
    w = window,
    isTouch,
    mobile = navigator.userAgent.match(nomangle(/andro|ipho|ipa|ipo|windows ph/i));

const CYCLABLES = [];
const ENEMIES = [];
const ITEMS = [];
const MINIMAP_ELEMENTS = [];

let onMenu = true,
    isMouseDown;

let MOUSE_SENSITIVITY = 0.5;
let POINTER_LOCKED;
