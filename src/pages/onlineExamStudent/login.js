import React from "React";
import ReactDOM from "ReactDOM";
import cookie from '../../utils/cookie';
import LoginWithSeat from '../../components/LoginWithSeat.jsx';
import LoginWithoutSeat from '../../components/LoginWithoutSeat.jsx';

const SeatEnabledStatus = cookie.get('SeatEnabledStatus') !== 'undefined' ? cookie.get('SeatEnabledStatus') : 'Disabled';

if (SeatEnabledStatus === 'Enabled') {
  ReactDOM.render((
    <LoginWithSeat />
  ), document.getElementById('main'));
} else {
  ReactDOM.render((
    <LoginWithoutSeat />
  ), document.getElementById('main'));
}


