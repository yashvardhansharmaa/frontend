import React from "react";

const Mail = ({ link }: { link?: string }) => {
  return (
    <a href={`mailto:${link}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22px"
        height="18px"
        viewBox="0 0 22 18"
        version="1.1"
        fill="currentColor"
        className="mr-1"
      >
        <title>mail</title>
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <g
            id="Artboard"
            transform="translate(-1333.000000, -1753.000000)"
            stroke="currentColor"
            stroke-width="2"
          >
            <g id="mail" transform="translate(1334.000000, 1754.000000)">
              <path
                d="M2 0h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0z"
                id="Shape"
              />
              <path id="Shape" d="M20 2L10 9 0 2" />
            </g>
          </g>
        </g>
      </svg>
    </a>
  );
};

export default Mail;
