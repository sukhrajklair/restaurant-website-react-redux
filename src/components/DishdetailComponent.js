import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

function renderDish(dish){
    if (dish != null){
      return(
        <Card>
          <CardImg top width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>);}
    else{
        return (<div></div>);
    }
  }

function  renderComments(comments){
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
          <div key={comment.id}>
            <p>{comment.comment}</p>
            <p>-- {comment.author}, {styledDate}</p>
          </div>
        );
      }
    );
    return(
      <div>
        <h3>Comments</h3>
        <div>{styledComments}</div>
      </div>
    );
  } else {
        return (<div></div>);
      }
  }

const Dishdetail=  (props)=> {
    const dish = props.dish;
    const comments = props.comments;
    return(
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {renderDish(dish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            {renderComments(comments)}
          </div>
        </div>
      </div>
    );
  }

export default Dishdetail;
