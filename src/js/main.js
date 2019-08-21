onload = () => {
    onresize(); // trigger initial sizing pass

    setupMenu();

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
};

onmousemove = e => {
    // TODO check caniuse
    if (!onMenu && P.health) {
        P.angle += e.movementX / document.body.clientWidth * 2 * Math.PI;
        P.verticalAngle += e.movementY / document.body.clientHeight * 2 * Math.PI;
    }
};

onmousedown = () => {
    P.weapon.holdTrigger();
};

onmouseup = () => {
    P.weapon.releaseTrigger();
};

onclick = () => {
    !onMenu && document.body.requestPointerLock();
};
