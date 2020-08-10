import React, { useState, useEffect } from 'react';
import { searchCompanies, totalCompanies } from '../../services/api';

export const SearchCompany = () => {
  const [allCompanies, setAllCompanies] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      const saveData = await totalCompanies();
      setAllCompanies(saveData);
    };
    getData();
  }, [allCompanies]);

  return (
    <div className="search">
      <input
        type="text"
        className="searchInput"
        placeholder={`Search from ${allCompanies} companies`}
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
