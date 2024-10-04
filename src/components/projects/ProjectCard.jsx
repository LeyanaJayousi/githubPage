import React, { useContext } from 'react';
import { Card, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';

const styles = {
  badgeStyle: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '12px',
    padding: '5px 10px',
    margin: '3px',
    fontWeight: 'bold',
    color: 'white',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    textTransform: 'capitalize',
  },
  logoStyle: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  cardStyle: {
    borderRadius: 8,
    marginBottom: '1rem',
  },
  cardTitleStyle: {
    fontSize: 20,
    fontWeight: 700,
  },
  cardTextStyle: {
    textAlign: 'left',
  },
  githubLogoStyle: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    objectFit: 'contain',
    backgroundColor: 'transparent',
  },
  toolsContainer: {
    marginTop: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
  },
  cardWrapper: {
    marginTop: '4cm',
  },
};

const toolColors = {
  python: '#306998',
  django: '#092E20',
  html: '#E44D26',
  css: '#1572B6',
  bootstrap: '#563D7C',
};

const ProjectCard = (props) => {
  const theme = useContext(ThemeContext);
  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  const { project } = props;

  return (
    <Col>
      <div style={styles.cardWrapper}>
        <Card
          style={{
            ...styles.cardStyle,
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorderColor,
          }}
          text={theme.bsSecondaryVariant}
        >
          <Card.Img variant="top" src={project?.image} />
          <Card.Body>
            <Card.Title style={styles.cardTitleStyle}>{project.title}</Card.Title>
            <Card.Text style={styles.cardTextStyle}>
              {parseBodyText(project.bodyText)}
            </Card.Text>
          </Card.Body>

          <Card.Body>
            {project?.links?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ margin: '0 5px' }}
              >
                <img
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                  alt="GitHub"
                  style={styles.githubLogoStyle}
                />
              </a>
            ))}
          </Card.Body>
          {project.tools && (
            <Card.Body style={styles.toolsContainer}>
              {project.tools.map((tool) => (
                <div
                  key={tool.name}
                  style={{
                    ...styles.badgeStyle,
                    backgroundColor: toolColors[tool.name.toLowerCase()] || '#000000',
                  }}
                >
                  {tool.logo && <img src={tool.logo} alt={tool.name} style={styles.logoStyle} />}
                  {tool.name}
                </div>
              ))}
            </Card.Body>
          )}

          {project.tags && (
            <Card.Footer style={{ backgroundColor: theme.cardFooterBackground }}>
              {project.tags.map((tag) => (
                <div key={tag.name} style={{ ...styles.badgeStyle, backgroundColor: tag.color }}>
                  {tag.logo && <img src={tag.logo} alt={tag.name} style={styles.logoStyle} />}
                  {tag.name}
                </div>
              ))}
            </Card.Footer>
          )}
        </Card>
      </div>
    </Col>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tools: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.string,
    })),
    tags: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.string,
      color: PropTypes.string,
    })),
  }).isRequired,
};

export default ProjectCard;
