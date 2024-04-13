import React, { Component } from "react";
import { connect } from "react-redux"
import moment from "moment";
import './DetailDoctor.scss'
import { LANGUAGES } from "../../../../utils";
import localization from 'moment/locale/vi'
import { getScheduleDoctorByDate } from '../../../../services/userService'
import { dispatch } from "../../../../redux";
import { FormattedMessage } from "react-intl";
import BookingModal from './Modal/BookingModal'

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language)
        if(this.props.doctorIdFromParent){
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
        this.setState({
            allDays: allDays
        })
    }
    getArrDays = (language) => {
        let allDays = []
        const currentDate = moment(new Date())
        const dateFormat =
            language === LANGUAGES.VI ? "dddd - DD/MM" : "ddd - DD/MM"
        const todayLabel = language === LANGUAGES.VI ? "Hôm nay - " : "Today - "

        for (let i = 0; i < 7; i++) {
            let object = {}
            let date = moment(currentDate).add(i, "days")

            if (i === 0) {
                object.label = todayLabel + date.format("DD/MM")
            } else {
                object.label = this.capitalizeFirstLetter(
                    date
                        .locale(language === LANGUAGES.VI ? "vi" : "en")
                        .format(dateFormat)
                )
            }
            object.value = date.startOf("day").valueOf()
            allDays.push(object)
        }

        return allDays
    }
    componentDidUpdate(prevProps, pervState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.getArrDays(this.props.language)
        }
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    }
    handleClickScheduleTime = (time) => {
        console.log(time)
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }
    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }
    render() {
        let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state
        let { language } = this.props
        console.log(allAvailableTime)
        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={(event) => this.handleOnChangeSelect(event)} >
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>
                                            {item.label}
                                        </option>
                                    )
                                })}
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calendar">
                            <span>
                                <i className="fas fa-calendar-alt"><span><FormattedMessage id="patient.detail-doctor.schedule" /></span></i>

                            </span>
                        </div>
                        <div className="time-content">
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className="time-content-btns">
                                        {allAvailableTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGES.VI ?
                                                item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                            return (
                                                <button key={index} className={language === LANGUAGES.VI ? "btn-vi" : "btn-en"}
                                                onClick={()=> this.handleClickScheduleTime(item)}>
                                                    {timeDisplay}
                                                </button>)

                                        })}
                                        {/* <div>Chon thoi gian khac</div> */}
                                    </div>
                                    <div className="book-free">
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />
                                            <i className="far fa-hand-point-up"></i>
                                            <FormattedMessage id="patient.detail-doctor.book-free" />
                                        </span>
                                    </div>
                                </>
                                :
                                <div className="no-schedule">
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal isOpenModal = {isOpenModalBooking}
                closeBookingModal = {this.closeBookingModal}
                dataTime = {dataScheduleTimeModal}
                />
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)

