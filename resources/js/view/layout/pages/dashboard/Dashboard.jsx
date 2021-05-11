import React, { Component } from "react";
import { HashRouter, Router, Route, Link, Switch } from "react-router-dom";
import "./style.scss";
import FaceImg from "../../../components/face-img/face";
import FaceVidio from "../../../components/face-vidio/face";
import Details from "../../../components/face-vidio/details";
import Card from "react-bootstrap/Card";
import basis from "../../../db/data";

import axios from "axios";

import swal from "sweetalert";

// ////////
export default class Main extends React.Component {
    render() {
        return (
            <main>
                <Face />
            </main>
        );
    }
}

//  Component Face-recognition
class Face extends Component {
    constructor() {
        super();
        this.state = {
            list_: [{ key: "-", val: "-" }],
            db: new basis(),
            newResultData: [],
        };
        this.child = React.createRef();
        this.pushData = React.createRef();
        // console.log(.base());
    }
    componentDidMount = () => {
        axios
            .get("http://127.0.0.1:8000/api/dataAnakPacu")
            .then(async (res) => {
                const data = await res.data;
                this.setState({
                    newResultData: data,
                });
            });
    };
    // componentDidUpdate = ()=>{
    //   console.log(this.state.newResultData)
    // }
    dataCenter = () => {
        return this.state.db.base();
    };
    resultFace = (data) => {
        // console.log(data);
        if (data.data == false) {
            swal({
                title: "Ma'af",
                text: "Anda tidak di terdaftar di jalur mana pun",
                icon: "error",
                button: "Ok",
            }).then((btn) => {});
        } else {
            this.setState({
                list_: [
                    { key: "id", val: data.id_anak_pacu },
                    { key: "nama", val: data.nama_anak },
                    { key: "jalur", val: data.nama_jalur },
                ],
            });
            this.child.current.hendlerSatatedata();
        }
    };

    upTODate = () => {
        this.pushData.current.hendlerPuhData();
    };
    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-lg-5">
                    <div className="c-card">
                        <Details ref={this.child} details={this.state.list_} />
                    </div>
                </div>
                <div className="col-md-6 col-lg-7">
                    <Card
                        className="c-card mt-1"
                        style={{ border: "none" }}
                        value="ok"
                    >
                        <Card.Body
                            style={{
                                padding: "0px",
                                textAlign: "left",
                            }}
                        >
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                    this.pushData.current.play();
                                }}
                            >
                                Play
                            </button>
                        </Card.Body>
                    </Card>
                    {/* <FaceImg /> */}
                    <FaceVidio
                        resultData={this.state.newResultData}
                        ref={this.pushData}
                        result={(value) => {
                            this.resultFace(value);
                        }}
                    />
                </div>
            </div>
        );
    }
}
