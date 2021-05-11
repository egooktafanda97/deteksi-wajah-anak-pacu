import React from "react";
import "./css.scss";
import { Router, Route, Link, Switch, NavLink } from "react-router-dom";

const HeaderNav = () => {
    return (
        <div className="sidebar-top">
            <div className="children">
                <div className="th" width="100%">
                    <img
                        src="http://127.0.0.1:8000/images/logo.png"
                        width="70px"
                        height="100px"
                    />
                </div>
                <div className="fild">
                    <p>Dinas Pariwisata Kuantan singingi</p>
                </div>
            </div>
        </div>
    );
};

const NavItem = (props) => {
    return (
        <div className="M-navItems">
            <div className={"C-navItems " + props.active}>
                <i className={props.icon} aria-hidden="true"></i>{" "}
                <span>{props.title}</span>
            </div>
        </div>
    );
};

export default function Navigasi() {
    return (
        <div id="c-nav">
            <div className="navs">
                <HeaderNav />
                <div className="s-title"></div>

                <NavLink to="/">
                    <NavItem title="Home" icon="fa fa-home" />
                </NavLink>
                <NavLink to="/input_jalur">
                    <NavItem title="Input Jalur" icon="fa fa-database" />
                </NavLink>
                <NavLink to="/input_anak_pacu">
                    <NavItem title="Data Anak Pacu" icon="fa fa-database" />
                </NavLink>
                <NavLink to="/Laporan">
                    <NavItem title="Laporan" icon="fa fa-file" />
                </NavLink>

                {/* <NavItem title='Pengaturan' icon='fa fa-cog' /> */}

                {/* <NavItem title='Logout' icon='fas fa-sign-out-alt' /> */}
            </div>
        </div>
    );
}
