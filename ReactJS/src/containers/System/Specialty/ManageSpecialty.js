import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './ManageSpecialty.scss'
import MarkdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite'
import { CommonUtils, CRUD_ACTIONS } from "../../../utils";
import { createSpecialty, getAllSpecialty, deleteSpecialty, editSpecialty } from '../../../services/userService'
import { toast } from 'react-toastify'
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css'
const mdParser = new MarkdownIt();
class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSpecialty: [],

            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

            previewImgURL: '',
            isOpen: false,
            action: '',
            specialtyEditId: ''
        };
    }
    async componentDidMount() {
        this.getSpecialty()
    }
    getSpecialty = async () => {
        let res = await getAllSpecialty()
        // console.log(res)
        if (res && res.errCode === 0) {
            this.setState({
                listSpecialty: res.data
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.listSpecialty !== prevProps.listSpecialty) {
            this.setState({
                listSpecialty: [],

                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',

                previewImgURL: '',
                isOpen: false,
                action: CRUD_ACTIONS.CREATE,
                specialtyEditId: ''
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

            this.setState({
                previewImgURL: objectUrl,
                imageBase64: base64
            })
        }
    }
    handleEditSpecialty = (data) => {
        this.setState({
            name: data.name,
            imageBase64: data.image,
            descriptionHTML: data.descriptionHTML,
            descriptionMarkdown: data.descriptionMarkdown,
            previewImgURL: data.image,
            action: CRUD_ACTIONS.EDIT,
            specialtyEditId: data.id
        })
    }
    handleDeleteSpecialty = async (data) => {
        let res = await deleteSpecialty(data.id)
        if (res && res.errCode === 0) {
            toast.success('Delete specialty succeed')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                previewImgURL: '',
                action: CRUD_ACTIONS.CREATE,
                specialtyEditId: ''
            })

        } else {
            toast.error('Error deleteSpecialty')
            console.log(res)
        }
        this.getSpecialty()
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleSaveNewSpecialty = async () => {
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            let res = await createSpecialty(this.state)
            if (res && res.errCode === 0) {
                toast.success('Add specialty succeed')
                this.setState({
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    previewImgURL: '',
                    action: CRUD_ACTIONS.CREATE,
                    specialtyEditId: ''
                })
            } else {
                toast.error('Error saveNewSpecialty')
                console.log(res)
            }
        }
        if (action === CRUD_ACTIONS.EDIT) {
            // console.log("edit",  this.state)
            let res = await editSpecialty({
                id: this.state.specialtyEditId,
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })
            if (res && res.errCode === 0) {
                toast.success('Edit specialty succeed')
                this.setState({
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    previewImgURL: '',
                    action: CRUD_ACTIONS.CREATE,
                    specialtyEditId: ''
                })
            } else {
                toast.error('Error editSpecialty')
                console.log(res)
            }
        }
        this.getSpecialty()
    }
    render() {
        let listSpecialty = this.state.listSpecialty
        return (
            <div className="manage-specialty-container">
                <div className="manage-specialty-tilte">
                    <FormattedMessage id="menu.admin.manage-specialty" />
                </div>
                <div className="add-specialty row">
                    <div className="col-6 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.nameSpecialty" /></label>
                        <input className="form-control" type="text" value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')} />
                    </div>
                    <div className="col-6 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.imageSpecialty" /></label>
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
                        <button className="btn-save-specialty"
                            onClick={() => this.handleSaveNewSpecialty()}
                        >Lưu chuyên khoa</button>
                    </div>

                </div>
                <table id="TableManageSpecialty">
                    <tbody>
                        <tr>
                            <th>STT</th>
                            <th>Tên phòng khám</th>
                            {/* <th>Ảnh</th> */}
                            <th>Actions</th>
                        </tr>
                        {listSpecialty && listSpecialty.length > 0 &&
                            listSpecialty.map((item, index) => {
                                return (
                                    <tr key={{ index }}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        {/* <td><div style={{backgroundImage: `url(${item.image})`, height: '200px', width: '300px', objectFit: 'cover'}}></div></td> */}
                                        <td>
                                            <button onClick={() => this.handleEditSpecialty(item)}
                                                className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                                            <button onClick={() => this.handleDeleteSpecialty(item)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);