import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-9">
                    <footer className="pt-4 my-md-5 pt-md-5 border-top">
                        <div className="row">
                            <div className="col-12 col-md">
                                <img className="mb-2" src="/images/logo.png" alt="" width="24" height="24" />
                                    <small className="d-block mb-3 text-muted">&copy; 2017-2018</small>
                            </div>
                            <div className="col-6 col-md">
                                <h5>Features</h5>
                                <ul className="list-unstyled text-small">
                                    <li><a className="text-muted" href="#cool">Cool stuff</a></li>
                                    <li><a className="text-muted" href="#random">Random feature</a></li>
                                    <li><a className="text-muted" href="#team">Team feature</a></li>
                                    <li><a className="text-muted" href="#stuff">Stuff for developers</a></li>
                                    <li><a className="text-muted" href="#another">Another one</a></li>
                                    <li><a className="text-muted" href="#last">Last time</a></li>
                                </ul>
                            </div>
                            <div className="col-6 col-md">
                                <h5>Resources</h5>
                                <ul className="list-unstyled text-small">
                                    <li><a className="text-muted" href="#resource">Resource</a></li>
                                    <li><a className="text-muted" href="#name">Resource name</a></li>
                                    <li><a className="text-muted" href="#someother">Another resource</a></li>
                                    <li><a className="text-muted" href="#final">Final resource</a></li>
                                </ul>
                            </div>
                            <div className="col-6 col-md">
                                <h5>About</h5>
                                <ul className="list-unstyled text-small">
                                    <li><a className="text-muted" href="#team">Team</a></li>
                                    <li><a className="text-muted" href="#locations">Locations</a></li>
                                    <li><a className="text-muted" href="#privacy">Privacy</a></li>
                                    <li><a className="text-muted" href="#terms">Terms</a></li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default Footer;
