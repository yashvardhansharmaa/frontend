import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight as regularRightIcon,
  faArrowAltCircleLeft as regularLeftIcon,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "gatsby";

/*
{
  isFirst,
  isLast,
  prevPage,
  numPages,
  currentPage,
  nextPage,
}
*/
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
  return (
    <div className="flex items-center">
      {!isFirst && (
        <Link to={prevPage} rel="previous">
          <FontAwesomeIcon className="mr-4" icon={regularLeftIcon} size="2x" />
        </Link>
      )}
      <ul className="flex items-center">
        {Array.from({ length: numPages }, (_, i) => {
          const to = isBlog
            ? `/blog/${i === 0 ? "" : i + 1}`
            : `/${categoryName}/${i === 0 ? "" : i + 1}`;

          return (
            <>
              {currentPage === i + 1 ? (
                <Link
                  style={{
                    width: "30px",
                    height: "30px",
                    lineHeight: "30px",
                  }}
                  key={`pagination-number${i + 1}`}
                  to={to}
                  className="flex justify-center items-center mx-1 border-2 border-primary p-0 rounded-full"
                >
                  <li>{i + 1}</li>
                </Link>
              ) : (
                <Link
                  key={`pagination-number${i + 1}`}
                  style={{ width: "25px", height: "25px" }}
                  to={to}
                  className="mx-1 flex justify-center"
                >
                  <li>{i + 1}</li>
                </Link>
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
