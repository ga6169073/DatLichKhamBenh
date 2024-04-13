import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { CommonUtils } from "../../../utils";
class RejectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            reason: ''
        };
    }
    async componentDidMount() {
        console.log(this.props.dataModal)
        if (this.props.dataModal)
            this.setState({
                email: this.props.dataModal.email
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleRejectBooking = () => {
        console.log(this.state)
        this.props.rejectBooking(this.state)
    }
    handleOnChangeTextarea =(event) => {
        this.setState({
            reason: event.target.value
        })
    }


    render() {
        let { isOpenRejectModal, dataModal, closeRejectModal } = this.props

        return (
            <Modal
                isOpen={isOpenRejectModal}
                className="reject-modal-container"
                size="md"
                centered>
                <div className="modal-header">
                    <h5 className="modal-title">Từ chối lịch khám bệnh</h5>
                    <button type="button" className="close" onClick={closeRejectModal} aria-label="Close" >
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="col-6 form-group">
                        <label>Email bệnh nhân</label>
                        <input className="form-control" type="email" onChange={(event) => this.handleOnChangeEmail(event)} value={this.state.email} />
                    </div>
                    <div className="col-12 form-group">
                        <label>Lý do từ chối</label>
                        <textarea className="form-control" rows={4} onChange={(event)=>this.handleOnChangeTextarea(event)}></textarea>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { this.handleRejectBooking() }}>Gửi</Button>
                    <Button color="secondary" onClick={closeRejectModal}>Hủy bỏ</Button>
                </ModalFooter>
            </Modal>)
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RejectModal);