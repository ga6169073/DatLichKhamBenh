import React, { Component } from "react";
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/bookingforhealth.png';
import { FormattedMessage } from "react-intl";
import { LANGUAGES, languages } from "../../utils";

import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
class HomeHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    changesLanguage = (language) => {
        this.props.changesLanguageAppRedux(language)
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }

    }
    render() {
        let language = this.props.language;
        // console.log("check props homeheader", this.props)
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <div><i className="fas fa-bars"></i></div> 
                            <div onClick={() => this.returnToHome()}> <img className="header-logo" src={logo}  alt="logo"></img></div>
                        </div>
                        <div className="center-content">
                            {/* <div className="child-content">
                                <div><b> <FormattedMessage id="homeheader.specialty" /></b></div>
                                <div className="subs-title"><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className="subs-title"><FormattedMessage id="homeheader.select-room" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className="subs-title"><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className="subs-title"><FormattedMessage id="homeheader.check-health" /></div>
                            </div> */}
                        </div>
                        <div className="right-content">
                            <div className="support"><i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeheader.support" />
                            </div>
                            {/* <div className={language === LANGUAGES.VI ?
                                'language-vi active' : 'language-vi'}>
                                <span onClick={() => this.changesLanguage(LANGUAGES.VI)}>
                                    VIE</span></div>
                            <div className={language === LANGUAGES.EN ?
                                'language-en active' : 'language-en'}>
                                <span onClick={() => this.changesLanguage(LANGUAGES.EN)}>
                                    ENG</span></div> */}
                        </div>
                    </div>
                </div >
                {
                    this.props.isShowBanner === true &&
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1"><FormattedMessage id="banner.title1" /></div>
                            <div className="title2"><FormattedMessage id="banner.title2" /></div>
                            {/* <div className="search">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder="Tìm chuyên khoa khám bệnh"></input>
                            </div> */}
                        </div>
                        <div className="content-down">
                            
                        </div>
                    </div>
                }
            </React.Fragment >
        )
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changesLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));