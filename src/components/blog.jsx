import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Header from './Header';
import '../css/education.css';

function Education(props) {
  const { header } = props;
  const [width, setWidth] = useState('50vw');

  useEffect(() => {
    fetch(endpoints.education, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res); // For debugging purposes
      })
      .catch((err) => console.error(err)); // Log errors to the console

    if (window?.innerWidth < 576) {
      setWidth('90vw');
    } else if (window?.innerWidth >= 576 && window?.innerWidth < 768) {
      setWidth('90vw');
    } else if (window?.innerWidth >= 768 && window?.innerWidth < 1024) {
      setWidth('75vw');
    } else {
      setWidth('50vw');
    }
  }, []);

  return (
    <>
      <Header title={header} />
      <Fade>
        <div style={{ width }} className="section-content-container">
          <Container>
            <div
              style={{
                display: 'flex',
                alignItems: 'center', // Ensures both items align on the same horizontal line
                margin: '-350px 20px 0 -300px',
                padding: 0,
              }}
            >
              {/* Left Side: Year and Month */}
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
                <p style={{ fontSize: '2.3rem', margin: 0 }}>2024</p>
                <p style={{ fontSize: '2rem', display: 'flex', marginRight: '20px' }}>Aug </p>
              </div>

              {/* Right Side: Title and Description */}
              <div style={{ textAlign: 'left' }}>
                <p
                  style={{
                    fontSize: '1.5rem',
                    margin: 0,
                    marginTop: '180px', // Add margin to push the title down
                  }}
                >
                  <a
                    href="https://example.com/blog" // Replace with your desired link
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#007bff', textDecoration: 'none' }}
                  >
                    Title of Blog
                  </a>
                </p>
                <p style={{ fontSize: '1rem', marginTop: '10px' }}>
                  {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt id magna a consequat. 
                  Aliquam in ex non justo mollis porta. Duis nisi augue, pretium non justo vel, tristique vulputate lacus. 
                  Pellentesque diam erat, luctus non eros vel, rutrum gravida tortor. Quisque venenatis aliquam magna, 
                  id mollis leo imperdiet in. Nullam eget porta dolor, id finibus libero. Pellentesque habitant morbi tristique senectus et 
                  netus et malesuada fames ac turpis egestas.`}
                </p>
              </div>
            </div>
          </Container>
        </div>
      </Fade>
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
