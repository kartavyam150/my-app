import React, { useState, useEffect, useRef } from 'react';

const SpeedTest = () => {
    const [downloadSpeed, setDownloadSpeed] = useState(0);
    const [uploadSpeed, setUploadSpeed] = useState(0);
    const [ping, setPing] = useState(0);
    const [isTesting, setIsTesting] = useState(false);
    const [status, setStatus] = useState('Idle');
    const [hasTestStarted, setHasTestStarted] = useState(false);

    // Refs to stop tests and track live progress
    const abortRef = useRef(null);
    const metricsRef = useRef({ totalBits: 0, startTime: 0 });

    const testPing = async () => {
        setStatus('Testing Ping...');
        try {
            const pings = [];
            for (let i = 0; i < 5; i++) {
                if (abortRef.current?.signal.aborted) return;
                const start = performance.now();
                await fetch(`https://www.google.com/favicon.ico?cache=${Math.random()}`, { mode: 'no-cors', signal: abortRef.current?.signal });
                const end = performance.now();
                pings.push(end - start);
            }
            if (!pings.length) throw new Error("No pings completed");

            pings.sort((a, b) => a - b);
            // Simple average
            const avgPing = pings.reduce((a, b) => a + b, 0) / pings.length;
            setPing(Math.round(avgPing));
            setStatus('Ping Test Complete!');
        } catch (err) {
            console.error("Ping test failed:", err);
            setPing('N/A');
        }
    };

    // Helper to run tasks with constant concurrency for a fixed time
    const runDurationTest = async (taskFn, durationMs, concurrency, onProgress) => {
        const startTime = performance.now();
        const endTime = startTime + durationMs;
        metricsRef.current = { totalBits: 0, startTime };

        let activeWorkers = 0;
        let isDone = false;

        return new Promise((resolve) => {
            const checkDone = () => {
                const now = performance.now();
                if ((now >= endTime || abortRef.current?.signal.aborted) && activeWorkers === 0) {
                    isDone = true;
                    resolve();
                }
            };

            const startWorker = async () => {
                activeWorkers++;
                while (performance.now() < endTime && !isDone && !abortRef.current?.signal.aborted) {
                    try {
                        const bits = await taskFn();
                        metricsRef.current.totalBits += bits;
                    } catch (e) {
                        // ignore failed chunks
                    }
                }
                activeWorkers--;
                checkDone();
            };

            // Start initial pool
            for (let i = 0; i < concurrency; i++) {
                startWorker();
            }
        });
    };

    const testDownloadSpeed = async () => {
        setStatus('Testing Download Speed...');
        setDownloadSpeed(0);

        const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
        const DURATION = 10000; // 10s
        const CONCURRENT = 8;

        const downloadTask = async () => {
            const url = `https://speed.cloudflare.com/__down?bytes=${CHUNK_SIZE}&_=${Math.random()}`;
            const res = await fetch(url, { signal: abortRef.current?.signal, cache: "no-store" });
            await res.arrayBuffer();
            return CHUNK_SIZE * 8;
        };

        const intervalId = setInterval(() => {
            const now = performance.now();
            const duration = (now - metricsRef.current.startTime) / 1000;
            if (duration > 0.5) {
                const speed = (metricsRef.current.totalBits / duration / 1e6).toFixed(2);
                setDownloadSpeed(speed);
            }
        }, 150);

        await runDurationTest(downloadTask, DURATION, CONCURRENT);
        clearInterval(intervalId);

        const now = performance.now();
        const duration = (now - metricsRef.current.startTime) / 1000;
        if (duration > 0) {
            setDownloadSpeed((metricsRef.current.totalBits / duration / 1e6).toFixed(2));
        }
        setStatus('Download Test Complete!');
    };

    const testUploadSpeed = async () => {
        setStatus('Testing Upload Speed...');
        setUploadSpeed(0);

        const CHUNK_SIZE = 1 * 1024 * 1024;
        const DURATION = 5000;
        const CONCURRENT = 2;

        const data = new Uint8Array(CHUNK_SIZE);
        for (let i = 0; i < CHUNK_SIZE; i++) data[i] = Math.random() * 255;
        const blob = new Blob([data], { type: 'application/octet-stream' });

        const uploadTask = async () => {
            await fetch('https://httpbin.org/post', {
                method: 'POST',
                body: blob,
                headers: { 'Content-Type': 'application/octet-stream' },
                signal: abortRef.current?.signal,
                cache: "no-store"
            });
            return CHUNK_SIZE * 8;
        };

        const intervalId = setInterval(() => {
            const now = performance.now();
            const duration = (now - metricsRef.current.startTime) / 1000;
            if (duration > 0.5) {
                const speed = (metricsRef.current.totalBits / duration / 1e6).toFixed(2);
                setUploadSpeed(speed);
            }
        }, 150);

        await runDurationTest(uploadTask, DURATION, CONCURRENT);
        clearInterval(intervalId);

        const now = performance.now();
        const duration = (now - metricsRef.current.startTime) / 1000;
        if (duration > 0) {
            setUploadSpeed((metricsRef.current.totalBits / duration / 1e6).toFixed(2));
        }
        setStatus('Upload Test Complete!');
    };

    const startSpeedTest = async () => {
        if (isTesting) return;

        abortRef.current = new AbortController();
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
        return () => {
            if (abortRef.current) abortRef.current.abort();
        };
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col items-center justify-center p-6 selection:bg-cyan-500/30">
            {/* Header */}
            <div className="absolute top-8 left-8 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-default">
                <span className="text-cyan-400 text-2xl">⚡</span>
                <span className="font-bold tracking-widest text-sm uppercase">SpeedTest</span>
                <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-400">v3.1</span>
            </div>

            <div className="w-full max-w-4xl flex flex-col items-center gap-12">

                {/* Main Display: Changes context based on state */}
                <div className="flex flex-col items-center gap-4 min-h-[200px] justify-center text-center">
                    {!hasTestStarted ? (
                        <>
                            <h1 className="text-4xl md:text-6xl font-light text-slate-200">
                                Check your speed
                            </h1>
                            <p className="text-slate-500 text-lg max-w-md">
                                Accurate, fast, and continuous internet speed analysis directly from your browser.
                            </p>
                        </>
                    ) : (
                        <div className="animate-in fade-in zoom-in duration-500">
                            {/* Hero Speed Number */}
                            <div className="flex flex-col items-center justify-end">
                                <div className="flex items-baseline gap-2 leading-none">
                                    <span className="text-8xl md:text-9xl font-thin tabular-nums tracking-tighter text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                                        {status.includes('Upload') ? uploadSpeed : downloadSpeed}
                                    </span>
                                    <span className="text-3xl text-slate-600 font-light">Mb/s</span>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-cyan-200/50 uppercase tracking-widest text-sm font-medium">
                                    {isTesting && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                                    {status}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions Area */}
                <div className="relative z-10">
                    <button
                        onClick={startSpeedTest}
                        disabled={isTesting}
                        className={`
                            relative group overflow-hidden rounded-full px-12 py-4 md:px-16 md:py-6
                            font-medium tracking-wide text-lg transition-all duration-300
                            ${isTesting
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                                : 'bg-white text-slate-950 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]'
                            }
                        `}
                    >
                        <span className="relative z-10">{isTesting ? 'Testing...' : hasTestStarted ? 'Test Again' : 'Start Test'}</span>
                    </button>
                </div>

                {/* Specific Metrics Grid */}
                {hasTestStarted && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mt-8">
                        {/* Ping Card */}
                        <div className="flex flex-col items-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                            <span className="text-slate-500 text-sm uppercase tracking-wider mb-2">Ping</span>
                            <span className={`text-3xl font-light ${ping > 0 ? 'text-white' : 'text-slate-700'}`}>
                                {ping || '-'} <span className="text-base text-slate-600">ms</span>
                            </span>
                        </div>

                        {/* Download Card */}
                        <div className={`flex flex-col items-center p-6 rounded-2xl border backdrop-blur-sm transition-colors duration-500 ${status.includes('Download') ? 'bg-slate-800/80 border-cyan-900/30 shadow-[0_0_20px_rgba(8,145,178,0.1)]' : 'bg-slate-900/50 border-slate-800'}`}>
                            <span className="text-slate-500 text-sm uppercase tracking-wider mb-2">Download</span>
                            <span className={`text-3xl font-light ${downloadSpeed > 0 ? 'text-cyan-400' : 'text-slate-700'}`}>
                                {downloadSpeed || '-'} <span className="text-base text-slate-600">Mb/s</span>
                            </span>
                        </div>

                        {/* Upload Card */}
                        <div className={`flex flex-col items-center p-6 rounded-2xl border backdrop-blur-sm transition-colors duration-500 ${status.includes('Upload') ? 'bg-slate-800/80 border-purple-900/30' : 'bg-slate-900/50 border-slate-800'}`}>
                            <span className="text-slate-500 text-sm uppercase tracking-wider mb-2">Upload</span>
                            <span className={`text-3xl font-light ${uploadSpeed > 0 ? 'text-purple-400' : 'text-slate-700'}`}>
                                {uploadSpeed || '-'} <span className="text-base text-slate-600">Mb/s</span>
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-900/10 rounded-full blur-[80px]" />
            </div>
        </div>
    );
};

export default SpeedTest;
