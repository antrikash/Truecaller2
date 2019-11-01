import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import "./styles.css";
import Pagination from "./Pagination";
import SidebarContent from "./Categories";
import PostDetails from "./PostDetails";

import Sidebar from "react-sidebar";
import MaterialTitlePanel from "./material_title_panel";

import moment from "moment";
const styles = {
  contentHeaderMenuLink: {
    textDecoration: "none",
    color: "white",
    padding: 8
  },
  content: {
    padding: "16px"
  }
};
class App extends React.Component {
  state = {
    data: [],
    page: 1,
    totalPages: null,
    sizeOfPost: 25,
    docked: false,
    open: false,
    transitions: true,
    touch: true,
    shadow: true,
    pullRight: false,
    touchHandleWidth: 20,
    dragToggleDistance: 30
  };

  fetchPost() {
    const URL = `https://public-api.wordpress.com/rest/v1.1/sites/truecaller.blog/posts/?number=${
      this.state.sizeOfPost
    }`;
    fetch(URL)
      .then(function(response) {
        return response.json();
      })
      .then(x => {
        this.setState({
          data: x.posts
        });
      });
  }

  componentDidMount() {
    this.fetchPost();
  }

  func = () => {
    const data = this.state.data;

    console.log(data);
    return data.map(el => {
      return (
        <div key={el.ID} class="card mb-3">
          <img src={el.post_thumbnail.URL} class="card-img-top" alt="photos" />
          <div class="card-body">
            <Link to="/postDetails">
              <h6 class="card-title">{el.title}</h6>
              <PostDetails id={el.ID} />
            </Link>
            <p class="card-text">
              {el.excerpt.substring(3, el.excerpt.length - 5)}
            </p>
            <p class="card-text">
              <small class="text-muted">
                <time>{moment(el.modified).fromNow()}</time>
              </small>
            </p>
          </div>
        </div>
      );
    });
  };

  pageChange = page => {
    this.setState(
      {
        page
      },
      () => this.fetch2()
    );
  };

  onSetOpen = open => {
    this.setState({ open });
  };

  menuButtonClick = ev => {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  };

  postDetails = id => () => {
    alert("hi");
  };

  render() {
    const sidebar = <SidebarContent />;

    const contentHeader = (
      <span>
        {!this.state.docked && (
          <a
            onClick={this.menuButtonClick}
            href="#"
            style={styles.contentHeaderMenuLink}
          >
            =
          </a>
        )}
        <span> Truecaller</span>
      </span>
    );

    const sidebarProps = {
      sidebar,
      docked: this.state.docked,
      sidebarClassName: "custom-sidebar-class",
      contentId: "custom-sidebar-content-id",
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen
    };

    return (
      <Sidebar {...sidebarProps}>
        <MaterialTitlePanel title={contentHeader}>
          <div>
            <div className="container">
              <div className="panel-body ">
                {this.state.data.length > 0 && this.func()}

                <Pagination
                  page={this.state.page}
                  totalPages={this.state.totalPages}
                  pageChange={this.pageChange}
                />
              </div>
            </div>
          </div>
        </MaterialTitlePanel>
      </Sidebar>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
