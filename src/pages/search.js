import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import SearchBlogCard from "../components/SearchBlogCard";
import PostListContainer from "../components/PostListContainer";
import Container from "../components/Container";
import LoadingSpinner from "../assets/Rolling-1s-200px-t.svg";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [option, setOption] = useState({
    value: "",
    label: "",
  });

  useEffect(() => {
    setOption({ value: "title", label: "Title" });
  }, []);

  // Options for select component
  const options = [
    { value: "title", label: "Title" },
    { value: "author.name", label: "Author" },
    { value: "tags.name", label: "Tags" },
    { value: "category.name", label: "Category" },
    { value: "body", label: "Body" },
  ];

  // Styling options for select component
  const colorStyles = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: "var(--bg)",
      color: "var(--text)",
      border:
        state.isFocused || state.menuIsOpen
          ? "2px solid var(--ibg)"
          : "2px solid var(--p50)",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "var(--text)",
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "var(--bg)",
    }),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    setIsLoading(true);
    Axios.get(
      `${process.env.GATSBY_STRAPI_BASEURL}/blogs?${option.value}_contains=${searchQuery}`
    ).then((res) => {
      if (res.status !== 200) {
        return Error(res.statusText);
      }
      console.log(res.data);
      setSearchData(res.data);
      setIsLoading(false);
      setIsLoaded(true);
    });
  };

  const handleChange = (e) => {
    setSearchQuery(e.currentTarget.value);
  };

  return (
    <Layout>
      <div className="mt-20 container mx-auto">
        <Heading>Search</Heading>
        <div
          style={{
            minHeight: "80vh",
          }}
        >
          {/* MAIN FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-5 flex px-5 flex-col items-center"
            action=""
          >
            {/* INPUT */}
            <div className="flex md:flex-row w-full flex-col justify-center">
              <div
                className={
                  isInputFocused
                    ? "md:w-1/3 md:mb-0 mb-5 w-auto flex md:px-2 rounded-lg md:mx-5 h-10 hover:border-ibgc items-center border-2 border-ibgc"
                    : "md:w-1/3 md:mb-0 mb-5 w-auto flex md:px-2 rounded-lg md:mx-5 h-10 hover:border-ibgc border-2 border-p50 items-center"
                }
              >
                <FontAwesomeIcon icon={faSearch} className="mx-2 md:mx-0" />
                <input
                  className="outline-none bg-bgc md:mx-2 w-auto"
                  type="text"
                  name="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleChange}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </div>
              <Select
                options={options}
                onChange={(opt) => {
                  setOption(opt);
                }}
                defaultValue={options.filter(
                  (option) => option.label === "Title"
                )}
                className="md:w-1/5 w-auto h-10 md:mx-5"
                styles={colorStyles}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "var(--p100)",
                    primary75: "var(--p75)",
                    primary50: "var(--p50)",
                    primary25: "var(--p25)",
                  },
                })}
              />
            </div>

            {/* SELECT */}
            <div className="flex my-8 justify-center">
              <button
                className="mx-10 bg-primary focus:outline-none text-bgc rounded-lg px-5 py-2"
                onSubmit={handleSubmit}
              >
                Search
              </button>
            </div>
          </form>
          <Container>
            {isLoading === true ? (
              <div className="w-full flex justify-center items-center">
                <object data={LoadingSpinner} type="">
                  svg
                </object>
              </div>
            ) : (
              ""
            )}
            {isLoaded && searchData.length !== 0 ? (
              <PostListContainer>
                {searchData.map(
                  ({
                    author,
                    category,
                    cover,
                    published_date,
                    title,
                    body,
                    slug,
                  }) => {
                    const data = {
                      author: {
                        name: author.name,
                        pic: author.pic ? author.pic.url : "",
                      },
                      category: category.name,
                      cover: cover ? cover.url : "",
                      published_date: published_date,
                      title,
                      body,
                      slug,
                    };
                    return <SearchBlogCard content={data} />;
                  }
                )}
              </PostListContainer>
            ) : (
              ""
            )}
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
