ontouchstart = e => ontouchmove(e, true);

touchEvent = (e, isTouchStart) => {
    e.preventDefault();

    const canvasRect = document.querySelector('canvas').getBoundingClientRect();

    w.down[32] = false;
    w.down[37] = false;
    w.down[38] = false;
    w.down[39] = false;

    MOVEMENT_CONTROL.force = 0;
    AIM_CONTROL.force = 0;

    P.weapon.releaseTrigger();

    function updateForJoystick(control, joystickX, joystickY, x, y) {
        control.angle = atan2(y - joystickY, x - joystickX) + PI / 2;
        control.force = limit(0, distP(x, y, joystickX, joystickY) / 50, 1);
    }

    for (let i = 0 ; i < e.touches.length ; i++) {
        const x = (e.touches[i].clientX - canvasRect.left) / canvasRect.width * CANVAS_WIDTH;
        const y = (e.touches[i].clientY - canvasRect.top) / canvasRect.height * CANVAS_HEIGHT;

        if (x < CANVAS_WIDTH / 2) {
            updateForJoystick(MOVEMENT_CONTROL, LEFT_JOYSTICK_X, JOYSTICK_Y, x, y);
        } else {
            if (y < evaluate(JOYSTICK_Y - JOYSTICK_RADIUS)) {
                isTouchStart && P.weapon.holdTrigger();
            } else {
                updateForJoystick(AIM_CONTROL, RIGHT_JOYSTICK_X, JOYSTICK_Y, x, y);
            }
        }
    }

    onMenu = false;

    isTouch = true;

    e.preventDefault();
};


addEventListener('touchstart', e => touchEvent(e, true), {passive: false});
addEventListener('touchmove', touchEvent, {passive: false});
addEventListener('touchend', touchEvent, {passive: false});
