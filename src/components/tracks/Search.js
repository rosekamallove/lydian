import axios from "axios";
import React, { Component } from "react";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    trackTitle: "",
    lyrics: "",
  };

  findTrack = (dispatch, e) => {
    e.preventDefault();
    if (this.state.trackTitle !== "") {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: "SEARCH_TRACKS",
            payload: res.data.message.body.track_list,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.state.lyrics !== "") {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_lyrics=${this.state.lyrics}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: "SEARCH_TRACKS",
            payload: res.data.message.body.track_list,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Search for a Song
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg mb-5"
                    placeholder="Song title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  ></input>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Lyrics in the Song..."
                    name="lyrics"
                    value={this.state.lyrics}
                    onChange={this.onChange}
                  ></input>
                </div>
                <button
                  className="btn btn-primary btn-block btn-lg mt-5 mb-5"
                  type="submit"
                >
                  <i className="fas fa-search"></i> Search
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
