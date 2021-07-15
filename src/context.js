import axios from "axios";
import React, { Component } from "react";
const Context = React.createContext();

const defaultURL = "https://api.musixmatch.com/ws/1.1/";
const corsAnywhere = "https://cors-anywhere.herokuapp.com";
const topChartURL =
  "chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=";

export class Provider extends Component {
  state = {
    track_list: [
      {
        track: {
          track_name: "abc",
        },
        track2: {
          track_name: "123",
        },
      },
    ],
    heading: "Top 10 Tracks",
  };

  componentDidMount() {
    axios
      .get(
        ` ${corsAnywhere}/${defaultURL}${topChartURL}${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        console.log(res);
        this.setState({ track_list: res.data.message.body.track_list });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
