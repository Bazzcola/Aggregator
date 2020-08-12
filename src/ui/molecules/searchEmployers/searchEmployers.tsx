import React, { useState, useEffect } from 'react';
import { showSearch } from '../../../services/api';

export const SearchEmployers = () => {
  const [allPeople, setAllPeople] = useState<string>('');
  const [buttonLoader, setButtonLoader] = useState<boolean>(true);

  // useEffect(() => {
  //   const getData = async () => {
  //     const saveData = await showSearch();
  //     setAllPeople(saveData);
  //     //   console.log(allPeople);
  //   };
  //   getData();
  // }, [allPeople]);

  return (
    <div className="search">
      <input
        type="text"
        className="searchInput2"
        placeholder={`Search from ----- companies`}
      />
      <div className="search_review">
        <div className="search_title">
          <p>Search in</p>
        </div>
        <div className="buttons">
          <div className="button">Companies</div>
          <div className="button">Persons</div>
        </div>
      </div>
    </div>
  );
};
