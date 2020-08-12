import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  totalCompanies,
  showSearch,
  listCompanies
} from '../../../services/api';

interface Company {
  name: string;
  idno: string;
  pages: number;
  creation_year: number;
  employees: string;
  turnover: number;
  industry: string;
}

export const SearchCompany = () => {
  const [allCompanies, setAllCompanies] = useState<any>([]);
  const [searchCompanies, setSearchCompanies] = useState<Company[]>([]);
  const [getValueName, setGetValueName] = useState<string>('');
  const [searchList, setSearchList] = useState<string>('');
  const [companyList, setCompanyList] = useState<Company[]>([]);

  const years = (x) => {
    let today = new Date();
    let dateTime = dayjs(today).format('YYYY');
    let result = parseFloat(dateTime) - x;
    return result;
  };
  // console.log(years());
  useEffect(() => {
    const getData = async () => {
      const saveData = await totalCompanies();
      setAllCompanies(saveData);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const saveData = await showSearch(getValueName);
      setSearchCompanies(saveData.data);
    };
    getData();
    //cancelToken
  }, [searchCompanies]);

  useEffect(() => {
    const getData = async () => {
      const saveData = await listCompanies(searchList);
      setCompanyList(saveData.data);
    };
    getData();
    //cancelToken
  }, [searchList]);

  const getValue = (event: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    event.preventDefault();
    setGetValueName(event.target.value);
  };

  const borders = () => {
    if (searchCompanies.length > 0 && getValueName) {
      return 'searchInputBorder';
    } else {
      return 'searchInput';
    }
  };

  const searchValue = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSearchList(getValueName);
    setGetValueName('');
    console.log(companyList);
  };
  return (
    <>
      <div className="search">
        <form onSubmit={searchValue}>
          <input
            autoComplete="off"
            id="search"
            type="text"
            className={borders()}
            value={getValueName}
            onChange={getValue}
            placeholder={
              allCompanies.total_results
                ? `Search from ${allCompanies.total_results} companies`
                : `Loading....`
            } //typescript????
          />
        </form>
        <div className="search_review">
          <div className="search_title">
            <p>Search in</p>
          </div>
          <div className="buttons">
            <div className="button">Companies</div>
            <div className="button">Persons</div>
          </div>
        </div>
        <ul className="list_company">
          {getValueName &&
            searchCompanies.map((item: Company) => (
              <li key={item.idno}>
                <button className="company_btn">
                  {item.name} &bull; {item.idno}
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="search_list">
        {searchList &&
          companyList.map((item: Company) => (
            <div className="search_list__item" key={item.idno}>
              <div className="company_title">{item.name}</div>
              <div className="list_item__first_column">
                <p>
                  IDNO: <span className="data_text">{item.idno}</span>
                </p>
                <p>
                  Status: <span className="company_activ">ACTIV</span>
                </p>
                <p>
                  Date of establishment:{' '}
                  <span className="data_text">{item.creation_year}</span>
                </p>
                <p>
                  Vărsta:{' '}
                  <span className="data_text">
                    {years(item.creation_year)} years
                  </span>
                </p>
              </div>
              <div className="list_item__second_column">
                <p>
                  Nr. by the employees:{' '}
                  <span className="data_text">
                    {item.employees ? item.employees : '---'}
                  </span>
                </p>
                <p>
                  Turn over:{' '}
                  <span className="data_text">
                    {item.turnover ? item.turnover : '---'} MDL
                  </span>
                </p>
                <p>
                  Industry:{' '}
                  <span className="data_text">
                    {item.industry ? item.industry : '---'}
                  </span>
                </p>
              </div>
              <div className="list_item__third_column">
                <p>Contacts:</p>
                <ul>
                  <li>Phone mobile</li>
                  <li>Phone</li>
                  <li>Email</li>
                  <li>Website</li>
                </ul>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
