import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, Button, CardTitle} from 'reactstrap';
import {Modal, ModalHeader, ModalBody, Label, Row, Col} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

function RenderDish(props){
  if (props.isLoading) {
    return(
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
    );
  }
  else if (props.errMess) {
    return(
        <div className="container">
          <div className="row">
            <h4>{props.errMess}</h4>
          </div>
        </div>
    );
  }
  else if (props.dish != null){
    return(
      <FadeTransform in
        transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
        <Card>
          <CardImg top width="100%" src={baseUrl+props.dish.image} alt={props.dish.name} />
          <CardBody>
            <CardTitle>{props.dish.name}</CardTitle>
            <CardText>{props.dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );}
  else{
    return (<div></div>);
  }
}

function  RenderComments({comments}){
    const monthNames=[
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
    if (comments!=null){
      const styledComments= comments.map((comment)=>{
        const date=new Date(comment.date);
        const styledDate= monthNames[date.getMonth()]+ ' ' +date.getDate()+', '+ date.getFullYear();
        return (
          <Fade in>
            <div key={comment.id}>
              <dd>{comment.comment}</dd>
              <dd>-- {comment.author}, {styledDate}</dd>
            </div>
          </Fade>
        );
      }
    );
    return(
      <div>
        <h3>Comments</h3>
        <div>
          <Stagger in>
            {styledComments}
          </Stagger>
        </div>
      </div>
    );
  } else {
        return (<div></div>);
      }
  }
class CommentForm extends Component{

  handleSubmit(values) {
        this.props.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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

class Dishdetail extends Component{
  constructor(props){
    super(props);
    this.state={
      isModalOpen : false,
    }
    this.toggleModal=this.toggleModal.bind(this)
    console.log(this.props.dish);
  }

  toggleModal(){
    this.setState({
      isModalOpen:!this.state.isModalOpen
    })
  }

  render(){
    const dish = this.props.dish;
    const comments = this.props.comments;

    return(
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments = {comments} />
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
          </div>
        </div>
        <CommentForm dishId={dish.id} postComment = {this.props.postComment} isModalOpen={this.state.isModalOpen} toggleModal={this.toggleModal} />
      </div>
    );
  }
}

export default Dishdetail;
