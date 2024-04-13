import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { CommonUtils } from "../../../utils";
class DrugsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''
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
    handleSendDrugsList = () => {
        console.log(this.state)
        this.props.sendDrugs(this.state)
    }
    handleOnChangeImage =async(event) => {
        let data = event.target.files
        let file = data[0]
        if(file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64
            })
        }
    }

    render() {
        let { isOpenDrugsModal, dataModal, closeSendDrugsModal } = this.props
        return (
            <Modal
                isOpen={isOpenDrugsModal}
                className="send-drugs-modal-container"
                size="md"
                centered>
                <div className="modal-header">
                    <h5 className="modal-title">Gửi đơn thuốc khám bệnh</h5>
                    <button type="button" className="close" onClick={closeSendDrugsModal} aria-label="Close" >
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="col-6 form-group">
                        <label>Email bệnh nhân</label>
                        <input className="form-control" type="email" onChange={(event) => this.handleOnChangeEmail(event)} value={this.state.email} />
                    </div>
                    <div className="col-6 form-group">
                        <label>Chọn file ảnh</label>
                        <input className="file" type="file" onChange={(event)=> this.handleOnChangeImage(event)}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=> {this.handleSendDrugsList()}}>Gửi</Button>
                    <Button color="secondary" onClick={closeSendDrugsModal}>Hủy bỏ</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrugsModal);