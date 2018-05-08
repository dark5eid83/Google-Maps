import React, { Component } from 'react';
import Auth from "../../../Auth";
import Container from "../../Container/Container";


export default class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            user: null,
            searches: []
        }
    }

    componentDidMount = async () => {
      let res = await Auth.deserialize(localStorage.getItem('token'));

      //Get users current searches
      let searches = await fetch('/api/v1/searches').then(search => search.json());

      console.log("Searches", searches);

      this.setState({user: res.user, searches});
    };


    render() {
        return(
            <Container>
                <div className="row justify-content-center mt-4">
                    <div className="col-3 offset-1">
                        <h5>Search Google Maps</h5>
                        <form method="post" action="/place">
                            <div className="form-group">
                                <input type="text" name="location" className="form-control" aria-describedby="emailHelp" placeholder="Enter place to Visit" />
                                    <small id="emailHelp" className="form-text text-muted">Search places around the World</small>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit <span className="fas fa-arrow-right" /></button>
                        </form>

                        <div className="row">
                            <div className="col-12">
                                <h5 className="mt-4">Your Searches</h5>
                                <ul className="list-group">
                                    {
                                        this.state.searches.map(search => {
                                            return <li className="list-group-item"><span className="fas fa-compass" /> <a href="/dashboard?location=<%= search.name %>">{search.name}</a></li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="col-6">
                        <div className="iframe-wrapper">
                            <iframe title="Google Maps" width="600" height="450" style={{border:0}} src="https://www.google.com/maps/embed/v1/place?key=AIzaSyASw-R8rAV9wcEfdF6Wo42kp54-5jErfQk&q=Virginia" allowFullScreen />
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}