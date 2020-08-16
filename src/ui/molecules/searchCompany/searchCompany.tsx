import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { totalCompanies, showSearch, listCompanies } from 'services/api';

interface Company {
  name: string;
  idno: string;
  pages: number;
  creation_year: number;
  employees: string;
  turnover: number;
  industry: string;
  location: string;
  mobile: boolean | null;
  phone: boolean | null;
  email: boolean | null;
  website: string;
  slug: string;
}
interface Result {
  total_results: number;
}

export const SearchCompany = () => {
  const [allCompanies, setAllCompanies] = useState<Result>();
  const [searchCompanies, setSearchCompanies] = useState<Company[]>([]);
  const [getValueName, setGetValueName] = useState<string>('');
  const [searchList, setSearchList] = useState<string>('');
  const [companyList, setCompanyList] = useState<Company[]>([]);

  const years = (x: number) => {
    let today = new Date();
    let dateTime = dayjs(today).format('YYYY');
    let result = parseFloat(dateTime) - x;
    return result;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const saveData = await totalCompanies.request();
        setAllCompanies(saveData.total_results);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    return () => {
      totalCompanies.cancel();
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const saveData = await showSearch.request(getValueName);
        setSearchCompanies(saveData.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();

    return () => {
      showSearch.cancel();
    };
  }, [getValueName]);

  useEffect(() => {
    const getData = async () => {
      try {
        const saveData = await listCompanies.request(searchList);
        setCompanyList(saveData.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();

    return () => {
      listCompanies.cancel();
    };
  }, [getValueName]);

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
  };
  const reset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSearchList('');
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
              allCompanies
                ? `Search from ${allCompanies} companies`
                : `Loading....`
            }
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
              <Link
                key={item.idno}
                href="/company/[slug]"
                as={`/company/${item.slug}`}
              >
                <li key={item.idno}>
                  <button className="company_btn">
                    {item.name} &bull; {item.idno}
                  </button>
                </li>
              </Link>
            ))}
        </ul>
      </div>
      {searchList ? (
        <div className="search_list">
          <div className="search_list_data" onClick={reset}>
            <i className="fas fa-filter"></i> {searchList}{' '}
            <i className="fas fa-times"></i>
          </div>
          <div className="search_list_results">
            <i className="fas fa-suitcase-rolling"></i> {companyList.length} of
            results
          </div>
          <div
            className={
              companyList.length === 0 ? 'no_result_false' : 'no_result_true'
            }
          >
            <i className="fas fa-folder-open"></i>
          </div>
          {searchList && companyList ? (
            companyList.map((item: Company) => (
              <div className="search_list__item" key={item.idno}>
                <div className="company_logo">
                  <img
                    src={
                      item.website
                        ? `https://account.globaldatabase.com/logo/${item.website.substring(
                            7,
                            item.website.length
                          )}/`
                        : '/no_img.png'
                    }
                    alt="No_Image"
                  />
                </div>
                <div className="company_title">
                  <Link
                    key={item.idno}
                    href="/company/[slug]"
                    as={`/company/${item.slug}`}
                  >
                    <p className="redirect_page">{item.name}</p>
                  </Link>
                  {item.location ? (
                    <p className="company_location">
                      <img src="/pin.png" alt="geo_point" />
                      {item.location}
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
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
                    <li className={item.mobile ? 'phone_true' : 'phone_false'}>
                      <i className="fas fa-mobile-alt i_first"></i>Phone mobile
                    </li>
                    <li className={item.phone ? 'tel_true' : 'tel_false'}>
                      <i className="fas fa-phone"></i>Phone
                    </li>
                    <li className={item.email ? 'email_true' : 'email_false'}>
                      <i className="far fa-envelope"></i>Email
                    </li>
                    <li
                      className={
                        item.website ? 'website_true' : 'website_false'
                      }
                    >
                      <i className="fas fa-globe"></i>Website
                    </li>
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <div className="loader_list">
              <img src="/loader.gif" alt="" />
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
