renderMenu = () => {
    R.imageSmoothingEnabled = true;

    // Title
    R.globalAlpha = 1;
    R.font = '72pt Impact';
    R.textAlign = 'center';
    R.textBaseline = 'middle';
    fs('#fff');
    fillText('[SWAGSHOT]', evaluate(CANVAS_WIDTH / 2), evaluate(CANVAS_HEIGHT * 0.3));

    // Subtitle
    R.font = '14pt Courier';
    fillText(nomangle('TAKE THE STATION BACK... WITH SWAG'), evaluate(CANVAS_WIDTH / 2), evaluate(CANVAS_HEIGHT * 0.4));

    // Sensitivity slider
    // R.font = '14pt Courier';
    fillText(nomangle('MOUSE SENSITIVITY: ') + round(MOUSE_SENSITIVITY * 100) + '%', CANVAS_WIDTH / 2, SENSITIVITY_SLIDER_Y - 30);
    fr((CANVAS_WIDTH - SENSITIVITY_SLIDER_WIDTH) / 2, SENSITIVITY_SLIDER_Y - SENSITIVITY_SLIDER_TRACK_THICKNESS / 2, SENSITIVITY_SLIDER_WIDTH, SENSITIVITY_SLIDER_TRACK_THICKNESS);
    fr((CANVAS_WIDTH - SENSITIVITY_SLIDER_WIDTH) / 2 + MOUSE_SENSITIVITY * SENSITIVITY_SLIDER_WIDTH - SENSITIVITY_SLIDER_THUMB_SIZE / 2, SENSITIVITY_SLIDER_Y - SENSITIVITY_SLIDER_THUMB_SIZE / 2, SENSITIVITY_SLIDER_THUMB_SIZE, SENSITIVITY_SLIDER_THUMB_SIZE);

    // Button
    // R.textAlign = 'center';
    R.textBaseline = 'middle';
    wrap(() => {
        R.globalAlpha = 1 - ON_PLAY_BUTTON * 0.2;
        fs('#A20');
        fr((CANVAS_WIDTH - PLAY_BUTTON_WIDTH) / 2, PLAY_BUTTON_Y, PLAY_BUTTON_WIDTH, PLAY_BUTTON_HEIGHT);

        R.font = '24pt Courier';
        R.fs('#fff');
        fillText(nomangle('PLAY'), CANVAS_WIDTH / 2, PLAY_BUTTON_Y + PLAY_BUTTON_HEIGHT / 2);
    });
};
