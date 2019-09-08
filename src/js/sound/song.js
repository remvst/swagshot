BEAT_PATTERN = {
    "n": [
        137,
        0,
        139,
        0,
        137,
        0,
        0,
        139,
        0,
        0,
        137,
        0,
        0,
        139,
        0,
        0,
        137,
        0,
        139,
        0,
        137,
        0,
        0,
        139,
        0,
        0,
        137,
        0,
        0,
        139,
        0,
        0
    ]
};

AGGRESSIVE_PATTERN = {
    "n": [
        137,
        139,
        137,
        0,
        137,
        139,
        137,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        137,
        139,
        137,
        0,
        137,
        139,
        137,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ]
};

HIHAT = instrument({
    "osc1_oct": 8,
    "osc1_det": 0,
    "osc1_detune": 0,
    "osc1_xenv": 0,
    "osc1_vol": 0,
    "osc1_waveform": 0,
    "osc2_oct": 8,
    "osc2_det": 0,
    "osc2_detune": 0,
    "osc2_xenv": 0,
    "osc2_vol": 0,
    "osc2_waveform": 0,
    "noise_fader": 60,
    "env_attack": 50,
    "env_sustain": 419,
    "env_release": 4607,
    "env_master": 130,
    "fx_filter": 1,
    "fx_freq": 10332,
    "fx_resonance": 120,
    "fx_delay_time": 4,
    "fx_delay_amt": 16,
    "fx_pan_freq": 5,
    "fx_pan_amt": 108,
    "lfo_osc1_freq": 0,
    "lfo_fx_freq": 0,
    "lfo_freq": 5,
    "lfo_amt": 187,
    "lfo_waveform": 0
});

DRUM = instrument({
    "osc1_oct": 7,
    "osc1_det": 0,
    "osc1_detune": 0,
    "osc1_xenv": 1,
    "osc1_vol": 255,
    "osc1_waveform": 0,
    "osc2_oct": 7,
    "osc2_det": 0,
    "osc2_detune": 0,
    "osc2_xenv": 1,
    "osc2_vol": 255,
    "osc2_waveform": 0,
    "noise_fader": 0,
    "env_attack": 50,
    "env_sustain": 150,
    "env_release": 4800,
    "env_master": 200,
    "fx_filter": 2,
    "fx_freq": 600,
    "fx_resonance": 254,
    "fx_delay_time": 0,
    "fx_delay_amt": 0,
    "fx_pan_freq": 0,
    "fx_pan_amt": 0,
    "lfo_osc1_freq": 0,
    "lfo_fx_freq": 0,
    "lfo_freq": 0,
    "lfo_amt": 0,
    "lfo_waveform": 0
});

SNARE = instrument({
    "osc1_oct": 8,
    "osc1_det": 0,
    "osc1_detune": 0,
    "osc1_xenv": 1,
    "osc1_vol": 82,
    "osc1_waveform": 2,
    "osc2_oct": 8,
    "osc2_det": 0,
    "osc2_detune": 0,
    "osc2_xenv": 0,
    "osc2_vol": 0,
    "osc2_waveform": 0,
    "noise_fader": 255,
    "env_attack": 100,
    "env_sustain": 0,
    "env_release": 9090,
    "env_master": 232,
    "fx_filter": 3,
    "fx_freq": 5200,
    "fx_resonance": 63,
    "fx_delay_time": 0,
    "fx_delay_amt": 0,
    "fx_pan_freq": 0,
    "fx_pan_amt": 0,
    "lfo_osc1_freq": 0,
    "lfo_fx_freq": 0,
    "lfo_freq": 0,
    "lfo_amt": 0,
    "lfo_waveform": 0
});

ELECTRO = instrument({
    "osc1_oct": 6,
    "osc1_det": 0,
    "osc1_detune": 0,
    "osc1_xenv": 0,
    "osc1_vol": 192,
    "osc1_waveform": 1,
    "osc2_oct": 8,
    "osc2_det": 0,
    "osc2_detune": 8,
    "osc2_xenv": 0,
    "osc2_vol": 82,
    "osc2_waveform": 2,
    "noise_fader": 0,
    "env_attack": 100,
    "env_sustain": 4545,
    "env_release": 2727,
    "env_master": 192,
    "fx_filter": 3,
    "fx_freq": 2700,
    "fx_resonance": 85,
    "fx_delay_time": 6,
    "fx_delay_amt": 60,
    "fx_pan_freq": 6,
    "fx_pan_amt": 86,
    "lfo_osc1_freq": 0,
    "lfo_fx_freq": 1,
    "lfo_freq": 7,
    "lfo_amt": 106,
    "lfo_waveform": 0
});

HIHAT.c = DRUM.c = ELECTRO.c = [BEAT_PATTERN];
SNARE.c = [AGGRESSIVE_PATTERN];

HIHAT.p     = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
DRUM.p      = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
SNARE.p     = [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0];
ELECTRO.p   = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0];

new MusicGenerator({
    "rowLen": 5513,
    "endPattern": HIHAT.p.length,
    "songData": [HIHAT, DRUM, SNARE, ELECTRO],
    "songLen": (HIHAT.p.length - 1) * 4
}).createAudioBuffer(buffer => {
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    if (DEBUG) {
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 0;
        gainNode.connect(audioCtx.destination);
        source.connect(gainNode);
    } else {
        source.connect(audioCtx.destination);
    }

    source.start();
});
