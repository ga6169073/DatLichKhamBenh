import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from "../../utils/emitter";
import DeleteConfirmation from './DeleteConfirmation';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isDeleteModal: false,
            deleteUser: '',
            isOpenModalEditUser: false,
            userEdit: ''
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    handleDeleteUser = (user) => {
        this.setState({
            isDeleteModal: true,
            deleteUser: user
        })
    }
    toggleDeleteModal = () => {
        this.setState({
            isDeleteModal: !this.state.isDeleteModal,
        })
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                // emitter.emit('EVENT_CLEAR_MODAL_DATA',{'id':'your_id'}) (truyen data)
                emitter.emit('EVENT_CLEAR_MODAL_DATA')

            }
            console.log('response create', response)
        } catch (e) {
            console.log(e)
        }
    }

    deleteUser = async (userId) => {
        try {
            let response = await deleteUserService(userId);
            if (response && response.errCode === 0) {
                await this.getAllUsersFromReact();
                this.setState({
                    isDeleteModal: false
                })
            } else {
                alert(response.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }

    editUser = async (data) => {
        try {
            let response = await editUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalEditUser: false
                })
                // // emitter.emit('EVENT_CLEAR_MODAL_DATA',{'id':'your_id'}) (truyen data)
                // emitter.emit('EVENT_CLEAR_MODAL_DATA')

            }
            console.log('response edit', response)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        // console.log('check render', this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className='users-container'>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleUserModalFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleUserEditModalFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.editUser}
                    />
                }
                <DeleteConfirmation
                    isOpen={this.state.isDeleteModal}
                    toggleDeleteModalFromParent={this.toggleDeleteModal}
                    deleteUser={this.deleteUser}
                    user={this.state.deleteUser}
                />
                <div className="title text-center">Manage users</div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    ><i className='fas fa-plus'></i>Add new user</button>
                </div>

                <div className='users-table mt-3 mx-1'>
                    <table id='customers'>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>


                            {arrUsers && arrUsers.map((item, index) => {
                                // console.log('check map', item, index)
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'><i className='fas fa-pencil-alt' onClick={() => this.handleEditUser(item)}></i></button>
                                            <button className='btn-delete'><i className='fas fa-trash' onClick={() => this.handleDeleteUser(item)}></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
