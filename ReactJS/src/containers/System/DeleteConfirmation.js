import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
class DeleteConfirmation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }

    }

    componentDidMount() {
    }

    componentDidUpdate() {
        try {
            this.setState({
                user: this.props.user
            })
        } catch (e) {
            console.log(e)
        }
    }
    co

    toggle = () => {
        this.props.toggleDeleteModalFromParent();
    }

    handleDeleteUser = () => {
        this.props.deleteUser(this.props.user.id);
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}>
                <ModalHeader closebutton="true">
                    Delete Confirmation
                </ModalHeader>
                <ModalBody><div className="alert alert-danger">Confirm delete user with email: {this.props.user.email}?</div></ModalBody>
                <ModalFooter>
                    <Button variant="default" onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => this.handleDeleteUser()}>
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>
        )

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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmation);
