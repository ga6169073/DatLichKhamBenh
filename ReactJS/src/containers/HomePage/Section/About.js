import React, { Component } from "react";
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói gì ?
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="400"
                            src="https://www.youtube.com/embed/FyDQljKtWnI"
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>
                    </div>
                    <div className="content-right">
                        <p>
                            Quis amet mollit qui ea aliqua officia adipisicing labore veniam reprehenderit aute. Et aliquip ullamco magna ipsum tempor aliqua enim id. Qui qui aliqua sit sunt ex dolore eiusmod ea consequat fugiat occaecat. Lorem anim labore excepteur mollit occaecat irure deserunt culpa elit do veniam exercitation. Do duis in proident commodo ad culpa sunt.
                        </p>
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
}

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);