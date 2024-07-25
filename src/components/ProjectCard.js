import { Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

export const ProjectCard = ({
  title,
  description,
  imgUrl,
  demoLink,
  sourceLink,
  technologies,
}) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgUrl} alt={title} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
          <div className="proj-links">
            {demoLink && (
              <a href={demoLink} target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt /> Demo
              </a>
            )}
            {sourceLink && (
              <a href={sourceLink} target="_blank" rel="noopener noreferrer">
                <FaGithub /> Source Code
              </a>
            )}
          </div>
          {technologies && technologies.length > 0 && (
            <div className="proj-tech">
              <p>Technologies Used:</p>
              <ul>
                {technologies.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Col>
  )
}

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  demoLink: PropTypes.string,
  sourceLink: PropTypes.string,
  technologies: PropTypes.arrayOf(PropTypes.string), // New prop type
}
