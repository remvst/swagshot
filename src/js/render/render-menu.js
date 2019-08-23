renderMenu = () => {
    R.globalAlpha = 0.5;
    R.fs('#000');
    fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Title
    R.globalAlpha = 1;
    R.font = '36pt Courier';
    R.textAlign = 'center';
    R.textBaseline = 'middle';
    R.fs('#fff');
    fillText('[TO HELL AND BACK]', CANVAS_WIDTH / 2, CANVAS_HEIGHT * 0.25);

    // Subtitle
    R.font = '14pt Courier';
    fillText(nomangle('WE THOUGHT MARS WAS SAFE... IT WASN\'T'), CANVAS_WIDTH / 2, CANVAS_HEIGHT * 0.35);

    // Button
    wrap(() => {
        R.fs('#A02E00');
        fillRect((CANVAS_WIDTH - PLAY_BUTTON_WIDTH) / 2, PLAY_BUTTON_Y, PLAY_BUTTON_WIDTH, PLAY_BUTTON_HEIGHT);

        R.font = '24pt Courier';
        R.fs('#fff');
        fillText(nomangle('PLAY'), CANVAS_WIDTH / 2, PLAY_BUTTON_Y + PLAY_BUTTON_HEIGHT / 2);
    });

    // Sensitivity slider
    R.font = '14pt Courier';
    fillText(nomangle('SENSITIVITY: ') + round(MOUSE_SENSITIVITY * 100) + '%', CANVAS_WIDTH / 2, SENSITIVITY_SLIDER_Y - 30);
    fillRect((CANVAS_WIDTH - SENSITIVITY_SLIDER_WIDTH) / 2, SENSITIVITY_SLIDER_Y - SENSITIVITY_SLIDER_TRACK_THICKNESS / 2, SENSITIVITY_SLIDER_WIDTH, SENSITIVITY_SLIDER_TRACK_THICKNESS);
    fillRect((CANVAS_WIDTH - SENSITIVITY_SLIDER_WIDTH) / 2 + MOUSE_SENSITIVITY * SENSITIVITY_SLIDER_WIDTH - SENSITIVITY_SLIDER_THUMB_SIZE / 2, SENSITIVITY_SLIDER_Y - SENSITIVITY_SLIDER_THUMB_SIZE / 2, SENSITIVITY_SLIDER_THUMB_SIZE, SENSITIVITY_SLIDER_THUMB_SIZE);
};
