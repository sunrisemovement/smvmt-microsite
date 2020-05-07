import React from "react"
import PropTypes from "prop-types"
import { css } from "styled-components"

const Hero = ({ dense, background, hubLogo, hubName, hubWebsite }) => {
  return (
    <section
      css={css`
        position: relative;
        overflow: hidden;
      `}>
      <img
        src={background}
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 1;
        `}
      />
      <div
        css={css`
          position: relative;
          z-index: 2;
          background-color: rgba(0, 0, 0, 0.5);
          padding: ${dense ? "60px 32px 108px" : "190px 32px 354px"};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        `}>
        <div
          css={css`
            width: 82px;
            height: 82px;
            background-color: var(--sunrise-grey);
            border-radius: 50%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
          `}>
          <img
            src={hubLogo}
            css={css`
              width: 32.5%;
            `}
          />
        </div>
        <h1
          css={css`
            font-style: normal;
            font-weight: bold;
            font-size: 48px;
            line-height: 60px;
            text-transform: uppercase;
            color: var(--sunrise-yellow);
            margin: 0;
            margin-bottom: 32px;
          `}>
          Sunrise Movement {hubName}
        </h1>
        <a
          href={hubWebsite}
          css={css`
            font-family: Source Sans Pro;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 20px;
            text-align: center;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--sunrise-gray);
            text-decoration: none;
            height: 68px;
            background-color: var(--sunrise-yellow);
            display: flex;
            align-items: center;
            padding: 0 40px;
          `}>
          Visit Sunrise {hubName}’s full website
        </a>
      </div>
    </section>
  )
}

Hero.propTypes = {
  dense: PropTypes.bool,
  background: PropTypes.string.isRequired,
  hubLogo: PropTypes.string.isRequired,
  hubName: PropTypes.string.isRequired,
  hubWebsite: PropTypes.string.isRequired,
}

Hero.defaultProps = {
  dense: false,
}

export default Hero
