onload = () => {
    onresize(); // trigger initial sizing pass

    const can = document.querySelector('canvas');
    can.width = CANVAS_WIDTH;
    can.height = CANVAS_HEIGHT;

    R = can.getContext('2d', { 'alpha': false });
    R.imageSmoothingEnabled = false;

    // Shortcut for all canvas methods to the main canvas
    Object.getOwnPropertyNames(p).forEach(n => {
        if (R[n] && R[n].call) {
            w[n] = p[n].bind(R);
        }
    });

    // Detect available fonts
    R.font = nomangle('99pt f'); // Setting a font that obviously doesn't exist
    const reference = measureText(w.title).width;

    for (let fontName of [nomangle('Mono'), nomangle('Courier')]) {
        R.font = '99pt ' + fontName;
        if (measureText(w.title).width != reference) {
            monoFont = fontName;
            break;
        }
    }

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
        }
    };

    onmousemove = e => {
        // TODO check caniuse
        if (!onMenu) {
            if (P.health) {
                P.angle += e.movementX / (500 * max(1 - MOUSE_SENSITIVITY, 0.1));
                P.verticalAngle += e.movementY / (500 * max(1 - MOUSE_SENSITIVITY, 0.1));
            }
        }

        maybeUpdateSensitivity(e);
        can.style.cursor = onMenu ? 'default' : 'none';
    };

    onmousedown = e => {
        isMouseDown = true;
        if (!onMenu) {
            P.weapon.holdTrigger();
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
        if (POINTER_LOCKED && !newLock) {
            toggleMenu();
        }

        POINTER_LOCKED = newLock;
    };
};
