import React from "react"
import styled from 'styled-components';
import RectangularButton from "./RectangularButton";
import SocialMediaImage from './SocialMediaImage';

import './global.css'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--sunrise-grey);
  height: inherit;
  padding-top: 35px;
  padding-bottom: 35px;
  align-items: center;
`;

const SocialLinksLabel = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  text-transform: uppercase;
  color: white;
  letter-spacing: 0.14em;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const SocialMediaContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageCircle = styled.div`
  display:flex;
  width: 36px;
  height: 36px;
  background-color: white;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  margin-right: 5px;
`;

const ImageStyle = styled.div`
  width: 17px;
  height: 17px;
`;

function FooterSocialLinks(props) {
  const {socialMediaMap} = props;
  if (socialMediaMap.keys().size === 0) {
    return null;
  }

  const socialMediaComponents = [];
  const socialMediaImages = SocialMediaImage();

  for (const [socialMediaType, link] of socialMediaMap.entries()) {
    socialMediaComponents.push(
      <a href={link}>
        <ImageCircle 
          key={socialMediaType}>
          <ImageStyle>
            {socialMediaImages[socialMediaType]}
          </ImageStyle>
        </ImageCircle>
      </a>
    );
  }

  return (
    <>
      <SocialLinksLabel>Sunrise Social Links</SocialLinksLabel> {/* TO-DO: use info from config to create label*/}
      <SocialMediaContainer>{socialMediaComponents}</SocialMediaContainer>
    </>
  )
}

function SunriseFooter(props) {
  return <Container>
    <RectangularButton label="Donate to Sunrise" /> {/* TO-DO: use info from config to create label */}
    <FooterSocialLinks {...props} />
  </Container>
}

export default SunriseFooter;