/**
 * MISSION 7: THE SIMULATION
 * Chaos Generator for Overwatch System
 */

const http = require('http');

const INCIDENTS = [
    'ไฟไหม้ชุมชนคลองเตย',
    'รถชนกัน 10 คันรวดบนทางด่วน',
    'น้ำท่วมขังรอการระบายรัชดา',
    'พบวัตถุต้องสงสัยหน้าห้าง',
    'แมวติดบนเสาไฟฟ้า',
    'กลุ่มควันสีดำพวยพุ่งนิคมฯ',
    'จราจรติดขัดสาหัสสาทร',
    'ต้นไม้ล้มขวางถนนวิภาวดี'
];

function getRandomCoordinate() {
    // Bangkok Bounds
    // Lat: 13.6 - 13.9
    // Lng: 100.4 - 100.7
    const lat = 13.65 + Math.random() * 0.25;
    const lng = 100.4 + Math.random() * 0.3;
    return { lat, lng };
}

function postIncident() {
    const text = INCIDENTS[Math.floor(Math.random() * INCIDENTS.length)];
    const { lat, lng } = getRandomCoordinate();

    // Note: Currently backend might handle only text, but we send coords for future proofing
    const postData = JSON.stringify({
        text: text,
        lat: lat,
        lng: lng
    });

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/incidents',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            console.log(`[${new Date().toLocaleTimeString()}] SENT: "${text}" | STATUS: ${res.statusCode} | TYPE: ${JSON.parse(data).type}`);
        });
    });

    req.on('error', (e) => {
        console.error(`[ERROR] Problem with request: ${e.message}`);
    });

    req.write(postData);
    req.end();
}

console.log('--- STARTING OVERWATCH SIMULATION ---');
console.log('Press Ctrl+C to stop chaos...');
console.log('-------------------------------------');

// Initial run
postIncident();

// Loop every 5 seconds
setInterval(postIncident, 5000);
