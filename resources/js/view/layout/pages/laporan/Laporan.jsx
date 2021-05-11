import React, { Component } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import userImg from "../../../../Helpers/dependencies";

export default class Laporan extends Component {
    state = {
        data: [],
    };
    constructor(props) {
        super(props);
    }
    //   construct method
    componentDidMount = () => {
        axios
            .get("http://127.0.0.1:8000/api/dataAnakPacu")
            .then(async (res) => {
                const data = await res.data;
                this.setState({
                    data: data,
                });
            });
    };
    render() {
        return (
            <main>
                <Card>
                    <Card.Body>
                        {/* <ComponentTbale /> */}
                        {/* <Tables /> */}
                        <div className="card-header text-right">
                            <a
                                href="http://127.0.0.1:8000/Pdf_laporan"
                                target="_blank"
                                className="btn btn-info btn-sm"
                            >
                                <i className="fa fa-print" /> Laporan
                            </a>
                        </div>
                        <div className="responsive">
                            <table id="mainTable" className="table table-sm">
                                <thead className="bg-primary">
                                    <tr>
                                        <th className="ta-left">No</th>
                                        <th className="ta-left">Nama</th>
                                        <th className="ta-left">Kecamatan</th>
                                        <th className="ta-left">Desa</th>
                                        <th className="ta-left">Jalur</th>
                                        <th className="ta-left">Sejak</th>
                                        <th className="ta-left">Foto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((res, i) => (
                                        <tr key={i}>
                                            <td className="ta-left _f-13-px">
                                                {i + 1}
                                            </td>
                                            <td className="ta-left _f-13-px">
                                                {res.nama_anak}
                                            </td>
                                            <td className="ta-left _f-13-px">
                                                {res.nama_kec}
                                            </td>
                                            <td className="ta-left _f-13-px">
                                                {res.nama_desa}
                                            </td>
                                            <td className="ta-left _f-13-px">
                                                {res.nama_jalur}
                                            </td>
                                            <td className="ta-left _f-13-px">
                                                {res.sejak}
                                            </td>
                                            <td className="ta-left _f-13-px">
                                                <a
                                                    href={userImg(res.foto)}
                                                    target="balnk"
                                                >
                                                    <img
                                                        src={userImg(res.foto)}
                                                        width="50px"
                                                        height="50px"
                                                    />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card.Body>
                </Card>
            </main>
        );
    }
}
