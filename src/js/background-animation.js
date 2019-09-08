backgroundAnimation = color => {
    document.body.style.backgroundColor = !onMenu && color;
    document.body.style.transition = null;

    clearTimeout(RESET_BACKGROUND_TIMEOUT);
    RESET_BACKGROUND_TIMEOUT = setTimeout(() => {
        document.body.style.transition = nomangle('background 0.1s');
        document.body.style.backgroundColor = null;
    }, 50);
}
