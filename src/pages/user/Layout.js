import "../../App.css";
import { useState } from "react";
import SearchModal from "../../components/SearchModal";
import { IoIosArrowBack } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/Topbar";

function Layout({ children, page_title }) {
  return (
    <div>
      <Topbar page_title={page_title} />
      {/* content start */}
      {children}
      {/* content  end*/}
    </div>
  );
}

export default Layout;
