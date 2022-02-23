import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import dateFormat from "dateformat";
import MyPagination from "./MyPagination";
import Confirm from "./Confirm";
import { toast, ToastContainer } from "react-toastify";
import AddHookBlog from "./AddHookBlog";
import EditHookBlog from "./EditHookBlog";
import DetailHook from "./DetailHook";
import './blog.css'
import NavBar from "./NavBar";

const HookFunction = () => {
  const [datalist, setDataList] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [totalpage, setTotalPage] = useState(1);
  const [keyword, setKeyWord] = useState("");
  const [sortdirection, setsortdirection] = useState("desc");
  const [sortby, setsortby] = useState("created_at");
  const [item, setItem] = useState(10);
  const [totalrecord, setTotalRecord] = useState(0);
  const [showModalAddHook, setShowModalAddHook] = useState(false);
  const [showModalEditHook, setShowModalEditHook] = useState(false);
  const [showModalDetailHook, setShowModalDetailHook] = useState(false);
  const [confirmshow, setConfirmShow] = useState(false);
  const [dataupdate, setDataUpdate] = useState({
    id: "",
    title: "",
    content: "",
    image: { url: "" },
  });

  useEffect(() => {
    fetchData();
  }, [
    currentPage,
    totalpage,
    keyword,
    sortdirection,
    sortby,
    item,
    totalrecord,
  ]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://api-placeholder.herokuapp.com/api/v1/blogs",
      {
        params: {
          page: parseInt(currentPage),
          items: parseInt(item),
          sort_direction: sortdirection,
          sort_by: sortby,
          search: keyword,
        },
      }
    );
    setDataList(response.data.data);
    setTotalRecord(response.data.pagy.count);
    setTotalPage(response.data.pagy.pages);
  };

  const handleShowModalAdd = () => {
    setShowModalAddHook(true);
  };
  const hideModalAddHook = () => {
    setShowModalAddHook(false);
  };
  const addBlogItem = (modalresponse) => {
    if (modalresponse) {
      console.log(modalresponse);
      setShowModalAddHook(false);
      fetchData();
    } else {
      setShowModalAddHook(true);
    }
  };

  const handleShowModalDetail = (dtlist) => {
    setShowModalDetailHook(true);
    setDataUpdate(dtlist);
  };
  const hideModalDetailHook = () => {
    setShowModalDetailHook(false);
  };

  const handleShowModalEdit = (dtlist) => {
    setDataUpdate(dtlist);
    setShowModalEditHook(true);
  };
  const hideModalEditHook = () => {
    setShowModalEditHook(false);
  };

  const editBlogItem = (modalresponse) => {
    if (modalresponse) {
      console.log(modalresponse);
      setShowModalEditHook(false);
      fetchData();
    } else {
      setShowModalEditHook(true);
    }
  };

  const onchangeSortDirection = (value1) => {
    console.log(value1);
    setsortdirection(value1);
  };
  const onchangeSortBy = (value2) => {
    console.log(value2);
    setsortby(value2);
  };
  const onchangeSortTotal = (value3) => {
    console.log(value3);
    setItem(value3);
  };
  const onchangeKeyWord = (value4) => {
    console.log(value4);
    setKeyWord(value4);
  };

  const afterPageClicked = async (page_number) => {
    setPage(page_number);

    const response = await axios.get(
      "https://api-placeholder.herokuapp.com/api/v1/blogs",
      {
        params: {
          page: parseInt(page_number),
          items: parseInt(item),
          sort_direction: sortdirection,
          sort_by: sortby,
          search: keyword,
        },
      }
    );
    setDataList(response.data.data);
    setTotalRecord(response.data.pagy.count);
    setTotalPage(response.data.pagy.pages);
  };

  const deleteRow = async (id) => {
    const response = await axios
      .delete("https://api-placeholder.herokuapp.com/api/v1/blogs/" + id)
      .then(function (response) {
        //handle success
        if (response.status === 204) {
          fetchData();
          setConfirmShow(false);
          toast.success("Blog deleted", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          setConfirmShow(true);
          toast.error("Not Found", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  return (
    <>
    <NavBar/>
      <main role="main">
        <section className="content-item" id="comments">
          <div className="container" style={{marginTop: '100px'}}>
            <div className="row">
              <div className="col-sm-12">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 mx-auto mb-4">
                      <div className="section-title text-center ">
                      <h2>LIST OF <b>BLOGS</b></h2>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-10 mx-auto">
                      <div className="career-search mb-60">
                        <form className="career-form mb-60">
                          <div className="row">
                            <div className="col-md-6 col-lg-3 my-3">
                              <div className="input-group position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Your Keywords"
                                  id="keywords"
                                  value={keyword}
                                  onChange={(e) =>
                                    onchangeKeyWord(e.target.value)
                                  }
                                  style={{ height: "48px" }}
                                />
                              </div>
                            </div>
                            <div className="my-3">
                              <div className="select-container">
                                <select
                                  className="custom-select"
                                  value={sortdirection}
                                  onChange={(e) =>
                                    onchangeSortDirection(e.target.value)
                                  }
                                  placeholder="sort direction of"
                                >
                                  <option value="asc">ascending</option>
                                  <option value="desc">descending</option>
                                </select>
                              </div>
                            </div>
                            <div className="my-3">
                              <div
                                className="select-container"
                                style={{ width: "80px" }}
                              >
                                <select
                                  style={{ width: "80px" }}
                                  className="custom-select"
                                  value={item}
                                  onChange={(e) =>
                                    onchangeSortTotal(e.target.value)
                                  }
                                  placeholder="sort total of"
                                >
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                  <option value="50">50</option>
                                  <option value="100">100</option>
                                </select>
                              </div>
                            </div>
                            <div className="my-3">
                              <div
                                className="select-container"
                                style={{ width: "180px" }}
                              >
                                <select
                                  style={{ width: "180px" }}
                                  value={sortby}
                                  className="custom-select select form-control"
                                  onChange={(e) =>
                                    onchangeSortBy(e.target.value)
                                  }
                                  placeholder="sort by of"
                                >
                                  <option value="id">sort of id</option>
                                  <option value="title">sort of title</option>
                                  <option value="content">
                                    sort of content
                                  </option>
                                  <option value="created_at">
                                    sort of date created
                                  </option>
                                  <option value="updated_at">
                                    sort of date updated
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="my-3">
                              <button
                                type="button"
                                className="btn btn-lg btn-block btn-light btn-custom"
                                id="contact-submit"
                                onClick={() => {
                                  handleShowModalAdd();
                                }}
                              >
                                Add
                              </button>
                              <AddHookBlog
                                addBlogProps={addBlogItem}
                                show={showModalAddHook}
                                onHide={hideModalAddHook}
                                hideModalAddHook={hideModalAddHook}
                              />
                              <EditHookBlog
                                editBlogProps={editBlogItem}
                                show={showModalEditHook}
                                onHide={hideModalEditHook}
                                dataupdate={dataupdate}
                                hideModalEditHook={hideModalEditHook}
                              />
                              <DetailHook
                                style={{ minWidth: "max-content" }}
                                show={showModalDetailHook}
                                onHide={hideModalDetailHook}
                                datadetail={dataupdate}
                                hideModalDetailHook={hideModalDetailHook}
                              />
                            </div>
                          </div>
                        </form>

                        <div className="filter-result">
                          <p className="mb-30 ff-montserrat">
                            Total Blog Openings : {item}{" "}
                            {item > 9 ? "current records" : "current record"} /{" "}
                            {totalrecord > 9
                              ? totalrecord + " total records"
                              : totalrecord + " total record"}{" "}
                            /{" "}
                            {totalpage > 9
                              ? totalpage + " pages"
                              : totalpage + " page"}
                          </p>
                          {datalist.map((dtlist) => {
                            return (
                              <div
                                className="job-box d-md-flex align-items-center justify-content-between mb-30"
                                key={dtlist.id}
                              >
                                <div className="job-left my-4 d-md-flex align-items-center flex-wrap customewidth">
                                  <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                    <img
                                      src={dtlist.image.url}
                                      alt={dtlist.title}
                                      style={{ width: "65px", height: "65px" }}
                                    />
                                  </div>
                                  <div className="job-content">
                                    <h5 className="text-center text-md-left">
                                      {dtlist.title}
                                    </h5>
                                    <div>{dtlist.content}</div>
                                    <ul className="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                      <li className="mr-md-4">
                                        <i className="zmdi zmdi-calendar-alt"></i>{" "}
                                        {dateFormat(
                                          dtlist.created_at,
                                          "dd/mm/yyyy"
                                        )}
                                      </li>
                                      <li className="mr-md-4">
                                        <i className="zmdi zmdi-calendar-close"></i>{" "}
                                        {dateFormat(
                                          dtlist.updated_at,
                                          "dd/mm/yyyy"
                                        )}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="job-right my-4 flex-shrink-0">
                                  <button
                                    className="btn btn-success"
                                    style={{
                                      width: "80px",
                                      marginBottom: "3px",
                                    }}
                                    onClick={() => {
                                      handleShowModalDetail(dtlist);
                                    }}
                                  >
                                    Detail
                                  </button>
                                  <div className="breakbutton" style={{clear:'both'}}></div>
                                  <button
                                    className="btn btn-warning"
                                    style={{
                                      width: "80px",
                                      marginBottom: "3px",
                                    }}
                                    onClick={() => {
                                      handleShowModalEdit(dtlist);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <div className="breakbutton" style={{clear:'both'}}></div>
                                  <Confirm
                                    onConfirm={() => {
                                      deleteRow(dtlist.id);
                                    }}
                                    body="Are you sure you want to delete this?"
                                    confirmText="Confirm Delete"
                                    title="Deleting"
                                    visible={
                                      confirmshow
                                    }
                                  >
                                    <button
                                      className="btn btn-danger btndelete"
                                      onClick={() =>setConfirmShow(true)}
                                    >
                                      Delete
                                    </button>
                                  </Confirm>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <MyPagination
                        totalrecord={totalpage}
                        currentPage={currentPage}
                        pageClicked={(ele) => {
                          afterPageClicked(ele);
                        }}
                      ></MyPagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default HookFunction;
