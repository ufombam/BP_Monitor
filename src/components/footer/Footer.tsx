import React from 'react';
import './Footer.css';
import logo from '../../assets/logo/heartsign.png';
import { Stack, Typography } from '@mui/material';
import { Twitter, Instagram, LinkedIn, Google, FacebookRounded } from '@mui/icons-material';

const Footer: React.FC<{}> = () => {
    return (
    <div className='fm1-body'>
        <div className='footer'>
        <div className='footer_social'>
          <div className='footer_logo'>
            <img src={logo} height={"80px"} alt="vester-logo" />
          </div>
          <div><p>"Love Your Heart: Keep it Strong, Keep it Healthy!"</p></div>
          <div className='footer_social_buttons'>
            <Typography>
              <FacebookRounded />
            </Typography>
            <Typography>
              <Twitter />
            </Typography>
            <Typography>
              <Instagram />
            </Typography>
            <Typography>
              <LinkedIn />
            </Typography>
            <Typography>
              <Google />
            </Typography>
          </div>
        </div>
        <div className='footer_link'>
          <h4>Company</h4>
          <ul>
            <li>About us</li>
            <li>Services</li>
            <li>Community</li>
            <li>Testimonial</li>
          </ul>
        </div>
        <div className='footer_link'>
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Tweet @ us </li>
            <li>Training</li>
            <li>Feedback</li>
          </ul>
        </div>
        <div className='footer_link'>
          <h4>Links</h4>
          <ul>
            <li>Courses</li>
            <li>Become a Teacher</li>
            <li>Services</li>
            <li>All in One</li>
          </ul>
        </div>
        <div className='footer_contact'>
          <h4>Contact</h4>
            <ul>
              <li>
                <Stack direction={'row'}>
                  <span className="material-icons mauve">phone</span>
                  <p>(+234) 913 777 2714 </p>
                </Stack>
              </li>
              <li>
                <Stack direction={'row'}>
                  <span className="material-icons mauve">face</span>
                  <p>powerlane22@gmail.com</p>
                </Stack>
              </li>
            </ul>
        </div>
        </div>
    </div>
    );
};

export default Footer;