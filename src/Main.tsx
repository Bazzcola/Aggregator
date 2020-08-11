import React, { useState } from 'react';
import { SearchCompany } from './ui/molecules/searchCompany/searchCompany';
import { SearchEmployers } from './ui/molecules/searchEmployers/searchEmployers';

export const Main = () => {
  const [buttonLoader, setButtonLoader] = useState<boolean>(true);

  return (
    <div className="container">
      <div className="header">
        <div className="logotype">
          <img src="/Logo.png" alt="Logotype" />
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
  );
};
