randomizeColor = (components, factor) => {
    return components.map(x => x + rnd(-(factor || 2), factor || 2));
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
    return '#' + components.map(x => limit(0, ~~x, 0xf).toString(16)).join('');
};

multiply = (components, factor) => {
    return components.map(x => x * factor);
};


randomGrayColor = () => {
    const component = pick([0x6, 0x3]);
    return [component, component, component];
};
