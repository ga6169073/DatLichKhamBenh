import React, { Component, isValidElement } from "react"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../../services/userService'
import { LANGUAGES } from "../../../../utils"
import NumberFormat from "react-number-format"
import _ from 'lodash'
import moment from "moment/moment"
import { withRouter } from 'react-router';
import DatePicker from "../../../../components/Input/DatePicker"
import { Link } from "react-router-dom"

class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId)
        console.log(data)
        this.setState({
            dataProfile: data
        })

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInfoDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data,
            });
        }
    }
    getInfoDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }

        }
        return result
    }

    renderTimeBooking = (dataTime) => {
        let { language, isShowLinkDetail } = this.props
        let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

        if (dataTime && !_.isEmpty(dataTime)) {
            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            return (
                <>
                    <div> {time} - {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.freeBooking" /></div>
                </>
            )
        }
        return <></>
    }
    handleOnClickDetailDoctor = (doctorId) => {
        // <Link to={`/detail-doctor/${doctorId}`}></Link>
        this.props.history.push(`/detail-doctor/${doctorId}`)

    }

    render() {
        let { dataProfile } = this.state
        let { language, isShowDescriptionDoctor, dataTime, isShowLinkDetail, isShowPrice, doctorId } = this.props
        let nameVi, nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}`
        }


        return (
            <>
                <div className="profile-doctor-container">
                    <div className="intro-doctor">
                        <div className="content-left"
                            style={{
                                backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                            }} ></div>
                    </div>
                    <div className="content-right">
                        <div className="up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="down">
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                        <span> {dataProfile.Markdown.description}</span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>}
                        </div>
                        {isShowLinkDetail === true &&
                            <div
                                className="view-detail-doctor">
                                <Link to={`/detail-doctor/${doctorId}`}>Xem them</Link>
                            </div>
                        }
                        {isShowPrice === true &&
                            <div className="price">
                                <FormattedMessage id="patient.booking-modal.price" />
                                {dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceTypeData && language === LANGUAGES.VI && (
                                    <NumberFormat
                                        value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                        className="currency"
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        suffix={"VND"}
                                    />
                                )}
                                {dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceTypeData && language === LANGUAGES.EN && (
                                    <NumberFormat
                                        value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                        className="currency"
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        suffix={"USD"}
                                    />
                                )}
                            </div>
                        }

                    </div>
                </div>


            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor));