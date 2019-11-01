import React from "react";

import "./styles.css";

import PropTypes from "prop-types";
import MaterialTitlePanel from "./material_title_panel";

const styles = {
  sidebar: {
    width: 256,
    height: "100%"
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px",
    color: "#757575",
    textDecoration: "none"
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#757575"
  },
  content: {
    padding: "16px",
    height: "100vh",
    backgroundColor: "white"
  }
};

class Categories extends React.Component {
  state = {
    data: [],
    page: 1,
    totalPages: null,
    sizeOfPost: 25,
    sidebarOpen: false
  };

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  fetchPost() {
    const URL = `https://public-api.wordpress.com/rest/v1.1/sites/truecaller.blog/categories`;
    fetch(URL)
      .then(function(response) {
        return response.json();
      })
      .then(x => {
        this.setState({
          data: x.categories
        });
      });
  }

  componentDidMount() {
    this.fetchPost();
  }

  render() {
    const style = this.props.style
      ? { ...styles.sidebar, ...this.props.style }
      : styles.sidebar;

    return (
      <MaterialTitlePanel title="Menu" style={style}>
        <div style={styles.content}>
          <div style={styles.divider} />
          {this.state.data.map((e, i) => (
            <a key={i} href="#" style={styles.sidebarLink}>
              {e.name}
            </a>
          ))}
        </div>
      </MaterialTitlePanel>
    );
  }
}
Categories.propTypes = {
  style: PropTypes.object
};

export default Categories;
