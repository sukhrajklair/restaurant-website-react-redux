import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class Dishdetail extends Component{

  renderDish(dish){
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

  renderComments(dish){
    const monthNames=[
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
    if (dish!=null){
      const comments= dish.comments.map((comment)=>{
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
        <div>{comments}</div>
      </div>
    );
  } else {
        return (<div></div>);
      }
  }

  render(){
    const dish = this.props.dish;
    return(
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(dish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          {this.renderComments(dish)}
        </div>
      </div>
    );
  }
}

export default Dishdetail;
