w.down = {};
onkeydown = e => {
    w.down[e.keyCode] = true;

    if (e.keyCode == 27) {
        toggleMenu();
    }
};
onkeyup = e => {
    w.down[e.keyCode] = false;
};
