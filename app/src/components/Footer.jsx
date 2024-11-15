import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FooterContainer, FooterContent, FooterSection, Copyright, SocialIcons } from './styles'

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <p id="footer-title">Reserveasy</p >
          <a id="footer-link" href="#">About Us</a>
          <a id="footer-link" href="#">Our Team</a>
          <a id="footer-link" href="#">Contact</a>
        </FooterSection>
        <FooterSection>
          <p id="footer-title">For Restaurants</p>
          <a id="footer-link" href="#">Partner with Us</a>
          <a id="footer-link" href="#">Restaurant Dashboard</a>
          <a id="footer-link" href="#">Marketing Tools</a>
        </FooterSection>
        <FooterSection>
          <p id="footer-title">For Diners</p>
          <a id="footer-link" href="#">Find Restaurants</a>
          <a id="footer-link" href="#">Book a Table</a>
          <a id="footer-link" href="#">Gift Card</a>
        </FooterSection>
        <FooterSection>
          <p id="footer-title">Connect with Us</p>
          <SocialIcons>
            <div className="social-icon"><FaFacebookF /></div>
            <div className="social-icon"><FaTwitter /></div>
            <div className="social-icon"><FaInstagram /></div>
            <div className="social-icon"><FaLinkedinIn /></div>
          </SocialIcons>
        </FooterSection>
      </FooterContent>
      <Copyright>&copy; 2024 Reserveasy. All rights reserved.</Copyright>
    </FooterContainer>
  )
}

export default Footer
