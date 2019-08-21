toggleMenu = () => {
    onMenu = !onMenu;
    document.querySelector('#m').style.display = onMenu ? 'block' : 'none';

    if (!onMenu) {

    }
};


setupMenu = () => {
    document.querySelector('button').onclick = toggleMenu;
};
