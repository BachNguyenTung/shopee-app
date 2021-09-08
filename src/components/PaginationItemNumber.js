import React, { useEffect } from "react";
import { ProductContext } from "../context";
import classNames from "classnames";
import { useContext } from "react";

export default function PaginationItemNumber() {
  const context = useContext(ProductContext);
  let {
    pageIndex,
    setPageIndex,
    pageTotal,
   } = context;

  let jsxArray = [];
  for (let index = 3; index <= pageTotal; index++) {
    //Hiện 5 trang đầu
    if (pageIndex <= 5 && index <= 5) {
      jsxArray.push(
        <li
          key={index}
          onClick={() => setPageIndex(index)}
          className={classNames("pagination-number", {
            "pagination-number--active": pageIndex === index,
          })}
        >
          <div className="pagination-item__link">{index}</div>
        </li>
      );
    }

    //Hiện 5 trang giữa
    else if (
      pageIndex >= 5 &&
      index <= pageIndex + 2 &&
      index >= pageIndex - 2
    ) {
      jsxArray.push(
        <li
          key={index}
          onClick={() => setPageIndex(index)}
          className={classNames("pagination-number", {
            "pagination-number--active": pageIndex === index,
          })}
        >
          <div className="pagination-item__link">{index}</div>
        </li>
      );
    }

    //Hiện 5 trang cuối
    else if (pageIndex >= pageTotal - 2 && index > pageTotal - 5) {
      jsxArray.push(
        <li
          key={index}
          onClick={() => setPageIndex(index)}
          className={classNames("pagination-number", {
            "pagination-number--active": pageIndex === index,
          })}
        >
          <div className="pagination-item__link">{index}</div>
        </li>
      );
    }
  }

  return (
    <>
      <li
        onClick={() => setPageIndex(1)}
        className={classNames("pagination-number", {
          "pagination-number--active": pageIndex === 1,
        })}
      >
        <div className="pagination-item__link">1</div>
      </li>
      <li
        onClick={() => setPageIndex(2)}
        className={classNames("pagination-number", {
          "pagination-number--active": pageIndex === 2,
        })}
      >
        <div className="pagination-item__link">2</div>
      </li>
      {/* Hiện ... khi quá 5 trnag đầu */}
      {pageIndex >= 6 && (
        <li className="pagination-item pagination-item--non-click">
          <div className="pagination-item__link">...</div>
        </li>
      )}
      {jsxArray}
      {/* Hiện ... khi quá 5 trang cuối */}
      {pageTotal > 5 && pageIndex <= pageTotal - 3 && (
        <li className="pagination-item pagination-item--non-click">
          <div className="pageTotalpagination-item__link">...</div>
        </li>
      )}
    </>
  );
}
