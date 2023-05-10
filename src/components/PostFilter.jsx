import React from 'react';
import {MyInput} from "../UI/Input/MyInput";
import {MySelect} from "../UI/Select/MySelect";

export const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder="Search"/>
            <MySelect
                value={filter.sort}
                onChange={selectSort => setFilter({...filter, sort: selectSort})}
                defaultValue="Sorting by"
                options={[
                    {value: 'title', body: 'By title'},
                    {value: 'body', body: 'By description'},
                ]}
            />
        </div>
    );
};

