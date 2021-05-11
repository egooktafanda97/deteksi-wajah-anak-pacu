import React from "react";
import css from "./_css.scss";
import $ from "jquery";
import * as canvas from "canvas";
import * as faceapi from "face-api.js";
import ego from "../assets/img/ego.jpg";
import ReactDom from "react-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";

import UseImg from "../../../Helpers/dependencies";

// /////////// vidio /////////

// import Vegi from "../assets/video/egi.mp4";
// import TOmpul from "../assets/video/tompul.mp4";

// /////////////////////////

var times = null;
export default class FaceVidio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCenter: this.props.resultData,
            vd: null,
            // resultData: this.props.resultData,
        };
    }
    imageToBase64 = (URL) => {
        let image;
        image = new Image();
        image.crossOrigin = "Anonymous";
        image.addEventListener("load", function () {
            let canvas = document.createElement("canvas");
            let context = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);
            try {
                localStorage.setItem(
                    "saved-image-example",
                    canvas.toDataURL("image/png")
                );
            } catch (err) {
                console.error(err);
            }
        });
        image.src = URL;
    };
    // componentDidUpdate = () => {
    //   this.setState({
    //     resultData : this.props.resultData
    //   });
    // };
    hendlerDataUp = (newData) => {
        this.props.resultData.forEach((rowData, i) => {
            if (rowData.foto == newData) {
                newData = rowData;
                console.log(newData);
            }
        });
        this.props.result(newData);
    };

    hendlerMissingData = (data) => {
        this.props.result({ data: false });
    };

    hendlerPuhData = () => {
        this.setState({
            dataCenter: this.props.resultData,
        });
    };

    detect = async (video, displaySize, eV) => {
        const MODEL_URL = "models";
        await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
        await faceapi.loadFaceLandmarkModel(MODEL_URL);
        await faceapi.loadFaceRecognitionModel(MODEL_URL);
        let canvas = $("#canvas").get(0);
        let ii = 1;
        times = setInterval(async () => {
            ii++;
            let fullFaceDescriptions = await faceapi
                .detectAllFaces(video)
                .withFaceLandmarks()
                .withFaceDescriptors();
            let canvas = $("#canvas").get(0);
            faceapi.matchDimensions(canvas, displaySize);

            const fullFaceDescription = faceapi.resizeResults(
                fullFaceDescriptions,
                displaySize
            );
            // faceapi.draw.drawDetections(canvas, fullFaceDescriptions)
            let ar = [];
            this.props.resultData.map((aws, i) => {
                ar.push(aws.foto);
            });

            const labels = ar;

            const labeledFaceDescriptors = await Promise.all(
                labels.map(async (label) => {
                    // fetch image data from urls and convert blob to HTMLImage element
                    // const imgUrl = `/assets/img/ego.JPG`;
                    const imgUrl = UseImg(label);
                    const img = await faceapi.fetchImage(imgUrl);

                    // detect the face with the highest score in the image and compute it's landmarks and face descriptor
                    const fullFaceDescription = await faceapi
                        .detectSingleFace(img)
                        .withFaceLandmarks()
                        .withFaceDescriptor();

                    if (!fullFaceDescription) {
                        throw new Error(`no faces detected for ${label}`);
                    }
                    const faceDescriptors = [fullFaceDescription.descriptor];
                    return new faceapi.LabeledFaceDescriptors(
                        label,
                        faceDescriptors
                    );
                })
            );

            const maxDescriptorDistance = 0.5;
            const faceMatcher = new faceapi.FaceMatcher(
                labeledFaceDescriptors,
                maxDescriptorDistance
            );

            const results = fullFaceDescriptions.map((fd) =>
                faceMatcher.findBestMatch(fd.descriptor)
            );

            results.forEach((bestMatch, i) => {
                const box = fullFaceDescriptions[i].detection.box;
                const text = bestMatch.toString();
                const drawBox = new faceapi.draw.DrawBox(box);
                if (bestMatch._label != "unknown") {
                    this.hendlerDataUp(bestMatch._label);
                    clearTimeout(times);
                    eV.pause();
                } else if (bestMatch._label == "unknown" && ii > 30) {
                    this.hendlerMissingData(bestMatch._label);
                    clearTimeout(times);
                    eV.pause();
                }
                console.log(fullFaceDescriptions[i]);
                // drawBox.draw(canvas);
            });
        }, 300);
    };

    face = async (e) => {
        this.state.vd = e.target;
        let displaySize = {
            width: e.target.scrollWidth,
            height: e.target.scrollHeight,
        };
        let video = e.target;
        if (video.paused === false) {
            this.detect(video, displaySize, e);
        }
    };

    play = () => {
        // console.log("tes");
        let el = this.state.vd;
        const e = $("#videoElement").get(0);
        let displaySize = {
            width: el.scrollWidth,
            height: el.scrollHeight,
        };
        if (e.paused === false) {
            clearTimeout(times);
            e.pause();
        } else {
            this.detect(el, displaySize, e);
            e.play();
        }
        return false;
    };
    cek = () => "data";
    render() {
        return (
            <div>
                <Card
                    className="c-card mt-1"
                    style={{ border: "none" }}
                    value="ok"
                >
                    <Card.Body>
                        <video
                            width="100%"
                            height="auto"
                            loop
                            // autoplay='true'
                            muted
                            controls
                            id="videoElement"
                            onLoadedMetadata={this.face.bind()}
                            src="http://127.0.0.1:8000/assets/video/egi.mp4"
                        ></video>
                        <canvas
                            id="canvas"
                            className="overlay"
                            style={{
                                left: "0",
                                position: "absolute",
                                top: "0",
                            }}
                        />
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
