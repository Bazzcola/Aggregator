import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { totalCompanies, showSearch, listCompanies } from 'services/api';
import { List } from 'ui/atoms/List/List';
import { Pagination } from 'ui/atoms/Pagination/pagination';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);

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
        setLoading(true);
        const saveData = await listCompanies.request(searchList);
        setCompanyList(saveData.data);
        setLoading(false);
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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = companyList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            <>
              <List companyList={currentPosts} loading={loading} />
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={companyList.length}
                paginate={paginate}
                loading={loading}
              />
            </>
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
