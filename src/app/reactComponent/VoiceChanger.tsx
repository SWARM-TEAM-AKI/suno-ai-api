import {useEffect, useState} from "react";

export const VoiceChanger = () => {
    const [transcript, setTranscript] = useState<string>('');

    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recog = new SpeechRecognition();
        recog.lang = 'ja-JP';
        // recog.lang = 'en-EN';
        recog.interimResults = false;
        recog.maxAlternatives = 1;
        setRecognition(recog);

        recog.onresult = (event) => {
            const lastResult = event.results![event.results.length - 1];
            if (lastResult.isFinal) {
                const text = lastResult[0].transcript;
                setTranscript(text);
                console.log(`Recognized text: ${text}`);
            }
        };

        recog.onerror = (event) => {
            console.error('Speech recognition error', event.error);
        };
    }, []);
    const startRecognition = () => {
        recognition?.start();
    };

    const stopRecognition = () => {
        recognition?.stop();
    };
    return <>
        <button onClick={startRecognition}>音声認識開始</button>
        <br/>
        <button onClick={stopRecognition}>音声認識停止</button>
        <p>認識されたテキスト: {transcript}</p>
    </>
}