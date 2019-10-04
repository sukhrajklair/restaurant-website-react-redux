import React from 'react';
import Home from './HomeComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import ContactPage from './ContactComponent';
import AboutUs from './AboutComponent';
import Dishdetail from './DishdetailComponent'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as appActions from '../redux/ActionCreators';
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import { actions } from 'react-redux-form';

class Main extends React.Component{
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    console.log(this.props);
  }

  render(){
    const HomePage = () => {
      return(
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
        />
      );
    };
    const DishWithId = ({match}) => {
      return(
          <Dishdetail
            dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            promosErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
          />
      );
    };

    const AboutUsPage =() => {
      return(
        <AboutUs
          leaders={this.props.leaders.leaders}
          isLoading={this.props.leaders.isLoading}
          errMess={this.props.leaders.errMess}
        />
      );
   }

   const Contact=()=>{
     return(
       <ContactPage
          resetFeedbackForm={this.props.reset}
          postFeedback={this.props.postFeedback}
          test = 'test'
        />
     );
   }
    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route path="/aboutus" component = {AboutUsPage} />
              <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes} />} />
              <Route path="/contactus" component = {Contact} />
              <Route path="/menu/:dishId" component = {DishWithId} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state=>{
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}


export default withRouter(connect(mapStateToProps,{...appActions, ...actions})(Main));
