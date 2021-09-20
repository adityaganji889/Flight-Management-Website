import React from 'react';
import Header from './header';
import Footer from './footer';
import Dashboard from '../../dashboard/dashboard';
import {Route} from 'react-router-dom'; 
import ProtectedRoute from '../ProtectedRoute';
import {connect} from 'react-redux';
import { Suspense, lazy } from 'react';
import { FlightBoardingPass } from '../../flight/components/flightBoardingPass';
const Layout  = (props) => {
    const FlightCheckIn = lazy(() => import('../../flight/containers/flightCheckIn'));
    const FlightInServices = lazy(() => import('../../flight/containers/flightInServices'));
    const FlightSeatAllocation = lazy(() => import('../../flight/containers/flightSeatAllocation'));
    // const FlightBoardingPass = lazy(() => import('../../flight/components/flightBoardingPass'));
    const FlightAncilliaryServices = lazy(() => import('../../flight/containers/flightAncilliaryServices'));
    const AdminLandingPage = lazy(() => import('../../admin/containers/admin-landing-page'));
    const AdminFlights = lazy(() => import('../../admin/components/admin-flights'));
    const AdminPassengers = lazy(() => import('../../admin/containers/admin-passengers'));
    const AdminPassengerUpdateForm = lazy(() => import('../../admin/containers/admin-passenger-update-form'));
    const AdminFlightAncilliaryServices = lazy(() => import('../../admin/containers/admin-flight-ancilliary-services'));
    const AdminPassengerAddForm = lazy(() => import('../../admin/components/admin-passenger-add-form'));
    let isLoggedIn = (props.userData.isLoggedIn)? props.userData.isLoggedIn: null;
    return (
        <div>
        <Header />
        <div>   
         <Route exact path="/" component = {Dashboard} />
         <Suspense fallback={<h1>Still Loading…</h1>}>
         <ProtectedRoute isLoggedIn = {isLoggedIn}  path="/flight" component = {FlightCheckIn} />     
         <ProtectedRoute isLoggedIn = {isLoggedIn} path="/flight/inflight" component = {FlightInServices} />
         <ProtectedRoute isLoggedIn = {isLoggedIn} path="/flight/seatallocation" component = {FlightSeatAllocation} />
         <ProtectedRoute isLoggedIn = {isLoggedIn} path="/flight/confirmation" component = {FlightBoardingPass} /> 
         <ProtectedRoute isLoggedIn = {isLoggedIn} path="/flight/ancilliary" component = {FlightAncilliaryServices} /> 
         <ProtectedRoute isLoggedIn = {isLoggedIn} path="/admin" component = {AdminLandingPage} /> 
         <ProtectedRoute isLoggedIn = {isLoggedIn} path="/admin/flights" component = {AdminFlights} /> 
         <ProtectedRoute isLoggedIn = {isLoggedIn} path="/admin/passengers" component = {AdminPassengers} /> 
         <ProtectedRoute isLoggedIn = {isLoggedIn} path="/admin/update" component = {AdminPassengerUpdateForm} /> 
         <ProtectedRoute isLoggedIn = {isLoggedIn} path="/admin/flightancilliary" component = {AdminFlightAncilliaryServices} /> 
         <ProtectedRoute isLoggedIn = {isLoggedIn} path="/admin/add" component = {AdminPassengerAddForm} /> 
         </Suspense>
    </div>
        <Footer />
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth
    };
}
export default connect(mapStateToProps)(Layout);
