import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight as regularRightIcon,
  faArrowAltCircleLeft as regularLeftIcon,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "gatsby";
import _ from "lodash";

const PaginateButtons = ({ data }: { data: PaginateData }) => {
  const {
    isFirst,
    isLast,
    prevPage,
    numPages,
    currentPage,
    nextPage,
    isBlog,
    categoryName,
  } = data;

  const numButtons = 5;
  var startPage =
    currentPage < numButtons ? 1 : currentPage - (numButtons - 1) / 2;
  const endPage =
    startPage + (numButtons - 1) > numPages
      ? numPages
      : startPage + (numButtons - 1);
  if (startPage + (numButtons - 1) > numPages) {
    if (numPages - (numButtons - 1) > 0) {
      startPage = numPages - (numButtons - 1);
    }
  }

  const numArr = _.range(startPage, endPage + 1);

  return (
    <div className="flex items-center">
      {!isFirst && (
        <Link to={prevPage} rel="previous">
          <FontAwesomeIcon className="mr-4" icon={regularLeftIcon} size="2x" />
        </Link>
      )}
      <ul className="flex items-center">
        {console.log(numArr, startPage, endPage, currentPage)}
        {numArr.map((num, i) => {
          const to = isBlog
            ? `/blog/${num === 1 ? "" : num}`
            : `/${categoryName}/${num === 1 ? "" : num}`;

          return (
            <>
              {currentPage === num ? (
                <>
                  {num === numArr[0] ? (
                    <>{num !== 1 ? <span>. . .</span> : ""}</>
                  ) : (
                    ""
                  )}
                  <Link
                    style={{
                      width: "30px",
                      height: "30px",
                      lineHeight: "30px",
                    }}
                    key={`pagination-number${num}`}
                    to={to}
                    className="flex justify-center items-center mx-1 border-2 border-primary p-0 rounded-full"
                  >
                    <li>{num}</li>
                  </Link>
                  {num === numArr[numButtons - 1] ? (
                    <>{num !== numPages ? <span>. . .</span> : ""}</>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  {num === numArr[0] ? (
                    <>{num !== 1 ? <span>. . .</span> : ""}</>
                  ) : (
                    ""
                  )}
                  <Link
                    key={`pagination-number${num}`}
                    style={{ width: "25px", height: "25px" }}
                    to={to}
                    className="mx-1 flex justify-center"
                  >
                    <li>{num}</li>
                  </Link>
                  {num === numArr[numButtons - 1] ? (
                    <>{num !== numPages ? <span>. . .</span> : ""}</>
                  ) : (
                    ""
                  )}
                </>
              )}
            </>
          );
        })}
      </ul>
      {!isLast && (
        <Link to={nextPage}>
          <FontAwesomeIcon icon={regularRightIcon} className="ml-4" size="2x" />
        </Link>
      )}
    </div>
  );
};

export interface PaginateData {
  isFirst: boolean;
  isLast: boolean;
  prevPage: string;
  numPages: number;
  currentPage: number;
  nextPage: string;
  isBlog: boolean;
  categoryName?: string;
}

export default PaginateButtons;
