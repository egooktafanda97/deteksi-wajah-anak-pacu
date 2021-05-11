import React from "react";
import css from "./css.scss";
import $ from "jquery";
// import '@tensorflow/tfjs-node';
import * as canvas from "canvas";
import * as faceapi from "face-api.js";
// import ego from "../assets/img/ego.jpg";

export default class FaceImage extends React.Component {
    constructor() {
        super();
    }

    hendlerChange = (ev)=>{
      console.log(ev);
    }

    face = async () => {
        const MODEL_URL = "models";
        await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
        await faceapi.loadFaceLandmarkModel(MODEL_URL);
        await faceapi.loadFaceRecognitionModel(MODEL_URL);

        const img = document.getElementById("refimg");
        let fullFaceDescriptions = await faceapi
            .detectAllFaces(img)
            .withFaceLandmarks()
            .withFaceDescriptors();
        const canvas = $("#reflay").get(0);
        faceapi.matchDimensions(canvas, img);

        fullFaceDescriptions = faceapi.resizeResults(fullFaceDescriptions, img);
        faceapi.draw.drawDetections(canvas, fullFaceDescriptions);
        faceapi.draw.drawFaceLandmarks(canvas, fullFaceDescriptions);
    };

    render() {
        this.face();
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="c-card"></div>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <input type="file" className="imgs" onChange={this.hendlerChange} />
                        <div className="card-body">
                            {/* <video
                    controls
                    width='100%'
                    height='auto'
                    autoplay
                    loop
                    muted
                    preload='auto'></video> */}
                            <canvas id="reflay" className="overlay" />
                            <img
                                src="http://127.0.0.1:8000/img/1616993896.jpg"
                                id="refimg"
                                width="100%"
                                height="auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
