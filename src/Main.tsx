import { SearchCompany } from './ui/molecules/searchCompany';
export const Main = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="logotype">
          <img src="/Logo.png" alt="Logotype" />
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
  );
};
