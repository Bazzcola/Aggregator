import React from 'react';
import Head from 'next/head';
import { SearchCompany } from 'ui/molecules/searchCompany/searchCompany';

export const Main = () => {
  const trackScroll = () => {
    try {
      const goTopBtn = document.querySelector('.back_to_top');
      const backToTop = () => {
        if (window.pageYOffset > 0) {
          window.scrollBy(0, -80);
          setTimeout(backToTop, 0);
        }
      };
      window.addEventListener('scroll', trackScroll);
      goTopBtn.addEventListener('click', backToTop);
    } catch (error) {
      console.log(error);
    }
  };

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
        <div className="back_to_top" onClick={trackScroll}>
          <i className="fas fa-arrow-up"></i>
        </div>
      </div>
    </>
  );
};
