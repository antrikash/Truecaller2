import React from "react";

class Pagination extends React.Component {
  handlePrev = () => {
    this.props.pageChange(this.props.page - 1);
  };
  handleNext = () => {
    this.props.pageChange(this.props.page + 1);
  };

  mapFunc = () => {
    const totalPage = this.props.totalPages;
    const arr = [];

    for (let i = 1; i <= totalPage; i++) {
      arr.push(
        <li class="page-item" key={i}>
          <span
            class="page-link"
            href="#"
            onClick={() => this.props.pageChange(i)}
          >
            {i}
          </span>
        </li>
      );
    }
    return arr;
  };
  render() {
    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <span onClick={this.handlePrev} className="page-link">
                Previous
              </span>
            </li>
            {this.mapFunc()}

            <li class="page-item">
              <span onClick={this.handleNext} className="page-link">
                Next
              </span>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default Pagination;
