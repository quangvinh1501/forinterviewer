import React from "react";
import { Modal,Button } from "react-bootstrap";
import './detailhook.css';
import dateFormat from "dateformat";

const DetailHook = (props) => {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        animation={true}
        {...props.datadetail}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.datadetail.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{minWidth: 'max-content'}}>
        <section className="section about-section gray-bg" id="about">
            <div className="container">
                <div className="row align-items-center flex-row-reverse">
                    <div className="col-lg-6">
                        <div className="about-text go-to">
                            <h3 className="dark-color">{props.datadetail.title}</h3>
                            <p style={{textAlign: 'justify', wordSpacing: '-2px'}}>{props.datadetail.content}</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-avatar">
                            <img src={props.datadetail.image.url} title="" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="counter">
                    <div className="row">
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="500" data-speed="500"><i className="zmdi zmdi-calendar-alt"></i></h6>
                                <p className="m-0px font-w-600">{ dateFormat(props.datadetail.created_at, "dd/mm/yyyy")}</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="150" data-speed="150"><i className="zmdi zmdi-calendar-close"></i></h6>
                                <p className="m-0px font-w-600">{ dateFormat(props.datadetail.updated_at, "dd/mm/yyyy") }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.hideModalDetailHook()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DetailHook;
