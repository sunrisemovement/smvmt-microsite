import React from "react"
import { css } from "styled-components"
import photoPlaceholderPath from "../images/photo-placeholder.svg"
import sunriseLogoPath from "../images/sunrise-logo.png"

const Hero = () => {
  return (
    <section
      css={css`
        position: relative;
        overflow: hidden;
      `}>
      <img
        src={photoPlaceholderPath}
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
          padding: 60px 32px 108px;
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
            src={sunriseLogoPath}
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
          Sunrise Movement PDX
        </h1>
        <a
          href="https://www.sunrisepdx.org"
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
          Visit Sunrise pdx’s full website
        </a>
      </div>
    </section>
  )
}

export default Hero
