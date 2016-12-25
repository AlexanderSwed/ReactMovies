import React from "react";

const Pagination = (props) => {
    let l = props.page - 2, r = props.page + 2;
    if (props.total_pages < 6) {
        l = 1; r = props.total_pages;
    }
    else if ( props.page <= 2 ) {
        l = 1; r = 5;
    }
    else if (props.page === props.total_pages) {
        l = props.page - 4; r = props.total_pages;
    }
    else if ( props.page + 2 > props.total_pages ) {
        l -= props.total_pages - props.page;
        r = props.total_pages;
    }
    return (
        <ul className="pagination">
            { props.toPrev ? <li className={props.page === 1 ? " disabled" : ""}>
                                <button type="button" onClick={ props.toPrev } ><i className="material-icons">chevron_left</i></button>
                            </li> : <li className="disabled"></li>}
            { props.paginationLinks.slice(l - 1, r).map( (el, i) => <li key={i} className={ l + i === props.page ? "active" : ""}>{el}</li>) }
            { props.toNext ? <li className={props.page === props.total_pages ? " disabled" : ""}>
                                <button type="button" onClick={ props.toNext }><i className="material-icons">chevron_right</i></button>
                            </li> : <li className="disabled"></li>}
        </ul>
    );
}

export default Pagination;

