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

const ActionNetwork = ({ actionId }) => {
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
    if (actionNetworkCache.has(actionId)) {
      inner = actionNetworkCache.get(actionId)
      container.current.appendChild(inner)
    } else {
      inner = document.createElement("div")
      inner.innerHTML = `
        <div id="can-form-area-${actionId}" style="width: 100%;"></div>
      `
      const script = document.createElement("script")
      script.src = `https://actionnetwork.org/widgets/v3/form/${actionId}?format=js&source=widget`
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
      actionNetworkCache.set(actionId, inner)
      container.current && container.current.removeChild(inner)
    }
  }, [actionId])

  return <div className={Styles.container} ref={container} />
}

export default ({ link }) => {
  const actionNetworkActionId = React.useMemo(() => {
    const url = new URL(link)
    if (url.hostname !== "actionnetwork.org") return null
    const [type, actionId] = url.pathname.split("/").filter(x => x)
    console.log(type)
    if (type !== "forms" || !actionId) return null
    return actionId
  }, [link])

  if (actionNetworkActionId) {
    return (
      <Section id="newsletter" title="Newsletter Sign Up">
        <ActionNetwork actionId={actionNetworkActionId} />
      </Section>
    )
  }

  return (
    <Section id="newsletter" title="Newsletter Sign Up">
      <LinkContainer>
        <Button label="Sign up here" href={link} />
      </LinkContainer>
    </Section>
  )
}
