soundPool = (settings, poolSize = 1) => {
    let index = 0;
    const sounds = once(() => [...Array(poolSize)].map(() => jsfxr(settings)));

    return () => {
        const sound = sounds()[index++ % sounds().length];
        sound.play();
        return sound;
    };
};

const explosionSound = soundPool([3,,0.0996,0.4505,0.36,0.14,,-0.02,-0.02,,,,0.51,,-0.04,,-0.02,,1,,,,,0.5]),
    stepSound = soundPool([3,,0.072,0.67,0.22,0.16,,-0.3411,,,,0.2206,0.8545,,,,0.2801,-0.0021,1,,,,,0.5], 20),
    rocketSound = soundPool([3,,0.0996,,0.35,0.68,,-0.6536,,,,,,,,,,,0.46,-0.0799,,,,0.5], 2),
    hurtSound = soundPool([3,,0.0395,,0.222,0.2257,,-0.642,,,,,,,,,,,1,,,0.064,,0.5], 5),
    itemSound = soundPool([0,,0.0996,0.4505,0.22,0.2,,-0.02,-0.02,,,,0.51,,-0.04,,-0.02,,1,,,,,0.5]);
