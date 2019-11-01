import React from "react";

class PostDetails extends React.Component {
  renderList = props => {
    console.log(props, "props");

    return this.props.ID.map(post => {
      return (
        <div className="item" key={post.id}>
          <div className="content">
            <div className="description">
              <h2>Title: {post.title}</h2>
              <p>Body: {post.excerpt}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
  }
}

export default PostDetails;
