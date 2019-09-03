let R, // canvas context
    G, // Game instance
    W, // World instance
    P, // Player instance
    w = window,
    onMenu = true,
    isMouseDown,
    MOUSE_SENSITIVITY = parseFloat(localStorage[1]) || 0.5,
    POINTER_LOCKED,
    ON_PLAY_BUTTON,
    CANVAS = nomangle(g),
    DAMAGE_ANGLES = [],
    RESET_BACKGROUND_TIMEOUT;
