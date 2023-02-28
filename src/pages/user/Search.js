import React, { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { FiArrowRight } from "react-icons/fi";
import { BsFillMicFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { selectCurrentToken } from "../../store/auth-slice";
import { useSelector } from "react-redux";

const Search = () => {
  const [isMicStart, setIsMicStart] = React.useState(false);
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isSearchingMore, setIsSearchingMore] = React.useState(false);
  const [searchArray, setSearchArray] = React.useState([]);
  const [reserve_keywords] = React.useState([
    {
      name: "stripe",
      keywords: [
        "balance",
        "pending",
        "available",
        "transaction",
        "payout",
        "payment",
        "customer",
      ],
    },
    {
      name: "quickbooks",
      keywords: ["invoice", "customer", "payment", "transaction", "balance"],
    },
  ]);

  const Skeleton = () => {
    const skeletonts = [];

    for (let i = 0; i < 10; i++) {
      skeletonts.push(
        <div
          key={i}
          className="search-result-item flex justify-between gap-3 p-3 my-2  font-bold border-b border-gray-100 loading-skeleton"
        >
          <div className="search-result-item-icon flex gap-2">
            <img
              src={require("../../assets/img/stripe.png")}
              className="h-7 w-7 rounded"
              alt="icon"
            />
            <p className="px-1 text-sm">You stripe balance is 00.3$</p>
          </div>
        </div>
      );
    }
    return skeletonts;
  };
  //changeSearch
  const changeSearch = (value) => {
    setIsSearching(true);
    setSearchResult([]);
    //spit the string to array
    value = value.toLowerCase();
    let search_text_array = value.split(" ");
    let filter_search_array = [];
    console.log("reserve_keywords", reserve_keywords);
    //  keyowrd research start
    search_text_array.map((search) => {
      //check if search is in reserve keywords
      reserve_keywords.map((item) => {
        if (item.name === search) {
          let app_name = item.name;
          //check if keywords is in search array
          item.keywords.forEach((keyword) => {
            //search index from origianl search text
            if (value.indexOf(keyword) >= 0) {
              filter_search_array.push({
                app_name: app_name,
                keyword: keyword,
              });
              console.log("search = ", app_name + " " + keyword);
            }
          });
        }
      });
    });

    //if no result found then check the keyword again from all apps
    if (filter_search_array.length === 0) {
      search_text_array.map(function (search) {
        reserve_keywords.map(function (item) {
          let app_name = item.name;
          //check if keywords is in search array
          item.keywords.forEach(function (keyword) {
            if (search.indexOf(keyword) >= 0) {
              filter_search_array.push({
                app_name: app_name,
                keyword: keyword,
              });
              console.log("search 2= ", app_name + " " + keyword);
            }
          });
        });
      });
    }
    //  keyowrd research end

    filter_search_array.forEach((item) => {
      console.log("item", item);
      if (item.app_name === "stripe") {
        if (item.keyword === "balance") {
          getStripeBalance("available");
          getStripeBalance("pending");
        }
        // else if (item.keyword === "available") {
        //   getStripeBalance("available");
        // } else if (item.keyword === "pending") {
        //   getStripeBalance("pending");
        // }
      }

      if (item.app_name === "quickbooks") {
        if (item.keyword === "balance") {
          getQuickBooksBalance();
        }
      }
    });

    if (filter_search_array.length === 0) {
      setIsSearching(false);
    }
  };

  const getStripeBalance = async function (type) {
    const Stripe = require("stripe");
    const stripe = Stripe(
      "sk_test_51IB4qzKYMyh2aT3CI7KqwqjtAYImWutxqbbfkk25LzvnIY16pzLUsRGtajqVPG9oGaT3fTppSwXNjizCH52HC1KJ00QaCK0UYU"
    );
    const result = await stripe.balance.retrieve({
      stripeAccount: "acct_1MUwUX4GtNfnLkR6",
    });
    let new_item = {};
    if (type === "pending") {
      new_item = {
        title:
          "You stripe pending balance is " +
          result.pending[0].amount / 100 +
          "$",
        image:
          "https://cdn.iconscout.com/icon/free/png-256/stripe-2-498440.png",
        url: "https://www.google.com",
      };
    } else {
      new_item = {
        title:
          "You stripe available balance is " +
          result.available[0].amount / 100 +
          "$",
        image:
          "https://cdn.iconscout.com/icon/free/png-256/stripe-2-498440.png",
        url: "https://www.google.com",
      };
    }
    //remove duplicate

    //push the result
    setSearchResult((current) => [...current, new_item]);
    setIsSearching(false);
  };

  const getQuickBooksBalance = async function () {
    setIsSearchingMore(true);
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/global/search`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(({ data }) => {
        console.log(data);
        let new_item = {
          title:
            "You quickbooks total assests is " +
            data.Rows.Row[0].Summary.ColData[1].value +
            "$",
          image:
            "https://assets.materialup.com/uploads/87f2e2a8-5ec3-4a53-9f52-43ee75f03d12/teaser.png",
          url: "https://www.google.com",
        };
        //push the result
        setSearchResult((current) => [...current, new_item]);
        setIsSearching(false);
        setIsSearchingMore(false);
      });
  };

  useEffect(() => {
    //auto click to input
    document.getElementById("search-input").focus();
    if (search.length > 0) {
      const timeoutId = setTimeout(() => changeSearch(search), 1000);
      return () => clearTimeout(timeoutId);
    } else {
      setSearchResult([]);
    }
  }, [search]);

  const microphoneStart = () => {
    console.log("microphone start");
    setIsMicStart(true);
    //start the microphone
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.start();

    recognition.addEventListener("result", (e) => {
      const transcript = Array.from(e.results).map((result) => result[0]);
      setSearch(transcript[0].transcript);
    });

    recognition.addEventListener("end", () => {
      console.log("microphone end");
      setIsMicStart(false);
    });
  };

  return (
    <div>
      <div className="h-screen">
        <div className="p-2">
          <div className="header flex gap-2 relative border-b border-gray-100 p-3">
            <BsSearch className="mt-3 text-gray-500 text-xl" />
            <input
              placeholder="Type here.."
              className="p-2 text-xl w-[100%] bg-transparent"
              id="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <BsFillMicFill
              className={
                isMicStart
                  ? "text-red-500 absolute right-15 top-5 text-sm cursor-pointer bg-gray-100  h-7 w-7 p-1 rounded-full flex justify-center items-center"
                  : "text-gray-500 absolute right-15 top-5 text-sm cursor-pointer bg-gray-100  h-7 w-7 p-1 rounded-full flex justify-center items-center"
              }
              onClick={() => microphoneStart()}
            />
            <IoMdClose
              className="absolute right-5 top-5 text-sm cursor-pointer bg-gray-100 text-gray-500 h-7 w-7 p-1 rounded-full flex justify-center items-center"
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="body">
            <div className="search-result">
              {isSearching ? (
                <Skeleton />
              ) : searchResult && searchResult.length > 0 ? (
                searchResult.map((item, index) => {
                  // filter duplicate results

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
                          src={item.image}
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
              {isSearchingMore ? <Skeleton /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
