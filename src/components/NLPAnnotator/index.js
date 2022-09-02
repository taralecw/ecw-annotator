import React, { useState, useEffect, useMemo } from "react"

import type { NLPAnnotatorProps } from "../../types"
import RelationshipAnnotator from "../RelationshipAnnotator"
import colors from "../../colors"
import Container from "../Container"
import useEventCallback from "use-event-callback"

const defaultValidator = () => []

const addColors = inputLabels => {
  return (inputLabels || []).map((label, i) =>
    label.color ? label : { ...label, color: colors[i % colors.length] }
  )
}

export default function NLPAnnotator(props: NLPAnnotatorProps) {
  const validator = props.validator || defaultValidator
  let [output, changeOutput] = useState(null)

  if (output === null) {
    // setting the initial state.
    output = {
      sequence: props.initialSequence,
      relationships: props.initialRelationships
    }
  }

  useEffect(() => {
    if (!props.hotkeysEnabled) return
    const eventFunc = e => {
      if (e.key === "Enter") {
        if (props.onNext) {
          props.onNext(output)
        } else if (props.onFinish) {
          props.onFinish(output)
        }
      }
    }
    window.addEventListener("keydown", eventFunc)
    return () => {
      window.removeEventListener("keydown", eventFunc)
    }
  }, [props.onFinish, output])

  const onChange = (newOutput: any) => {
    if (props.onChange) props.onChange(newOutput)
    changeOutput(newOutput)
  }

  // let labels = useMemo(() => addColors(props.labels), [props.labels])
  let entityLabels = useMemo(() => addColors(props.entityLabels), [
    props.entityLabels
  ])
  let relationshipLabels = useMemo(() => addColors(props.relationshipLabels), [
    props.relationshipLabels
  ])

  const isPassingValidation = !validator(output).some(msg =>
    msg.toLowerCase().includes("error")
  )

  const onNext = useEventCallback(() => props.onNext(output))
  const onPrev = useEventCallback(() => props.onPrev(output))
  const onFinish = useEventCallback(() => {
    if (!isPassingValidation) return
    props.onFinish(output)
  })
  const onClickHeaderItem = useEventCallback(({ name }) => {
    switch (name) {
      case "Done":
      case "Save":
        onFinish(output)
        return
      default:
        return
    }
  })

  let annotator
  switch (props.type) {
    case "label-relationships":
      annotator = (
        <RelationshipAnnotator
          {...props}
          entityLabels={entityLabels}
          relationshipLabels={relationshipLabels}
          onChange={onChange}
        />
      )
      break
    default:
      annotator = null
  }

  return (
    <Container
      titleContent={props.titleContent}
      onNext={props.onNext ? onNext : null}
      onPrev={props.onPrev ? onPrev : null}
      onClickHeaderItem={onClickHeaderItem}
    >
      <div>{annotator}</div>
    </Container>
  )
}
