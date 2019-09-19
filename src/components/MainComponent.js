import React from 'react';
import Home from './HomeComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import ContactPage from './ContactComponent';
import {DISHES} from '../shared/dishes'
import Dishdetail from './DishdetailComponent'
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import {Switch, Route, Redirect} from 'react-router-dom';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state={
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  onDishSelect(dishId){
    this.setState({selectedDish:dishId});
  }

  render(){
    const HomePage = () => {
        return(
            <Home
                dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                leader={this.state.leaders.filter((leader) => leader.featured)[0]}
            />
        );
      };
    const DishWithId = ({match}) => {
      return(
        <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes} />} />
          <Route path="/contactus" component = {ContactPage} />
          <Route path="/menu/:dishId" component = {DishWithId} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
