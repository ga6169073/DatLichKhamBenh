import React, { Component, isValidElement } from "react"
import { FormattedMessage } from "react-intl"
import { connect } from "react-redux"
import "./DoctorExtraInfor.scss"
import "react-image-lightbox/style.css"
import { LANGUAGES } from "../../../../utils"
import { getExtraInforDoctorById } from "../../../../services/userService"
import NumberFormat from "react-number-format"

import moment from "moment"

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
        }
    }
    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            console.log('extra infor test: ', res)

            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data,
                })
            }
        }
    }

    handleOnClickHideShow = () => {
        this.setState({
            isShowDetailInfor: !this.state.isShowDetailInfor,
        })
    }
    render() {
        let { isShowDetailInfor, extraInfor } = this.state
        let { language } = this.props
        let clinic = extraInfor.Clinic
        let nameClinic = "", addressClinic = ""
        if (typeof clinic === undefined) clinic = {}
        // console.log(nameClinic)
        if (clinic) {
            nameClinic = clinic.name
            addressClinic = clinic.address
        }
        // console.log(extraInfor)
        let specialty = extraInfor.Specialty
        if(typeof specialty === undefined) specialty = {}
        let specialtyName = ""
        if(specialty ) {
            specialtyName = specialty.name
        } 

        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address"> <FormattedMessage id='patient.extra-infor-doctor.text-address' /></div>
                    <div className="name-clinic">
                        Tên phòng khám: {extraInfor && nameClinic ? nameClinic : ""}
                    </div>
                    <div className="detail-address">
                        Địa chỉ phòng khám: {extraInfor && addressClinic
                            ? addressClinic
                            : ""}
                    </div>
                    <br></br>
                    <div className="specialty" >Chuyên khoa: {extraInfor && specialtyName ? specialtyName : ""}</div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false ? (
                        <>
                            <div className="title-price">
                                {" "}
                                <FormattedMessage id='patient.extra-infor-doctor.price' />
                                <span className="price">
                                    {extraInfor &&
                                        extraInfor.priceTypeData &&
                                        language === LANGUAGES.VI && (
                                            <NumberFormat
                                                value={extraInfor.priceTypeData.valueVi}
                                                className="currency"
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                suffix={"VND"}
                                            />
                                        )}
                                    {extraInfor &&
                                        extraInfor.priceTypeData &&
                                        language === LANGUAGES.EN && (
                                            <NumberFormat
                                                value={extraInfor.priceTypeData.valueEn}
                                                className="currency"
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                suffix={"USD"}
                                            />
                                        )}
                                </span>
                                <span
                                    className="btn-detail-show"
                                    onClick={() => this.handleOnClickHideShow()}
                                >
                                    <FormattedMessage id='patient.extra-infor-doctor.detail' />
                                </span>{" "}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="title-price"><FormattedMessage id='patient.extra-infor-doctor.price' /></div>
                            <div className="wrap-price">
                                <div className="wrap-title-vi-en">
                                    <div className="title-price1">
                                        <FormattedMessage id='patient.extra-infor-doctor.price' />
                                        <span className="title-price2">
                                            {extraInfor &&
                                                extraInfor.priceTypeData &&
                                                language === LANGUAGES.VI && (
                                                    <NumberFormat
                                                        value={extraInfor.priceTypeData.valueVi}
                                                        className="currency"
                                                        displayType={"text"}
                                                        thousandSeparator={true}
                                                        suffix={"VND"}
                                                    />
                                                )}
                                            {extraInfor &&
                                                extraInfor.priceTypeData &&
                                                language === LANGUAGES.EN && (
                                                    <NumberFormat
                                                        value={extraInfor.priceTypeData.valueEn}
                                                        className="currency"
                                                        displayType={"text"}
                                                        thousandSeparator={true}
                                                        suffix={"USD"}
                                                    />
                                                )}
                                        </span>
                                    </div>

                                    <div className="price-Vi">
                                        {extraInfor && extraInfor.note ? extraInfor.note : ""}
                                    </div>

                                </div>
                                <div className="payment-price">
                                    <FormattedMessage id='patient.extra-infor-doctor.payment' /> {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI && extraInfor.paymentTypeData.valueVi} {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN && extraInfor.paymentTypeData.valueEn}
                                </div>
                            </div>
                            <div
                                onClick={() => this.handleOnClickHideShow()}
                                className="btn-detail-hide"
                            >
                                <FormattedMessage id='patient.extra-infor-doctor.price' />
                            </div>
                        </>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor) 