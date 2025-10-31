import React, { useState, useEffect } from 'react';
import './SpeedTest.css';

const SpeedTest = () => {
    const [downloadSpeed, setDownloadSpeed] = useState(0);
    const [uploadSpeed, setUploadSpeed] = useState(0);
    const [ping, setPing] = useState(0);
    const [isTesting, setIsTesting] = useState(false);
    const [status, setStatus] = useState('Idle');
    const [hasTestStarted, setHasTestStarted] = useState(false);

    const testPing = async () => {
        setStatus('Testing Ping...');
        try {
            const start = performance.now();
            await new Promise((resolve, reject) => {
                const img = new Image();
                img.src = `https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg?cache=${Math.random()}`;
                img.onload = resolve;
                img.onerror = reject;
            });
            const end = performance.now();
            const latency = Math.round(end - start);
            setPing(latency);
            setStatus('Ping Test Complete!');
        } catch (err) {
            console.error("Ping test failed:", err);
            setStatus("Ping Test Failed");
            setPing('N/A');
        }
    };

    const testDownloadSpeed = async () => {
        setStatus('Testing Download Speed...');
        setDownloadSpeed(0);

        const fileSizes = [1000000, 2000000, 3000000, 4000000]; // Bytes (1MB to 4MB)
        let totalBits = 0;
        let totalTime = 0;

        try {
            for (let size of fileSizes) {
                const url = `https://speed.cloudflare.com/__down?bytes=${size}&_=${Math.random()}`;
                const start = performance.now();
                const response = await fetch(url, { cache: 'no-store' });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                await response.arrayBuffer();
                const end = performance.now();

                const duration = (end - start) / 1000; // seconds
                const bitsLoaded = size * 8;
                totalBits += bitsLoaded;
                totalTime += duration;
            }

            const speedMbps = (totalBits / totalTime / (1024 * 1024)).toFixed(2);
            setDownloadSpeed(speedMbps);
            setStatus('Download Test Complete!');
        } catch (err) {
            console.error("Download test failed:", err);
            setStatus('Download Test Failed');
        }
    };

    const testUploadSpeed = async () => {
        setStatus('Testing Upload Speed...');
        setUploadSpeed(0);

        const chunkSize = 1000000; // 1 MB
        const chunks = 5;
        let totalBits = 0;
        let totalTime = 0;

        try {
            for (let i = 0; i < chunks; i++) {
                const dummyData = new Uint8Array(chunkSize).map(() => Math.floor(Math.random() * 256));
                const dummyBlob = new Blob([dummyData], { type: 'application/octet-stream' });

                const start = performance.now();
                const response = await fetch('https://httpbin.org/post', {
                    method: 'POST',
                    body: dummyBlob,
                    headers: {
                        'Content-Type': 'application/octet-stream',
                    },
                });
                await response.text(); // Consume the response
                const end = performance.now();

                const duration = (end - start) / 1000;
                totalBits += chunkSize * 8;
                totalTime += duration;
            }

            const speedMbps = (totalBits / totalTime / (1024 * 1024)).toFixed(2);
            setUploadSpeed(speedMbps);
            setStatus('Upload Test Complete!');
        } catch (err) {
            console.error("Upload test failed:", err);
            setStatus('Upload Test Failed');
        }
    };

    const startSpeedTest = async () => {
        setDownloadSpeed(0);
        setUploadSpeed(0);
        setPing(0);
        setIsTesting(true);
        setHasTestStarted(true);

        await testPing();
        await testDownloadSpeed();
        await testUploadSpeed();

        setStatus('Speed Test Complete!');
        setIsTesting(false);
    };

    useEffect(() => {
        // No auto test on mount
    }, []);

    return (
        <div className="speed-test-container">
            <div className="header-section">
                <h2>Internet speed test</h2>
                <div className="speedtest-logo">
                    <span className="icon">⚡</span> SPEEDTEST
                </div>
            </div>
            <button className="rerun-button" onClick={startSpeedTest} disabled={isTesting}>
                {isTesting ? 'Testing...' : 'Rerun'}
            </button>
            {!hasTestStarted && (
                <button className="start-button" onClick={startSpeedTest} disabled={isTesting}>
                    Start Test
                </button>
            )}
            {hasTestStarted && (
                <div className="speed-results-summary">
                    <div className="result-item">
                        <span className="label">Ping</span>
                        <span className="value">{ping} ms</span>
                    </div>
                    <div className="result-item">
                        <span className="label">Download</span>
                        <span className="value">{downloadSpeed} Mb/s</span>
                    </div>
                    <div className="result-item">
                        <span className="label">Upload</span>
                        <span className="value">{uploadSpeed} Mb/s</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpeedTest;
