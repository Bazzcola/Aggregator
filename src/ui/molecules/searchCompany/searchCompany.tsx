import React, { useState, useEffect } from 'react';
import { totalCompanies, showSearch } from '../../../services/api';

interface Company {
  data: [];
  pages: number;
  total_results: number;
}
export const SearchCompany = () => {
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [searchCompanies, setSearchCompanies] = useState<any>([]);
  const [getValueName, setGetValueName] = useState<string>('');
  const [test, setTest] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      const saveData = await totalCompanies();
      setAllCompanies(saveData);
    };
    getData();
  }, [allCompanies]);

  useEffect(() => {
    const getData = async () => {
      const saveData = await showSearch(getValueName);
      setSearchCompanies(saveData.data);
    };
    getData();
  }, [searchCompanies]);

  const borders = {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px'
  };

  const borderTop = {
    border: 'none'
  };

  const getValue = (event) => {
    event.preventDefault();
    setGetValueName(event.target.value);
  };
  useEffect(() => {
    if (searchCompanies.lenth === 0) {
      setTest(!test);
    }
  }, [getValueName]);
  return (
    <div className="search">
      <input
        autoComplete="off"
        id="search"
        type="text"
        className="searchInput"
        value={getValueName}
        onChange={getValue}
        style={getValueName ? borders : undefined}
        placeholder={
          allCompanies.total_results
            ? `Search from ${allCompanies.total_results} companies`
            : `Loading....`
        } //typescript????
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
      <ul className="list_company" style={getValueName ? undefined : borderTop}>
        {getValueName &&
          searchCompanies.map((item: { name: string; idno: string }) => (
            <li key={item.idno}>
              <button className="company_btn">
                {item.name} &bull; {item.idno}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
