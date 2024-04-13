import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './ManagePatient.scss'
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { getAllPatientForDoctor, postSendDrugs, confirmBooking, rejectBooking } from "../../../services/userService";
import { Button } from "reactstrap";
import { LANGUAGES } from "../../../utils";
import DrugsModal from './DrugsModal'
import RejectModal from "./RejectModal";
import { toast } from 'react-toastify'

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenDrugsModal: false,
            isOpenRejectModal: false,
            dataModal: {}
        };
    }
    async componentDidMount() {
        this.getDataPatient()
    }
    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formattedDate = new Date(currentDate).getTime()
        // console.log(user.id)
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate
        })
        console.log(res)
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }
    handleBtnConfirm = async (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            time: item.timeTypeDataPatient.valueVi,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }

        await this.confirmBooking(data)

        this.setState({
            dataModal: data
        })
    }
    handleBtnSend = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            time: item.timeTypeDataPatient.valueVi,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenDrugsModal: true,
            dataModal: data
        })
    }
    handleBtnReject = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            time: item.timeTypeDataPatient.valueVi,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRejectModal: true,
            dataModal: data
        })
    }
    sendDrugs = async (data) => {
        let { dataModal } = this.state
        let res = await postSendDrugs({
            email: data.email,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            imgBase64: data.imgBase64,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })

        if (res && res.errCode === 0) {
            toast.success('Send drugs list succeed')
            this.closeSendsDrugModal()
            await this.getDataPatient()
        } else {
            toast.error('Error SendDrugList ')
            console.log('Error SendDrugList', res)
        }
    }
    confirmBooking = async (data) => {
        let { dataModal } = this.state
        console.log(data.email)
        let res = await confirmBooking({
            email: data.email,
            doctorId: data.doctorId,
            patientId: data.patientId,
            time: data.time,
            timeType: data.timeType,
            language: this.props.language,
            patientName: data.patientName,
            doctorName: this.props.user.lastName + " " + this.props.user.firstName
        })

        if (res && res.errCode === 0) {
            toast.success('Send doctor confirm booking succeed')
            // this.closeRejectModal()
            await this.getDataPatient()
        } else {
            toast.error('Error doctor confirm booking ')
            console.log('Error doctor confirm booking', res)
        }
    }
    rejectBooking = async (data) => {
        let { dataModal } = this.state
        let res = await rejectBooking({
            email: data.email,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            reason: data.reason,
            time: data.time,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
            doctorName: this.props.user.lastName + " " + this.props.user.firstName
        })

        if (res && res.errCode === 0) {
            toast.success('Send doctor reject booking succeed')
            this.closeRejectModal()
            await this.getDataPatient()
        } else {
            toast.error('Error doctor reject booking ')
            console.log('Error doctor reject booking', res)
        }
    }
    closeSendDrugsModal = () => {
        this.setState({
            isOpenDrugsModal: false,
            dataModal: {}
        })
    }
    closeRejectModal = () => {
        this.setState({
            isOpenRejectModal: false,
            dataModal: {}
        })
    }
    render() {
        let { language } = this.props
        let { dataPatient, isOpenDrugsModal, isOpenRejectModal, dataModal } = this.state
        return (
            <>
                {/* <LoadingOverlay /> */}
                <div className="manage-patient-container">
                    <div className="manage-patient-tilte">Quản lý bệnh nhân khám bệnh</div>
                    <div className="manage-patient-body row">
                        <div className="col-6 form-group">
                            <label>Chọn ngày khám</label>
                            <DatePicker onChange={this.handleOnChangeDatePicker}
                                className="form-control" value={this.state.currentDate}
                            />
                        </div>
                        <div className="col-12 table-manage-patient">
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời gian</th>
                                        <th>Họ và tên</th>
                                        <th>Địa chỉ</th>
                                        <th>Giới tính</th>
                                        <th>Actions</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.timeTypeDataPatient.valueVi}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{item.patientData.genderData.valueVi}</td>
                                                    <td>{item.statusId === 'S2' ?
                                                        <>
                                                            <Button className="manage-patient-btn-confirm"
                                                                onClick={() => this.handleBtnConfirm(item)}>Xác nhận khám</Button>
                                                            <Button className="manage-patient-btn-reject"
                                                                onClick={() => this.handleBtnReject(item)}>Từ chối khám</Button>
                                                        </>
                                                        : <Button className="manage-patient-btn-send-drugs"
                                                            onClick={() => this.handleBtnSend(item)}>Gửi đơn thuốc</Button>}
                                                    </td>
                                                </tr>
                                            )
                                        }) :
                                        <tr>
                                            <td style={{ textAlign: "center" }}>No data</td>
                                        </tr>
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
                <DrugsModal
                    isOpenDrugsModal={isOpenDrugsModal}
                    dataModal={dataModal}
                    closeSendDrugsModal={this.closeSendDrugsModal}
                    sendDrugs={this.sendDrugs}
                />
                <RejectModal
                    isOpenRejectModal={isOpenRejectModal}
                    dataModal={dataModal}
                    closeRejectModal={this.closeRejectModal}
                    rejectBooking={this.rejectBooking}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);