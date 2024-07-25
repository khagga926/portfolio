import meterwebdev from '../assets/img/meterwebdev.png'
import meteruiux from '../assets/img/meteruiux.png'
import meterfrontend from '../assets/img/meterfrontend.png'
import meterbackend from '../assets/img/meterbackend.png'
import meterdatabase from '../assets/img/meterdatabase.png'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import colorSharp from '../assets/img/color-sharp.png'

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Skills</h2>
              <p>
                Proficient in a range of modern web technologies, I bring a
                blend of technical expertise and creative problem-solving to
                every project. My strengths include both front-end and back-end
                development, ensuring seamless and efficient solutions.
              </p>
              <Carousel
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme skill-slider"
              >
                <div className="item">
                  <img src={meterwebdev} alt="Image" />
                  <h5>Web Development</h5>
                </div>
                <div className="item">
                  <img src={meteruiux} alt="Image" />
                  <h5>UI/UX Design</h5>
                </div>
                <div className="item">
                  <img src={meterbackend} alt="Image" />
                  <h5>Back-End Technologies</h5>
                </div>
                <div className="item">
                  <img src={meterfrontend} alt="Image" />
                  <h5>Front-End Technologies</h5>
                </div>
                <div className="item">
                  <img src={meterdatabase} alt="Image" />
                  <h5>Database Management</h5>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
