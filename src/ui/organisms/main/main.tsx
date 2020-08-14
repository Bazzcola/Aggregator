import React, { useState } from 'react';
import Head from 'next/head';
import { SearchCompany } from 'ui/molecules/searchCompany/searchCompany';
import { SearchEmployers } from 'ui/molecules/searchEmployers/searchEmployers';

export const Main = () => {
  const [buttonLoader, setButtonLoader] = useState<boolean>(true);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
        ></link>
      </Head>
      <div className="container">
        <div className="header">
          <div className="logotype">
            <a href="/">
              <img src="/Logo.png" alt="Logotype" />
            </a>
          </div>
        </div>
        <div className="content">
          {buttonLoader ? <SearchCompany /> : <SearchEmployers />}
        </div>
        <div className="footer">
          <div className="footer_wrapper">
            <ul className="footer_leftside">
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
            <div className="footer_rightside">
              <span>© 2020 informer.md</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
