w.down = {};
onkeydown = e => {
    e.keyCode == 32 && e.preventDefault();
    w.down[e.keyCode] = true;
};
onkeyup = e => {
    e.keyCode == 32 && e.preventDefault();
    w.down[e.keyCode] = false;
};
