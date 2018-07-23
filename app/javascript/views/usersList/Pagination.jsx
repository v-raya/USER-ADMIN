import React from 'react';
import classnames from 'classnames';
import PaginationRT from 'react-table/es/pagination';
import { Button as ButtonRWD } from 'react-wood-duck';

const previousButton = props => (
  <ButtonRWD
    btnClassName="default"
    btnName={<span className="glyphicon glyphicon-chevron-left" />}
  />
);

const nextButton = props => (
  <ButtonRWD
    btnClassName="default"
    btnName={<span className="glyphicon glyphicon-chevron-right" />}
  />
);

class Pagination extends PaginationRT {
  render() {
    const {
      // Computed
      pages,
      // Props
      page,
      showPageSizeOptions,
      pageSizeOptions,
      pageSize,
      showPageJump,
      canPrevious,
      canNext,
      onPageSizeChange,
      className,
      PreviousComponent = previousButton,
      NextComponent = nextButton,
    } = this.props;

    return (
      <div
        className={classnames(className, '-pagination')}
        style={this.props.style}
      >
        {showPageSizeOptions && (
          <span className="select-wrap -pageSizeOptions">
            <select
              onChange={e => onPageSizeChange(Number(e.target.value))}
              value={pageSize}
            >
              {pageSizeOptions.map((option, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <option key={i} value={option}>
                  {`${option} ${this.props.rowsText}`}
                </option>
              ))}
            </select>
          </span>
        )}
        <div className="-previous">
          <PreviousComponent
            onClick={() => {
              if (!canPrevious) return;
              this.changePage(page - 1);
            }}
            disabled={!canPrevious}
          >
            {this.props.previousText}
          </PreviousComponent>
        </div>
        <div className="-center">
          <span className="-pageInfo">
            {this.props.pageText}{' '}
            {showPageJump ? (
              <div className="-pageJump">
                <input
                  type={this.state.page === '' ? 'text' : 'number'}
                  onChange={e => {
                    const val = e.target.value;
                    const page = val - 1;
                    if (val === '') {
                      return this.setState({ page: val });
                    }
                    this.setState({ page: this.getSafePage(page) });
                  }}
                  value={this.state.page === '' ? '' : this.state.page + 1}
                  onBlur={this.applyPage}
                  onKeyPress={e => {
                    if (e.which === 13 || e.keyCode === 13) {
                      this.applyPage();
                    }
                  }}
                />
              </div>
            ) : (
              <span className="-currentPage">{page + 1}</span>
            )}{' '}
            {this.props.ofText}{' '}
            <span className="-totalPages">{pages || 1}</span>
          </span>
        </div>
        <div className="-next">
          <NextComponent
            onClick={() => {
              if (!canNext) return;
              this.changePage(page + 1);
            }}
            disabled={!canNext}
          >
            {this.props.nextText}
          </NextComponent>
        </div>
      </div>
    );
  }
}

export default Pagination;
