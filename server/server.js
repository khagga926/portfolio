const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const path = require('path')
require('dotenv').config() // Load environment variables from .env file

const app = express()
const router = express.Router()

// Middleware setup
app.use(cors()) // Enable CORS
app.use(express.json()) // Parse JSON bodies

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build'))) // Adjusted path

// Nodemailer setup using environment variables
const contactEmail = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_ADDRESS, // Updated to use environment variable
    pass: process.env.EMAIL_PASS, // Updated to use environment variable
  },
})

// Verify transporter configuration
contactEmail.verify((error) => {
  if (error) {
    console.log('Error setting up Nodemailer:', error)
  } else {
    console.log('Mail server ready to send emails')
  }
})

// Route to handle contact form submissions
router.post('/contact', (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body
  const fullName = `${firstName} ${lastName}`

  // Email configuration
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_ADDRESS,
    subject: `Contact Form Submission - ${fullName}`,
    html: `<p><strong>Name:</strong> ${fullName}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone}</p>
           <p><strong>Message:</strong> ${message}</p>`,
  }

  // Send email
  contactEmail.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error)
      return res.status(500).json({
        status: 'fail',
        message: 'Message not sent. Error occurred.',
        error: error.message,
      })
    }
    console.log('Email sent:', info.response)
    return res.status(200).json({
      status: 'success',
      message: 'Message sent successfully!',
    })
  })
})

// Serve the React app for all other routes
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html')) // Adjusted path
})

app.use('/', router)

// Start the server
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server Running on port ${port}`))
