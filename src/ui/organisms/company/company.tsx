import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { profileCompany, totalCompanies, showSearch } from 'services/api';

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

interface Profile {
  name: string;
  status: {
    keyword: string;
  };
  general_data: {
    branch: {
      title: string;
    };
    idno: string;
    creation_year: number;
    size: {
      name: string;
    };
  };
  history: {
    company_url: string;
  };
}

export const Company = () => {
  const [profile, setProfile] = useState<Profile>();
  const [allCompanies, setAllCompanies] = useState<number>();
  const [searchCompanies, setSearchCompanies] = useState<Company[]>([]);
  const [getValueName, setGetValueName] = useState<string>('');
  const router = useRouter();
  const [getRout, setGetRout] = useState<string | string[]>(router.query.slug);

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

  const borders = () => {
    if (searchCompanies.length > 0 && getValueName) {
      return 'searchInputBorder_profile';
    } else {
      return 'searchInput_profile';
    }
  };

  const getValue = (event: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    event.preventDefault();
    setGetValueName(event.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      if (router.query.slug) {
        try {
          const getProfile = await profileCompany.request(getRout);
          setProfile(getProfile);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getData();
    return () => {
      profileCompany.cancel();
    };
  }, [getRout]);

  const saveSlug = (slug: string) => {
    setGetRout(slug);
    setGetValueName('');
  };

  console.log(profile);
  console.log(getRout);

  return (
    <>
      {profile ? (
        <>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
            ></link>
          </Head>
          <div className="container">
            <div className="header_profile">
              <div className="logotype_profile">
                <a href="/">
                  <img src="/Logo.png" alt="Logotype" />
                </a>
              </div>
              <div className="search_profile">
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
                <ul className="list_company_profile">
                  {getValueName &&
                    searchCompanies.map((item: Company) => (
                      <Link
                        key={item.idno}
                        href="/company/[slug]"
                        as={`/company/${item.slug}`}
                      >
                        <li key={item.idno}>
                          <button
                            className="company_btn"
                            onClick={() => saveSlug(item.slug)}
                          >
                            {item.name} &bull; {item.idno}
                          </button>
                        </li>
                      </Link>
                    ))}
                </ul>
              </div>
            </div>
            <div className="company_head">
              <div className="head_leftside">
                <div className="company_image">
                  <img
                    src={
                      profile.history[0].company_url
                        ? `https://account.globaldatabase.com/logo/${profile.history[0].company_url.substring(
                            7,
                            profile.history[0].company_url.length
                          )}/`
                        : '/no_img.png'
                    }
                    alt=""
                  />
                </div>
                <div className="comapny_desc">
                  <div className="profile_name">
                    <p>{profile.name}</p>
                  </div>

                  <div className="company_status">
                    <p>{profile.status.keyword}</p>
                  </div>
                </div>
                <p className="company_description">
                  {profile.general_data.branch.title}
                </p>
              </div>

              <ul className="low_btns">
                <li>General dates</li>
                <li>Personal</li>
                <li>Subdivisions</li>
                <li>Economic Data</li>
                <li>Publications</li>
                <li>Legal data</li>
              </ul>
            </div>
            <div className="company_dates">
              <div className="company_dates_wrapper">
                <div className="company_dates_leftside">
                  <p>IDNO</p>
                  <span>{profile.general_data.idno}</span>
                </div>
                <div className="company_dates_midle">
                  <p>Registration year</p>
                  <span>{profile.general_data.creation_year}</span>
                </div>
                <div className="company_dates_right">
                  <p>Staff</p>
                  <span>{profile.general_data.size.name}</span>
                </div>
              </div>
            </div>
            <div className="company_contacts">
              <div className="company_contacts_leftside">
                <h1>Contact information</h1>
                <div className="information_dates">
                  <div className="information_dates_leftside">
                    <p>EMAIL:</p>
                    <p>WEBSITE:</p>
                  </div>
                  <div className="information_dates_rightside">
                    <p>PHONE/CELL PHONE/FAX:</p>
                  </div>
                </div>
              </div>
              <div className="company_contacts_rightside"></div>
            </div>
            <div className="footer_profile">
              <div className="footer_wrapper_profile">
                <ul className="footer_leftside_profile">
                  <li>
                    <a href="#">English</a>
                  </li>
                  <li>
                    <a href="#">Login</a>
                  </li>
                  <li>
                    <a href="#">View All</a>
                  </li>
                  <li>
                    <a href="#">Help & Support</a>
                  </li>
                </ul>
                <div className="footer_rightside_profile">
                  <span>© 2020 informer.md</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>loader</h1>
      )}
    </>
  );
};
