import axios from 'axios';

const { CancelToken } = axios;

export const totalCompanies = {
  cancel: () => {},
  request: () =>
    axios
      .get(
        `https://app.informer.md/api/public/search?page=1&per_page=100&company_name=`,
        {
          cancelToken: new CancelToken((c) => (totalCompanies.cancel = c))
        }
      )
      .then((response) => response.data)
};

export const showSearch = {
  cancel: () => {},
  request: (name: string) =>
    axios
      .get(
        `https://app.informer.md/api/public/search?page=1&per_page=5&company_name=${name}`,
        {
          cancelToken: new CancelToken((c) => (showSearch.cancel = c))
        }
      )
      .then((response) => response.data)
};

export const listCompanies = {
  cancel: () => {},
  request: (name: string) =>
    axios
      .get(
        `https://app.informer.md/api/public/search?page=1&per_page=100&company_name=${name}`,
        {
          cancelToken: new CancelToken((c) => (listCompanies.cancel = c))
        }
      )
      .then((response) => response.data)
};

export const profileCompany = () => {
  return axios(
    'https://app.informer.md/api/public/company?slug=COMPANY_SLUG'
  ).then((response) => response.data.data);
};
