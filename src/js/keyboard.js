w.down = {};
onkeydown = e => {
    e.keyCode == 32 && e.preventDefault();
    w.down[e.keyCode] = true;

    if (e.keyCode == 27) {
        toggleMenu();
    }

    updateMovement();
};
onkeyup = e => {
    e.keyCode == 32 && e.preventDefault();
    w.down[e.keyCode] = false;

    updateMovement();
};

updateMovement = () => {
    const x = !!w.down[KEYBOARD_W] + !!w.down[KEYBOARD_UP] - !!w.down[KEYBOARD_S] - !!w.down[KEYBOARD_DOWN],
        y = !!w.down[KEYBOARD_D] + !!w.down[KEYBOARD_RIGHT] - !!w.down[KEYBOARD_A] - !!w.down[KEYBOARD_LEFT];

    MOVEMENT_CONTROL.angle = atan2(y, x);
    MOVEMENT_CONTROL.force = x || y;
};
