import React, { useState } from 'react';
import RecordRTC from 'recordrtc';
import { saveAs } from 'file-saver';
import axios from 'axios';

// import JSZip from 'jszip';


// let gumStream = null;
// let recorder = null;
// let audioContext = null;

function Interview() {
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const newRecorder = RecordRTC(stream, {
                    type: 'audio',
                    mimeType: 'audio/wav',
                });
                newRecorder.startRecording();
                setRecorder(newRecorder);
                setIsRecording(true);
            })
            .catch(err => console.error('Error accessing audio devices:', err));
    };

    const stopRecording = () => {
        recorder.stopRecording(() => {
            const audioBlob = recorder.getBlob();
            const formData = new FormData();
            formData.append('audioFile', audioBlob, 'recording.wav');

            // Convert to MP3 using a library or API if needed here
            // Example: Upload to your API endpoint

            axios.post('http://localhost:4500/api/validate', formData)
                .then((response) => {
                    console.log(response)
                })
                .catch((err) => {
                    console.log(err)
                });

            // fetch('http://localhost:4500/api/validate', {
            //     method: 'POST',
            //     body: formData,
            // })
            //     .then(response => {
            //         // var res = response.json();
            //         console.log('res -> ', response)
            //     })
            //     .then(data => console.log('Upload success:', data))
            //     .catch(error => console.error('Upload error:', error));

            // Optionally, save the file locally
            //saveAs(audioBlob, 'recording.wav');
        });
        setIsRecording(false);
    };

    return (
        <div>
            <h1>Audio Recorder</h1>
            {isRecording ? (
                <button onClick={stopRecording}>Stop Recording</button>
            ) : (
                <button onClick={startRecording}>Start Recording</button>
            )}
        </div>
    );



    // const startRecording = () => {
    //     let constraints = {
    //         audio: true,
    //         video: false
    //     }

    //     audioContext = new window.AudioContext();
    //     console.log("sample rate: " + audioContext.sampleRate);

    //     navigator.mediaDevices
    //         .getUserMedia(constraints)
    //         .then(function (stream) {
    //             console.log("initializing Recorder.js ...");

    //             gumStream = stream;

    //             let input = audioContext.createMediaStreamSource(stream);

    //             recorder = new window.Recorder(input, {
    //                 numChannels: 1
    //             })

    //             recorder.record();
    //             console.log("Recording started");
    //         }).catch(function (err) {
    //             //enable the record button if getUserMedia() fails
    //             console.log("error =>", err);
    //     });

    // }

    // const stopRecording = () => {
    //     console.log("stopButton clicked");

    //     recorder.stop(); //stop microphone access
    //     gumStream.getAudioTracks()[0].stop();

    //     recorder.exportWAV(onStop);
    // }

    // const onStop = (blob) => {
    //     console.log("uploading...");

    //     // let data = new FormData();

    //     // // data.append('text', "this is the transcription of the audio file");
    //     // data.append('audioFile', blob, "recording.wav");

    //     // const config = {
    //     //     headers: {'content-type': 'multipart/form-data'}
    //     // }
    //     // axios.post('http://localhost:4500/api/validate', data, config);
    // }

    // return (
    //     <div>
    //         <button onClick={startRecording} type="button">Start</button>
    //         <button onClick={stopRecording} type="button">Stop</button>
    //     </div>
    // );
}

export default Interview;