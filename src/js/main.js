onload = () => {
    onresize(); // trigger initial sizing pass

    CANVAS.width = CANVAS_WIDTH;
    CANVAS.height = CANVAS_HEIGHT;

    R = CANVAS.getContext('2d', { 'alpha': false });
    R.imageSmoothingEnabled = false;

    // Shortcut for all canvas methods to the main canvas
    Object.getOwnPropertyNames(canvasProto).forEach(n => {
        if (R[n].call) {
            w[n] = canvasProto[n].bind(R);
        }
    });

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

        const canvasRect = CANVAS.getBoundingClientRect();

        const x = (e.clientX - canvasRect.left) / canvasRect.width * CANVAS_WIDTH;
        const y = (e.clientY - canvasRect.top) / canvasRect.height * CANVAS_HEIGHT;

        const xRatioOnSlider = (x - evaluate(CANVAS_WIDTH - SENSITIVITY_SLIDER_WIDTH) / 2) / SENSITIVITY_SLIDER_WIDTH;
        const yRatioOnSlider = (y - evaluate(SENSITIVITY_SLIDER_Y - SENSITIVITY_SLIDER_THUMB_SIZE / 2)) / SENSITIVITY_SLIDER_THUMB_SIZE;

        if (between(0, xRatioOnSlider, 1) && between(0, yRatioOnSlider, 1)) {
            MOUSE_SENSITIVITY = xRatioOnSlider;
            localStorage[1] = MOUSE_SENSITIVITY;
        }
    };

    onmousemove = e => {
        CANVAS.style.cursor = onMenu || !P.health ? 'default' : 'none';

        // TODO check caniuse
        if (!onMenu) {
            if (P.health) {
                P.angle += e.movementX / (1000 * max(1 - MOUSE_SENSITIVITY, 0.01));
                P.verticalAngle += e.movementY / (1000 * max(1 - MOUSE_SENSITIVITY, 0.01));
            }
        } else {
            if (ON_PLAY_BUTTON = isOnPlayButton(e)) {
                CANVAS.style.cursor = 'pointer';
            }

            maybeUpdateSensitivity(e);
        }
    };

    onmousedown = e => {
        isMouseDown = true;
        if (!onMenu) {
            P.weapon && P.weapon.holdTrigger();
        } else if (ON_PLAY_BUTTON) {
            G.resume();
        }

        maybeUpdateSensitivity(e);
    };
    onmouseup = () => {
        P.weapon && P.weapon.releaseTrigger();
        isMouseDown = false;
    };
    onclick = () => !onMenu && P.health && document.body.requestPointerLock();

    document.onpointerlockchange = () => {
        const newLock = document.pointerLockElement;
        if (POINTER_LOCKED && !newLock && P.health) {
            toggleMenu();
        }

        POINTER_LOCKED = newLock;
    };

    isOnPlayButton = e => {
        const canvasRect = CANVAS.getBoundingClientRect();
        const x = (e.clientX - canvasRect.left) / canvasRect.width * CANVAS_WIDTH;
        const y = (e.clientY - canvasRect.top) / canvasRect.height * CANVAS_HEIGHT;

        return between(
            PLAY_BUTTON_Y,
            y,
            evaluate(PLAY_BUTTON_Y + PLAY_BUTTON_HEIGHT)
        ) && between(
            evaluate(CANVAS_WIDTH / 2 - PLAY_BUTTON_WIDTH / 2),
            x,
            evaluate(CANVAS_WIDTH / 2 + PLAY_BUTTON_WIDTH / 2)
        );
    }
};
