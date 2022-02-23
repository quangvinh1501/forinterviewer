import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import MyPagination from "./MyPagination";
import { toast, ToastContainer } from "react-toastify";
import AddReduxBlog from "./AddReduxBlog";
import EditReduxBlog from "./EditReduxBlog";
import DetailRedux from "./DetailHook";
import "./blog.css";
import NavBar from "./NavBar";
import { useDispatch } from "react-redux";
import { deletePost, getPosts, getPAGY } from "../store/posts/actions";
import dateFormat from "dateformat";
import Loader from "react-loader-spinner";
import Confirm from "./Confirm";
import { connect } from "react-redux";

const ReduxFunction = (props) => {
  const { posts, loadingPosts } = props.bloglist; //useSelector((state) => state.BlogReducer);
  const { pagys } = props.pagylist; //useSelector((state) => state.PagyReducer);
  const [currentPage, setPage] = useState(1);
  const [totalpage, setTotalPage] = useState(0);
  const [keyword, setKeyWord] = useState("");
  const [sortdirection, setsortdirection] = useState("desc");
  const [sortby, setsortby] = useState("created_at");
  const [item, setItem] = useState(10);
  const [totalrecord, setTotalRecord] = useState(0);
  const [showModalAddHook, setShowModalAddHook] = useState(false);
  const [showModalEditHook, setShowModalEditHook] = useState(false);
  const [showModalDetailHook, setShowModalDetailHook] = useState(false);
  const [status, setStatus] = useState("Submit");
  const [confirmshow, setConfirmShow] = useState(false);
  const [dataupdate, setDataUpdate] = useState({
    id: "",
    title: "",
    content: "",
    image: { url: "" },
  });
  let dispatch = useDispatch();
  const values = { currentPage, item, sortdirection, sortby, keyword };
  useEffect(() => {
    dispatch(getPAGY(values));
    dispatch(getPosts(values));
    console.log(values, "gia tri ban dau truyen di");
  }, [
    currentPage,
    totalpage,
    keyword,
    sortdirection,
    sortby,
    item,
    totalrecord,
    dispatch,
  ]);
  useEffect(() => {
    setTotalPage(pagys.pages);
    setTotalRecord(pagys.count);
  });
  const handleShowModalAdd = () => {
    setShowModalAddHook(true);
  };
  const hideModalAddHook = () => {
    setShowModalAddHook(false);
  };
  const AddBlogItem = (addconfirm,success,statusbutton) => {

    if (addconfirm) {
      if (success) {
        setStatus(statusbutton);
        callposts();
        callpagy();
        setShowModalAddHook(false);
      } else {
        setStatus(statusbutton);
        callposts();
        callpagy();
        setShowModalAddHook(true);
      }
    } else {
      setShowModalAddHook(false);
      setStatus(statusbutton);
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
  const editBlogItem = (editconfirm,success,statusbutton) => {
    console.log(editconfirm+"/"+success,'confirmmmmmmmmmmmmmm')
    if (editconfirm) {
      if (success) {
        setStatus(statusbutton);
        callposts();
        callpagy();
        setShowModalEditHook(false);
      } else {
        setStatus(statusbutton);
        callposts();
        callpagy();
        setShowModalEditHook(true);
      }
    } else {
      setShowModalEditHook(false);
      setStatus(statusbutton);
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

  const afterPageClicked = (page_number) => {
    setPage(page_number);
    callposts();
    callpagy();
  };
  const callposts = async () => {
    //setConfirmShow(false);
    await dispatch(getPosts(values));
  };
  const callpagy = async () => {
    await dispatch(getPAGY(values));
  };
  const deleteRow = async (id) => {
    await dispatch(deletePost(id));
    if(props.success){
      callposts();
      callpagy();
      setConfirmShow(false);
    }else{
      setConfirmShow(true);
    }
    
  };

  return (
    <>
      <NavBar />
      <main role="main">
        <section className="content-item" id="comments">
          <div className="container" style={{ marginTop: "100px" }}>
            <div className="row">
              <div className="col-sm-12">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 mx-auto mb-4">
                      <div className="section-title text-center ">
                        <h2>
                          LIST OF <b>BLOGS</b>
                        </h2>
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
                              <AddReduxBlog
                                addBlogProps={AddBlogItem}
                                show={showModalAddHook}
                                onHide={hideModalAddHook}
                                hideModalAddHook={hideModalAddHook}
                                statusbutton={status}
                              />
                              <EditReduxBlog
                                editBlogProps={editBlogItem}
                                show={showModalEditHook}
                                onHide={hideModalEditHook}
                                dataupdate={dataupdate}
                                hideModalEditHook={hideModalEditHook}
                                statusbutton={status}
                              />
                              <DetailRedux
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
                          <div>
                            <section className="content-item" id="comments">
                              <div
                                className="container"
                                style={{ marginTop: "100px" }}
                              >
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="container">
                                      <div className="row">
                                        <div className="col-lg-10 mx-auto mb-4">
                                          <div className="section-title text-center ">
                                            <h2>
                                              LIST OF <b>BLOGS</b>
                                            </h2>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-lg-10 mx-auto">
                                          <div className="career-search mb-60">
                                            <div className="filter-result">
                                              {loadingPosts ? (
                                                <div className="loader">
                                                  <Loader
                                                    type="Bars"
                                                    color="#00BFFF"
                                                    height={50}
                                                    width={100}
                                                    timeout={3000} //3 secs
                                                  />
                                                </div>
                                              ) : (
                                                <div>
                                                  {posts.map((dtlist) => {
                                                    return (
                                                      <div
                                                        className="job-box d-md-flex align-items-center justify-content-between mb-30"
                                                        key={dtlist.id}
                                                      >
                                                        <div className="job-left my-4 d-md-flex align-items-center flex-wrap customewidth">
                                                          <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                                            <img
                                                              src={
                                                                dtlist.image.url
                                                              }
                                                              alt={dtlist.title}
                                                              style={{
                                                                width: "65px",
                                                                height: "65px",
                                                              }}
                                                            />
                                                          </div>
                                                          <div className="job-content">
                                                            <h5 className="text-center text-md-left">
                                                              {dtlist.title}
                                                            </h5>
                                                            <div>
                                                              {dtlist.content}
                                                            </div>
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
                                                              marginBottom:
                                                                "3px",
                                                            }}
                                                            onClick={() => {
                                                              handleShowModalDetail(
                                                                dtlist
                                                              );
                                                            }}
                                                          >
                                                            Detail
                                                          </button>
                                                          <div
                                                            className="breakbutton"
                                                            style={{
                                                              clear: "both",
                                                            }}
                                                          ></div>
                                                          <button
                                                            className="btn btn-warning"
                                                            style={{
                                                              width: "80px",
                                                              marginBottom:
                                                                "3px",
                                                            }}
                                                            onClick={() => {
                                                              handleShowModalEdit(
                                                                dtlist
                                                              );
                                                            }}
                                                          >
                                                            Edit
                                                          </button>
                                                          <div
                                                            className="breakbutton"
                                                            style={{
                                                              clear: "both",
                                                            }}
                                                          ></div>
                                                          <Confirm
                                                            onConfirm={() => {
                                                              deleteRow(
                                                                dtlist.id
                                                              );
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
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
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
const mapPropsToState = (state) => {
 return { bloglist: state.BlogReducer, success: state.BlogReducer, statusbutton: state.BlogReducer, pagylist: state.PagyReducer };
};

export default connect(mapPropsToState)(ReduxFunction);
//export default ReduxFunction;
