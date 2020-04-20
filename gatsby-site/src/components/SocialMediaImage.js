import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const SocialMediaImage = () => {
  const data = useStaticQuery(graphql`
    query {
      instagram: file(relativePath: { eq: "instagram.png" }) {
        childImageSharp {
          fluid(maxWidth: 100, quality: 100) {
              ...GatsbyImageSharpFluid
          }
        }
      }
      email: file(relativePath: { eq: "email.png" }) {
        childImageSharp {
          fluid(maxWidth: 100, quality: 100) {
              ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return {
    'instagram': <Img fluid={data.instagram.childImageSharp.fluid} />,
    'email': <Img fluid={data.email.childImageSharp.fluid} />
  };
}

export default SocialMediaImage
