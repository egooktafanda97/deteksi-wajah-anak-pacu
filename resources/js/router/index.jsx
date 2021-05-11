import React, { Component } from "react";
import { HashRouter, Router, Route, Link, Switch } from "react-router-dom";

/////page ////

import Navigasi from "../view/layout/nav/Navigasi";
import Dashboard from "../view/layout/pages/dashboard/Dashboard";
import InputJalur from "../view/layout/pages/input-jalur/index";
import InputAnakPacu from "../view/layout/pages/input-anak-pacu/index";
import Laporan from "../view/layout/pages/laporan/Laporan";
export default function index() {
    return (
        <>
            <aside className="wrapper">
                <Navigasi />
            </aside>
            <Switch>
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route path="/home">
                    <Dashboard />
                </Route>
                <Route exact path="/input_jalur">
                    <InputJalur />
                </Route>
                <Route path="/input_anak_pacu">
                    <InputAnakPacu />
                </Route>
                <Route path="/laporan">
                    <Laporan />
                </Route>
            </Switch>
        </>
    );
}
