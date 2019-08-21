w.down = {};
onkeydown = e => {
    e.keyCode == 32 && e.preventDefault();
    w.down[e.keyCode] = true;

    if (e.keyCode == 27) {
        toggleMenu();
    }
};
onkeyup = e => {
    e.keyCode == 32 && e.preventDefault();
    w.down[e.keyCode] = false;
};
