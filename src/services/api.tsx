import axios from 'axios';
const { CancelToken } = axios;
export const totalCompanies = () => {
  return axios(
    `https://app.informer.md/api/public/search?page=1&per_page=100&company_name=`
  ).then((response) => response.data);
};
export const showSearch = (name: string) => {
  return axios(
    `https://app.informer.md/api/public/search?page=1&per_page=5&company_name=${name}`
  ).then((response) => response.data);
};

export const listCompanies = (name: string) => {
  return axios(
    `https://app.informer.md/api/public/search?page=1&per_page=100&company_name=${name}`
  ).then((response) => response.data);
};

export const profileCompany = () => {
  return axios(
    'https://app.informer.md/api/public/company?slug=COMPANY_SLUG'
  ).then((response) => response.data.data);
};
