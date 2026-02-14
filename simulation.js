/**
 * HIDDEN MISSION 1: REALITY ANCHORING (RAG)
 * Based on Real-world Traffic/Accident Data (2024-2025)
 */

const http = require('http');

// Top 5 Congestion & Accident Hotspots in Bangkok
const DATA_SOURCES = [
    {
        name: 'Asok-Phetchaburi',
        text: 'อุบัติเหตุรถเฉี่ยวชนแยกอโศก-เพชรบุรี',
        type: 'ACCIDENT',
        priority: 'HIGH',
        lat: 13.7492,
        lng: 100.5638
    },
    {
        name: 'Ha Yaek Lat Phrao',
        text: 'รถหนาแน่นห้าแยกลาดพร้าวเคลื่อนตัวช้า',
        type: 'GENERAL',
        priority: 'LOW',
        lat: 13.8143,
        lng: 100.5608
    },
    {
        name: 'Rama 9',
        text: 'รถจักรยานยนต์ตัดหน้ากระทันหันแยกพระราม 9',
        type: 'ACCIDENT',
        priority: 'HIGH',
        lat: 13.7569,
        lng: 100.5656
    },
    {
        name: 'Sathorn-Surasak',
        text: 'จราจรติดขัดสะสมแยกสาทร-สุรศักดิ์',
        type: 'GENERAL',
        priority: 'LOW',
        lat: 13.7196,
        lng: 100.5188
    },
    {
        name: 'Pratunam',
        text: 'รถเมล์จอดเสียแยกประตูน้ำ',
        type: 'General',
        priority: 'LOW',
        lat: 13.7503,
        lng: 100.5403
    }
];

function postIncident() {
    // Select random hotspot from real data
    const incident = DATA_SOURCES[Math.floor(Math.random() * DATA_SOURCES.length)];

    // Add some random jitter to simulate different spots in the intersection
    const lat = incident.lat + (Math.random() - 0.5) * 0.002;
    const lng = incident.lng + (Math.random() - 0.5) * 0.002;

    const postData = JSON.stringify({
        text: incident.text,
        lat: lat,
        lng: lng,
        // Optional: override type/priority if backend logic supports direct injection,
        // otherwise backend logic will re-assess based on text.
        // For 'Reality Anchoring', we trust the source data.
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
            // Safe parse
            let responseType = 'UNKNOWN';
            try {
                const json = JSON.parse(data);
                responseType = json.type;
            } catch (e) { }

            console.log(`[${new Date().toLocaleTimeString()}] LOC: ${incident.name} | MSG: "${incident.text}" | TYPE: ${responseType}`);
        });
    });

    req.on('error', (e) => {
        console.error(`[ERROR] Problem with request: ${e.message}`);
    });

    req.write(postData);
    req.end();
}

console.log('--- STARTING R.A.G. SIMULATION (REAL-WORLD DATA) ---');
console.log('Injecting Bangkok Top 5 Hotspots...');
console.log('----------------------------------------------------');

// Initial run
postIncident();

// Loop every 5 seconds
setInterval(postIncident, 5000);
