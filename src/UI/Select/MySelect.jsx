import React from 'react';

export const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled={true} value="">{defaultValue}</option>
            {options.map(option =>
                <option value={option.value} key={option.value}>
                    {option.body}
                </option>
            )}
        </select>
    );
};

