import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './ManageClinic.scss'
import MarkdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite'
import { CommonUtils, CRUD_ACTIONS } from "../../../utils";
import { createClinic, getAllClinic, editClinic, deleteClinic } from '../../../services/userService'
import { toast } from 'react-toastify'

import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css'
const mdParser = new MarkdownIt();
class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {

            listClinic: [],

            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

            previewImgURL: '',
            isOpen: false,
            action: '',
            clinicEditId: ''
        };
    }
    async componentDidMount() {
        this.getClinic()
    }
    getClinic = async () => {
        let res = await getAllClinic()
        // console.log(res)
        if (res && res.errCode === 0) {
            this.setState({
                listClinic: res.data
            })
        }
        // console.log(this.state.listClinic)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.listClinic !== prevProps.listClinic) {
            this.setState({
                listClinic: [],

                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',

                previewImgURL: '',
                isOpen: false,
                action: CRUD_ACTIONS.CREATE,
                clinicEditId: ''
            })
        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file);
            // console.log(objectUrl)
            this.setState({
                previewImgURL: objectUrl,
                imageBase64: base64
            })
        }
    }
    handleEditClinic = (data) => {
        this.setState({
            name: data.name,
            imageBase64: data.image,
            address: data.address,
            descriptionHTML: data.descriptionHTML,
            descriptionMarkdown: data.descriptionMarkdown,
            previewImgURL: data.image,
            action: CRUD_ACTIONS.EDIT,
            clinicEditId: data.id
        })
    }
    handleDeleteClinic = async (data) => {
        let res = await deleteClinic(data.id)
        if (res && res.errCode === 0) {
            toast.success('Delete clinic succeed')
            this.setState({
                name: '',
                imageBase64: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                previewImgURL: '',
                action: CRUD_ACTIONS.CREATE,
                clinicEditId: ''
            })

        } else {
            toast.error('Error deleteClinic')
            console.log(res)
        }
        this.getClinic()
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleSaveNewClinic = async () => {
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            let res = await createClinic(this.state)
            if (res && res.errCode === 0) {
                toast.success('Add clinic succeed')
                this.setState({
                    name: '',
                    imageBase64: '',
                    address: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    previewImgURL: '',
                    action: CRUD_ACTIONS.CREATE,
                    clinicEditId: ''
                })
            } else {
                toast.error('Error saveNewClinic')
                console.log(res)
            }
        }
        if (action === CRUD_ACTIONS.EDIT) {
            // console.log("edit",  this.state)
            let res = await editClinic({
                id: this.state.clinicEditId,
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                address: this.state.address,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })
            if (res && res.errCode === 0) {
                toast.success('Edit clinic succeed')
                this.setState({
                    name: '',
                    imageBase64: '',
                    address: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    previewImgURL: '',
                    action: CRUD_ACTIONS.CREATE,
                    clinicEditId: ''
                })
            } else {
                toast.error('Error editClinic')
                console.log(res)
            }
        }
        this.getClinic()
    }
    render() {

        let listClinic = this.state.listClinic
        return (
            <div className="manage-clinic-container">
                <div className="manage-clinic-tilte">Quản lý phòng khám</div>
                <div className="add-clinic row">
                    <div className="col-6 form-group">
                        <label>Tên phòng khám</label>
                        <input className="form-control" type="text" value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')} />
                    </div>
                    <div className="col-6 form-group">
                        <label>Địa chỉ</label>
                        <input className="form-control" type="text" value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh phòng khám</label>
                        <input className="form-control-file" type="file"
                            onChange={(event) => this.handleOnChangeImage(event)} />


                        <div className="preview-image"
                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                            onClick={() => this.openPreviewImage()}
                        ></div>
                    </div>

                    <div className="col-12">
                        <MdEditor
                            value={this.state.descriptionMarkdown}
                            style={{ height: "500px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}

                        />
                    </div>
                    <div className="col-12">
                        <button className="btn-save-clinic"
                            onClick={() => this.handleSaveNewClinic()}
                        >Lưu phòng khám</button>
                    </div>

                </div>

                <table id="TableManageClinic">
                    <tbody>
                        <tr>
                            <th>STT</th>
                            <th>Tên phòng khám</th>
                            <th>Địa chỉ</th>
                            {/* <th>Ảnh</th> */}
                            <th>Actions</th>
                        </tr>
                        {listClinic && listClinic.length > 0 &&
                            listClinic.map((item, index) => {
                                return (
                                    <tr key={{ index }}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        {/* <td><div style={{backgroundImage: `url(${item.image})`, height: '200px', width: '300px', objectFit: 'cover'}}></div></td> */}
                                        <td>
                                            <button onClick={() => this.handleEditClinic(item)}
                                                className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                                            <button onClick={() => this.handleDeleteClinic(item)}
                                                className="btn-delete"><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />}
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);