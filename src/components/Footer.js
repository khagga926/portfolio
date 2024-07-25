import { Container, Row, Col } from 'react-bootstrap'
//import { MailchimpForm } from './Mailchimpform'
//import logo from '../assets/img/logo.svg'
import navIcon1 from '../assets/img/nav-icon1.svg'
import navIcon2 from '../assets/img/nav-icon2.svg'
import navIcon4 from '../assets/img/nav-icon4.svg'

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          {/* <MailchimpForm /> */}
          <Col size={12} sm={6}>
            {/* <img src={logo} alt="Logo" />*/}
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a
                href="https://www.linkedin.com/in/khagga926"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={navIcon1} alt="LinkedIn" />
              </a>
              <a
                href="https://github.com/khagga926"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={navIcon2} alt="Github" />
              </a>
              <a
                href="https://x.com/khagga926"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={navIcon4} alt="X" />
              </a>
            </div>
            <p>Copyright 2024. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
