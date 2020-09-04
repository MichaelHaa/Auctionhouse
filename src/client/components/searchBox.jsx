import React from 'react';

const SearchBox = ({searchfield, searchChange}) => {
    return (
        <div className="padding" >
            <input
                className='SF2'
                type='search'
                placeholder='search items'
                onChange={searchChange}
            />
            
        </div>
    )
};

export default SearchBox;