import React from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Loader } from 'ui/atoms/loader/loader';
import { Company } from 'ui/molecules/searchCompany/searchCompany';

export const List = ({ companyList, loading }) => {
  const years = (x: number) => {
    let today = new Date();
    let dateTime = dayjs(today).format('YYYY');
    let result = parseFloat(dateTime) - x;
    return result;
  };
  if (loading) {
    return <></>;
  }

  return (
    <>
      {companyList.map((item: Company) => (
        <div className="search_list__item" key={item.idno}>
          <div className="company_logo">
            {companyList ? (
              <img
                src={
                  item.website
                    ? `https://account.globaldatabase.com/logo/${item.website.substring(
                        7,
                        item.website.length
                      )}/`
                    : 'https://sciences.ucf.edu/psychology/wp-content/uploads/sites/63/2019/09/No-Image-Available.png'
                }
                alt=""
              />
            ) : (
              <Loader />
            )}
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
              <li className={item.website ? 'website_true' : 'website_false'}>
                <i className="fas fa-globe"></i>Website
              </li>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};
