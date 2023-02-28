import React, { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ showModal, setShowModal }) => {
  const closeModal = () => {
    setShowModal(false);
  };

  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  //changeSearch
  const changeSearch = (value) => {
    setSearch(value);
    //send ajax request when stop type
    fetch(`http://127.0.0.1:8000/api/global/search?q=${value}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          var data = json.data;
          console.log(data);
          setSearchResult(data);
        }
      });
  };

  useEffect(() => {
    if (search.length > 0) {
      const timeoutId = setTimeout(() => changeSearch(search), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [search]);

  return (
    <div>
      {showModal ? (
        <div className="modal fixed bg-white h-100">
          <div className="modal-content p-2">
            <div className="header flex gap-2 relative border-b border-gray-100 p-3">
              <BsSearch className="mt-3 text-gray-500 text-xl" />
              <input
                placeholder="Type here.."
                className="p-2 text-xl w-[100%]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IoMdClose
                className="absolute right-5 top-5 text-xl cursor-pointer"
                onClick={() => closeModal()}
              />
            </div>

            <div className="body">
              <div className="search-result">
                {searchResult && searchResult.length > 0 ? (
                  searchResult.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          index === 0
                            ? "search-result-item flex justify-between gap-3 p-3 my-2  font-bold border-b border-gray-100 bg-blue-500 rounded text-white"
                            : "search-result-item flex justify-between gap-3 p-3 my-2  font-bold border-b border-gray-100"
                        }
                      >
                        <div className="search-result-item-icon flex gap-2">
                          <img
                            src={require("../assets/img/stripe.png")}
                            className="h-7 w-7 rounded"
                            alt="icon"
                          />
                          <p className="px-1 text-sm">{item.title}</p>
                        </div>
                        <div className="search-result-item-icon p-1">
                          <FiArrowRight
                            className="text-xl cursor-pointer"
                            onClick={() => navigate(item.url)}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center h-[50vh]">
                    <h1 className="text-xl font-semibold text-gray-500">
                      No Result Found
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchModal;
