const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }) // Load environment variables from .env file

// Log environment variables to verify they are loaded correctly
console.log('EMAIL_ADDRESS:', process.env.EMAIL_ADDRESS)
console.log('EMAIL_PASS:', process.env.EMAIL_PASS)

// Check if environment variables are loaded
if (!process.env.EMAIL_ADDRESS || !process.env.EMAIL_PASS) {
  console.error(
    'Error: Missing EMAIL_ADDRESS or EMAIL_PASS in environment variables',
  )
  process.exit(1) // Exit the process with an error code
}

const app = express()
const router = express.Router()

// Middleware setup
app.use(cors()) // Enable CORS
app.use(express.json()) // Parse JSON bodies

// Add logging to verify middleware setup
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`)
  next()
})

// Define the Nodemailer transporter
const contactEmail = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587, // Use port 587 for STARTTLS
  secure: false, // Use STARTTLS
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: 'SSLv3',
  },
})

// Route to handle contact form submissions
router.post('/contact', (req, res) => {
  console.log('Received a POST request to /contact')
  console.log('Request body:', req.body)

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

  // Log mail options to verify configuration
  console.log('Mail options:', mailOptions)

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

// Use the router
app.use('/', router)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build'))) // Adjusted path

// Serve the React app for all other routes
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html')) // Adjusted path
})

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err)
  res
    .status(500)
    .json({ status: 'fail', message: 'Unexpected error occurred.' })
})

// Start the server
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server Running on port ${port}`))
