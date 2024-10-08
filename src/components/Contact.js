import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import contactImg from '../assets/img/contact-img.svg'

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  }

  const [formDetails, setFormDetails] = useState(formInitialDetails)
  const [buttonText, setButtonText] = useState('Send')
  const [status, setStatus] = useState({})

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formDetails.firstName ||
      !formDetails.lastName ||
      !formDetails.email ||
      !formDetails.phone ||
      formDetails.message.length < 30
    ) {
      setStatus({
        success: false,
        message:
          'Please fill in all fields and ensure the message is at least 30 characters long.',
      })
      return
    }

    setButtonText('Sending...')
    try {
      console.log('Sending request to server with form details:', formDetails)
      let response = await fetch(
        'https://personal-portfolio-7de0e26d81f4.herokuapp.com/contact',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          body: JSON.stringify(formDetails),
        },
      )

      console.log('Server response:', response)
      let result = await response.json()
      console.log('Response JSON:', result)

      setFormDetails(formInitialDetails)
      setButtonText('Send')

      if (response.ok) {
        setStatus({
          success: true,
          message: 'Message sent successfully. Thank you for contacting us!',
        })
      } else {
        setStatus({
          success: false,
          message: 'Something went wrong, please try again later.',
        })
      }
    } catch (error) {
      console.error('Error sending request:', error)
      setStatus({
        success: false,
        message: 'Network error. Please try again later.',
      })
      setButtonText('Send')
    }
  }

  return (
    <section className="contact" id="contact">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <img src={contactImg} alt="Contact Us" />
          </Col>
          <Col md={6}>
            <h2>Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col size={12} sm={6} className="px-1">
                  <input
                    type="text"
                    value={formDetails.firstName}
                    placeholder="First Name"
                    onChange={(e) => onFormUpdate('firstName', e.target.value)}
                  />
                </Col>
                <Col size={12} sm={6} className="px-1">
                  <input
                    type="text"
                    value={formDetails.lastName}
                    placeholder="Last Name"
                    onChange={(e) => onFormUpdate('lastName', e.target.value)}
                  />
                </Col>
                <Col size={12} sm={6} className="px-1">
                  <input
                    type="email"
                    value={formDetails.email}
                    placeholder="Email Address"
                    onChange={(e) => onFormUpdate('email', e.target.value)}
                  />
                </Col>
                <Col size={12} sm={6} className="px-1">
                  <input
                    type="tel"
                    value={formDetails.phone}
                    placeholder="Phone No."
                    onChange={(e) => onFormUpdate('phone', e.target.value)}
                  />
                </Col>
                <Col size={12} className="px-1">
                  <textarea
                    rows="6"
                    value={formDetails.message}
                    placeholder="Message"
                    onChange={(e) => onFormUpdate('message', e.target.value)}
                  ></textarea>
                  <button type="submit">
                    <span>{buttonText}</span>
                  </button>
                  {status.message && (
                    <p
                      className={`status-message ${status.success ? 'success' : 'danger'}`}
                    >
                      {status.message}
                    </p>
                  )}
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
