import * as React from "react"
import styled from "styled-components"
import Styles from "./Newsletter.module.css"
import Section from "../components/Section"
import Button from "../components/Button"

const actionNetworkCache = new Map()

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`

const ActionNetwork = ({ actionId, type }) => {
  const container = React.useRef()

  const onInput = React.useCallback(event => {
    const target = event.target
    target.value === ""
      ? target.parentElement.classList.remove("has-value")
      : target.parentElement.classList.add("has-value")
    target.classList.contains("error_input")
      ? target.parentElement.classList.add("has-error")
      : target.parentElement.classList.remove("has-error")
  }, [])

  const onBlur = React.useCallback(event => {
    const target = event.target
    target.classList.contains("error_input")
      ? target.parentElement.classList.add("has-error")
      : target.parentElement.classList.remove("has-error")
  }, [])

  React.useEffect(() => {
    if (!container.current) return
    let inner
    const cacheKey = `${type}-${actionId}`
    if (actionNetworkCache.has(actionId)) {
      inner = actionNetworkCache.get(cacheKey)
      container.current.appendChild(inner)
    } else {
      inner = document.createElement("div")
      inner.innerHTML = `
        <div id="can-${type}-area-${actionId}" style="width: 100%;"></div>
      `
      const script = document.createElement("script")
      script.src = `https://actionnetwork.org/widgets/v3/${type}/${actionId}?format=js&source=widget`
      inner.appendChild(script)
      const styles = document.createElement("link")
      styles.href =
        "https://actionnetwork.org/css/style-embed-whitelabel-v3.css"
      styles.rel = "stylesheet"
      inner.appendChild(styles)
      container.current.appendChild(inner)
    }
    inner.addEventListener("input", onInput)
    inner.addEventListener("focusout", onBlur)
    return () => {
      inner.removeEventListener("input", onInput)
      inner.removeEventListener("focusout", onBlur)
      actionNetworkCache.set(cacheKey, inner)
      container.current && container.current.removeChild(inner)
    }
  }, [actionId, type])

  return <div className={Styles.container} ref={container} />
}

/**
 * @param {{ link: string }} props
 */
export default ({ link }) => {
  const url = React.useMemo(() => {
    const nonLinkTextRemoved =
      link.split(" ").filter(w => w.startsWith("http"))[0] ?? null
    if (!nonLinkTextRemoved) return null
    try {
      return new URL(nonLinkTextRemoved)
    } catch {
      return null
    }
  }, [link])

  const actionNetwork = React.useMemo(() => {
    if (!url) return null
    if (url.hostname !== "actionnetwork.org") return null
    const [type, actionId] = url.pathname.split("/").filter(x => x)
    if ((type !== "forms" && type !== "events") || !actionId) return null
    return { actionId, type: type.substring(0, type.length - 1) }
  }, [url])

  if (actionNetwork) {
    return (
      <Section id="newsletter" title="Newsletter Sign Up">
        <ActionNetwork
          actionId={actionNetwork.actionId}
          type={actionNetwork.type}
        />
      </Section>
    )
  }

  if (url) {
    return (
      <Section id="newsletter" title="Newsletter Sign Up">
        <LinkContainer>
          <Button label="Sign up here" href={url.href} />
        </LinkContainer>
      </Section>
    )
  }

  return null
}
