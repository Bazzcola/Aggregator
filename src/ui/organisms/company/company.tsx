import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Img } from 'react-image';
import { useRouter } from 'next/router';
import { profileCompany, totalCompanies, showSearch } from 'services/api';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Loader } from 'ui/atoms/loader/loader';

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
    contact_info: {
      sites: string;
      emails: boolean;
      phones: boolean;
      address_de_facto: {
        additional: {
          lat: number;
          long: number;
        };
      };
    };
  };
  history: {
    company_url: string;
  };
}
interface context {
  query: {
    slug: string;
  };
}

export const Company = ({ propsData }) => {
  const [profile, setProfile] = useState<Profile>();
  const [allCompanies, setAllCompanies] = useState<number>();
  const [searchCompanies, setSearchCompanies] = useState<Company[]>([]);
  const [getValueName, setGetValueName] = useState<string>('');
  const router = useRouter();
  const [getRout, setGetRout] = useState<string | string[]>(router.query.slug);
  const [loader, setLoader] = useState<boolean>(false);

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
          setLoader(true);
          const getProfile = await profileCompany.request(getRout);
          setProfile(getProfile);
          setLoader(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getData();
    return () => {
      profileCompany.cancel();
    };
  }, [router.query]);

  const saveSlug = (slug: string) => {
    setGetRout(slug);
    setGetValueName('');
  };

  return (
    <>
      {profile ? (
        <>
          <Head>
            <link rel="shortcut icon" href="/pin.png" />
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
            {!loader ? (
              <>
                <div className="company_head">
                  <div className="head_leftside">
                    <div className="company_image">
                      <Img
                        src={[
                          profile.history[0].company_url
                            ? `https://account.globaldatabase.com/logo/${profile.history[0].company_url.substring(
                                7,
                                profile.history[0].company_url.length
                              )}/`
                            : 'https://sciences.ucf.edu/psychology/wp-content/uploads/sites/63/2019/09/No-Image-Available.png',
                          'https://sciences.ucf.edu/psychology/wp-content/uploads/sites/63/2019/09/No-Image-Available.png'
                        ]}
                        loader={Loader()}
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
                      {profile.general_data.branch
                        ? profile.general_data.branch.title
                        : 'None...'}
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
                      <span>
                        {profile.general_data.size.name
                          ? profile.general_data.size.name
                          : 'None...'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="company_contacts">
                  <div className="company_contacts_leftside">
                    <h1>Contact information</h1>
                    <div className="information_dates">
                      <div className="information_dates_leftside">
                        <p>EMAIL:</p>
                        <div
                          className={
                            profile.general_data.contact_info.emails[0]
                              ? 'email_true'
                              : 'email_false'
                          }
                        >
                          <i className="far fa-envelope"></i> <span>Email</span>
                        </div>
                        <p className="website">WEBSITE:</p>

                        <div
                          className={
                            profile.general_data.contact_info.sites[0]
                              ? 'website_true'
                              : 'website_false'
                          }
                        >
                          <i className="fas fa-globe"></i>{' '}
                          <span>
                            {profile.general_data.contact_info.sites[0]
                              ? profile.general_data.contact_info.sites[0]
                              : 'No website...'}
                          </span>
                        </div>
                      </div>
                      <div className="information_dates_rightside">
                        <p>PHONE/CELL PHONE/FAX:</p>
                        <div
                          className={
                            profile.general_data.contact_info.phones[0]
                              ? 'phone_true'
                              : 'phone_false'
                          }
                        >
                          <i className="fas fa-phone"></i> <span>Phone</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {profile.general_data.contact_info.address_de_facto
                    .additional &&
                  profile.general_data.contact_info.address_de_facto.additional
                    .lat &&
                  profile.general_data.contact_info.address_de_facto.additional
                    .long ? (
                    <LoadScript googleMapsApiKey={process.env.MAP_KEY}>
                      {profile.general_data.contact_info.address_de_facto
                        .additional &&
                      profile.general_data.contact_info.address_de_facto
                        .additional.lat &&
                      profile.general_data.contact_info.address_de_facto
                        .additional.long ? (
                        <GoogleMap
                          mapContainerClassName="company_contacts_rightside"
                          center={{
                            lat:
                              profile.general_data.contact_info.address_de_facto
                                .additional.lat,
                            lng:
                              profile.general_data.contact_info.address_de_facto
                                .additional.long
                          }}
                          zoom={16}
                        >
                          <Marker
                            position={{
                              lat:
                                profile.general_data.contact_info
                                  .address_de_facto.additional.lat,
                              lng:
                                profile.general_data.contact_info
                                  .address_de_facto.additional.long
                            }}
                            label={profile.name}
                          ></Marker>
                        </GoogleMap>
                      ) : (
                        <div className="company_contacts_rightside_none">
                          <h1>No Location...</h1>
                          <img src="/geo.png" alt="" />
                        </div>
                      )}
                    </LoadScript>
                  ) : (
                    <div className="company_contacts_rightside_none">
                      <h1>No Location...</h1>
                      <img src="/geo.png" alt="" />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <img src="/loader.gif" className="profile_main_loader" alt="" />
            )}
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
        <div className="loader_list">
          <img src="/loader.gif" alt="" />
        </div>
      )}
    </>
  );
};

Company.getInitialProps = async (
  ctx: context
): Promise<{
  props: {
    propsData: Profile[];
  };
}> => {
  const x = ctx.query.slug;
  const data = await profileCompany.request(x);
  const propsData = data;

  return {
    props: {
      propsData
    }
  };
};
