randomizeColor = components => {
    return components.map(x => limit(0, x + ~~rnd(-2, 2), 0xf));
};

randomBrightColor = () => {
    const components = [pick([0x8, 0xf]), pick([0x0, 0x8, 0xf])];
    components.splice(~~rnd(0, 3), 0, 0x0);
    return components;
};

invertColor = components => {
    return components.map(x => 0xf - x);
};

toColor = components => {
    return '#' + components.map(x => x.toString(16)).join('');
};
