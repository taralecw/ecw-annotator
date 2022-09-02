type ReactNode = any
type LabelId = string
type TextId = string

export type SequenceItem = {
  text: string,
  label?: LabelId,
  color?: string,
  textId?: TextId
}
export type Label = {
  parent?: string,
  displayName?: string,
  description?: string,
  color: string,
  id: string
}

export type Relationship = {
  from: TextId,
  to: TextId,
  label: LabelId,
  color?: string
}

export type RelationshipAnnotatorProps = {
  type: "label-relationships",
  hotkeysEnabled?: boolean,
  separatorRegex?: RegExp,
  entityLabels?: Array<Label>,
  relationshipLabels?: Array<Label>,
  initialSequence?: Array<SequenceItem>,
  initialRelationships?: Array<Relationship>,
  document: string,
  onChange: ({
    sequence: Array<SequenceItem>,
    relationships: Array<Relationship>
  }) => any
}

export type NLPAnnotatorProps = {
  ...
    | $Exact<RelationshipAnnotatorProps>,
  onNext?: Function,
  onPrev?: Function,
  titleContent?: string | ReactNode,
  onFinish?: string,
  onChange?: string
}

export type Output =
  | {
      outputType: "label-relationships",
      document: string,
      sequence: Array<SequenceItem>,
      relationships: Array<Relationship>
    }
