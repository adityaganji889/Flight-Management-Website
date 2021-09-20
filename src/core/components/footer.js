import React from 'react';
import './footer.scss'
const Footer = () => {
    return(
        <footer className="flex-rw">
  
        <ul className="footer-list-top">
          <li>
            <h4 className="footer-list-header">About MyFlight</h4></li>
          <li className="generic-anchor footer-list-anchor">GET TO KNOW US</li>
          <li className="generic-anchor footer-list-anchor">JOB OPENINGS </li>
        </ul>
        <ul className="footer-list-top">
          <li id='help'>
            <h4 className="footer-list-header">Please Help Me</h4></li>
          <li className="generic-anchor footer-list-anchor">CONTACT</li>
          <li className="generic-anchor footer-list-anchor">FAQ</li>
        </ul>
        <section className="footer-bottom-section flex-rw">
      <div className="footer-bottom-wrapper">   
      <i className="fa fa-copyright">
       
      </i> 2021 MyFlight in <address className="footer-address">Mumbai, MH</address><span className="footer-bottom-rights"> - All Rights Reserved - </span>
          </div>
          <div className="footer-bottom-wrapper">
          <a href="/terms-of-use.html" className="generic-anchor" rel="nofollow">Terms</a> | <a href="/privacy-policy.html" className="generic-anchor" rel="nofollow">Privacy</a>
            </div>
        </section>
      </footer>
    )
}
export default Footer;