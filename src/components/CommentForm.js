import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, Label, Row, Col, Button} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

class CommentForm extends Component{
  constructor(props){
    super(props)
  }

  handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
  }

  render(){
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    return (
      <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal}>
        <ModalHeader toggle={this.props.toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className="form-group">
                <Label htmlFor="rating" md={2}>Rating</Label>
                <Col md={10}>
                    <Control.select model=".rating" id="rating" name="rating"
                        className="form-control">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Control.select>
                </Col>
            </Row>
            <Row className="form-group">
               <Label htmlFor="author" md={2}>Your Name</Label>
               <Col md={10}>
                   <Control.text model=".author" id="author" name="author"
                       placeholder="Your Name"
                       className="form-control"
                       validators={{
                           required, minLength: minLength(3), maxLength: maxLength(15)
                       }}
                        />
                   <Errors
                       className="text-danger"
                       model=".author"
                       show="touched"
                       messages={{
                           required: 'Required',
                           minLength: 'Must be greater than 2 characters',
                           maxLength: 'Must be 15 characters or less'
                       }}
                    />
               </Col>
            </Row>
            <Row className="form-group">
               <Label htmlFor="comment" md={2}>Comment</Label>
               <Col md={10}>
                   <Control.textarea model=".comment" id="comment" name="comment"
                       className="form-control"
                       rows="6"
                        />
               </Col>
            </Row>
            <Row className="form-group">
                <Col md={{size:10, offset: 2}}>
                    <Button type="submit" color="primary">
                    Submit
                    </Button>
                </Col>
            </Row>
          </LocalForm>
        </ModalBody>
      </Modal>
    );
  }
}

export default CommentForm;
