const WebSocket = require('ws');

// WebSocket szerver létrehozása
const wss = new WebSocket.Server({ port: 8080 });

let ballState = {
    x: 100,
    y: 100,
    dx: 2,
    dy: 2,
    size: 20, // Pötty mérete
};

wss.on('connection', ws => {
    console.log('Új kapcsolat!');

    // Kezdő állapot küldése
    ws.send(JSON.stringify(ballState));

    // Pötty mozgatása 60 FPS sebességgel
    const intervalId = setInterval(() => {
        // Mozgás frissítése
        ballState.x += ballState.dx;
        ballState.y += ballState.dy;

        // Pattanás a képernyő széléről
        if (ballState.x <= 0 || ballState.x >= 800 - ballState.size) {
            ballState.dx *= -1;
        }
        if (ballState.y <= 0 || ballState.y >= 600 - ballState.size) {
            ballState.dy *= -1;
        }

        // Állapot elküldése a kliensnek
        ws.send(JSON.stringify(ballState));
    }, 16); // 60 FPS (~16ms)

    // Kapcsolat bontása esetén tisztítás
    ws.on('close', () => {
        clearInterval(intervalId);
        console.log('Kapcsolat bontva.');
    });
});
