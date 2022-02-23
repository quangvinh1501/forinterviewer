import React, { useEffect } from "react";
import dateFormat from "dateformat";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import Confirm from "./Confirm";

const ReduxBlogs = (props) => {
  const { posts, loadingPosts } = useSelector((state) => state.BlogReducer);
  const { pagys } = useSelector((state) => state.PagyReducer);
  console.log(posts, "gia tri sau khi connected store");
  useEffect(() => {
    props.getInforOfPagination(pagys.pages, pagys.count);
  }, [pagys.pages, pagys.count]);
  return (
    <>
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
                                        src={dtlist.image.url}
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
                                        props.handleShowModalDetail(dtlist);
                                      }}
                                    >
                                      Detail
                                    </button>
                                    <div
                                      className="breakbutton"
                                      style={{ clear: "both" }}
                                    ></div>
                                    <button
                                      className="btn btn-warning"
                                      style={{
                                        width: "80px",
                                        marginBottom: "3px",
                                      }}
                                      onClick={() => {
                                        props.handleShowModalEdit(dtlist);
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <div
                                      className="breakbutton"
                                      style={{ clear: "both" }}
                                    ></div>
                                    <Confirm
                                      onConfirm={() => {
                                        props.deleteRow(dtlist.id);
                                      }}
                                      body="Are you sure you want to delete this?"
                                      confirmText="Confirm Delete"
                                      title="Deleting"
                                    >
                                      <button className="btn btn-danger btndelete">
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
    </>
  );
};
export default ReduxBlogs;
