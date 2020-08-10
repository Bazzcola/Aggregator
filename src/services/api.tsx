import axios from 'axios';

export const searchCompanies = () => {
  return axios(
    'https://app.informer.md/api/public/search?page=1&per_page=100&company_name='
  ).then((response) => response.data);
};
export const totalCompanies = () => {
  return axios(
    'https://app.informer.md/api/public/search?page=1&per_page=100&company_name='
  ).then((response) => response.data.total_results);
};

export const showAllCompanies = () => {
  return axios(
    'https://app.informer.md/api/public/search?page=CURRENT_PAGE&company_name=INPUT_VALUE'
  ).then((response) => response.data.data);
};

export const profileCompany = () => {
  return axios(
    'https://app.informer.md/api/public/company?slug=COMPANY_SLUG'
  ).then((response) => response.data.data);
};
