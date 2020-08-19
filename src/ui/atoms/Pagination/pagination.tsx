import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
export const Pagination = ({ postsPerPage, totalPosts, paginate, loading }) => {
  const pageNumbers = [];
  const router = useRouter();

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  if (loading) {
    return (
      <div className="loader_list">
        <img src="/loader.gif" alt="" />
      </div>
    );
  }
  return (
    <div className="pagination_box">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page_item">
            <Link key={number} href="/pages/[slug]" as={`/pages/${number}`}>
              <a
                href="#"
                className={
                  router.query.slug == number ? 'page_link_active' : 'page_link'
                }
                onClick={() => paginate(number)}
              >
                {number}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
