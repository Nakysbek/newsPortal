import React from 'react';

export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
};

export const getPagesCount = (totalPages) => {
    let result = [];
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1)
    }
    return result;
}
