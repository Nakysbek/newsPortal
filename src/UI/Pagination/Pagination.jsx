import React from 'react';
import {getPagesCount} from "../../Utils/Pages";

export const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesCount(totalPages)

    return (
        <div className="page__wrapper">
            {pagesArray.map(p =>
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? "page page_current" : "page"
                    }>
                        {p}
                    </span>
            )}
        </div>
    );
};

