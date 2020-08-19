import React from 'react';
import Head from 'next/head';
import { SearchCompany } from 'ui/molecules/searchCompany/searchCompany';
import { totalCompanies } from 'services/api';

export interface Company {
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

interface Promise {
  props: {
    propsData: Company[];
  };
}

export const Main = ({ propsData }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/pin.png" />
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
          <SearchCompany />
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

Main.getInitialProps = async (): Promise => {
  const data = await totalCompanies.request();
  const propsData = data.data;

  return {
    props: {
      propsData
    }
  };
};
