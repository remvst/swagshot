onload = () => {
    onresize(); // trigger initial sizing pass

    const can = document.querySelector('canvas');
    can.width = CANVAS_WIDTH * CANVAS_SCALE;
    can.height = CANVAS_HEIGHT * CANVAS_SCALE;

    R = can.getContext('2d', { 'alpha': false });
    R.imageSmoothingEnabled = false;

    // Shortcut for all canvas methods to the main canvas
    Object.getOwnPropertyNames(p).forEach(n => {
        if (R[n] && R[n].call) {
            w[n] = p[n].bind(R);
        }
    });

    R.scale(CANVAS_SCALE, CANVAS_SCALE);
    new Game();

    // Start cycle()
    let lastFrame = Date.now();
    let frame = () => {
        let n = Date.now(),
            e = (n - lastFrame) / 1000;

        if(DEBUG){
            G.fps = ~~(1 / e);
        }

        lastFrame = n;

        G.cycle(e);

        requestAnimationFrame(frame);
    };
    frame();

    maybeUpdateSensitivity = e => {
        if (!isMouseDown || !onMenu) {
            return;
        }

        const canvasRect = can.getBoundingClientRect();

        const x = (e.clientX - canvasRect.left) / canvasRect.width * CANVAS_WIDTH;
        const y = (e.clientY - canvasRect.top) / canvasRect.height * CANVAS_HEIGHT;

        const xRatioOnSlider = (x - (CANVAS_WIDTH - SENSITIVITY_SLIDER_WIDTH) / 2) / SENSITIVITY_SLIDER_WIDTH;
        const yRatioOnSlider = (y - (SENSITIVITY_SLIDER_Y - SENSITIVITY_SLIDER_THUMB_SIZE / 2)) / SENSITIVITY_SLIDER_THUMB_SIZE;

        if (between(0, xRatioOnSlider, 1) && between(0, yRatioOnSlider, 1)) {
            MOUSE_SENSITIVITY = xRatioOnSlider;
            localStorage[1] = MOUSE_SENSITIVITY;
        }
    };

    onmousemove = e => {
        // TODO check caniuse
        if (!onMenu) {
            if (P.health) {
                P.angle += e.movementX / (1000 * max(1 - MOUSE_SENSITIVITY, 0.01));
                P.verticalAngle += e.movementY / (1000 * max(1 - MOUSE_SENSITIVITY, 0.01));
            }
        }

        maybeUpdateSensitivity(e);
        can.style.cursor = onMenu ? 'default' : 'none';
    };

    onmousedown = e => {
        const canvasRect = document.querySelector('canvas').getBoundingClientRect();
        const y = (e.clientY - canvasRect.top) / canvasRect.height * CANVAS_HEIGHT;

        isMouseDown = true;
        if (!onMenu) {
            P.weapon.holdTrigger();
        } else if (between(PLAY_BUTTON_Y, y, evaluate(PLAY_BUTTON_Y + PLAY_BUTTON_HEIGHT))) {
            G.resume();
        }

        maybeUpdateSensitivity(e);
    };
    onmouseup = () => {
        P.weapon.releaseTrigger();
        isMouseDown = false;
    };
    onclick = () => !onMenu && document.body.requestPointerLock();

    document.onpointerlockchange = () => {
        const newLock = document.pointerLockElement;
        if (POINTER_LOCKED && !newLock && P.health) {
            toggleMenu();
        }

        POINTER_LOCKED = newLock;
    };
};
