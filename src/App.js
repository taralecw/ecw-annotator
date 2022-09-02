import React from "react";
import './App.css';
import NLPAnnotator from "./components/NLPAnnotator";

const entityLabels = [
    {
        id: "system-name",
        displayName: "System name",
        description: "System name under examination."
    },
    {
        id: "findings",
        displayName: "Findings",
        description: "Observation of the examination."
    },
    {
        id: "exam-name",
        displayName: "Exam",
        description: "Examination."
    }
];

const relLabels = [
    {
        id: "has-findings",
        displayName: "Has_Findings",
        description: "System name to findings relationships."
    },
    {
        id: "has-exam",
        displayName: "Has_Exam",
        description: "System name to findings relationship."
    }
];

const initialState = {
    "sequence": [
        {
            "text": " ",
            "textId": "u6rflm"
        },
        {
            "label": "exam-name",
            "text": "GENERAL APPEARANCE",
            "textId": "o0r8lj"
        },
        {
            "text": ": HEAD: EYES: BOTH EYES, normal, sclera anicteric ",
            "textId": "kvaehp"
        },
        {
            "label": "system-name",
            "text": "EARS",
            "textId": "206ymk"
        },
        {
            "text": ": ",
            "textId": "3o825i"
        },
        {
            "label": "findings",
            "text": "not examined",
            "textId": "2c17pk"
        },
        {
            "text": " NOSE: ORAL CAVITY: mucosa moist THROAT: NECK/THYROID: LYMPH NODES: SKIN: normal ",
            "textId": "fz0grr"
        },
        {
            "label": "system-name",
            "text": "HEART",
            "textId": "a5so1k"
        },
        {
            "text": ": regular rate and rhythm, no murmurs LUNGS: clear to auscultation bilaterally CHEST: normal shape and expansion BREASTS: ABDOMEN: RECTAL: BACK: FEMALE GENITOURINARY: MALE GENITOURINARY: MUSCULOSKELETAL: EXTREMITIES: PERIPHERAL PULSES: NEUROLOGIC: PODIATRIC: PSYCH: ... FOOT EXAM: DENTAL EXAM: ",
            "textId": "tpi0gg"
        }
    ],
    "relationships": [
        {
            "from": "2c17pk",
            "to": "206ymk",
            "label": "findings",
            "color": "#c2185b"
        },
        {
            "from": "206ymk",
            "to": "o0r8lj",
            "label": "system-name",
            "color": "#d32f2f"
        }
    ]
}

function App() {
  return (
      <NLPAnnotator
          hotkeysEnabled
          type="label-relationships"
          multipleLabels={false}
          document=" GENERAL APPEARANCE: HEAD: EYES: BOTH EYES, normal, sclera anicteric EARS: not examined NOSE: ORAL CAVITY: mucosa moist THROAT: NECK/THYROID: LYMPH NODES: SKIN: normal HEART: regular rate and rhythm, no murmurs LUNGS: clear to auscultation bilaterally CHEST: normal shape and expansion BREASTS: ABDOMEN: RECTAL: BACK: FEMALE GENITOURINARY: MALE GENITOURINARY: MUSCULOSKELETAL: EXTREMITIES: PERIPHERAL PULSES: NEUROLOGIC: PODIATRIC: PSYCH: ... FOOT EXAM: DENTAL EXAM: "
          onChange={(output) => {
            console.log("Output is...", output);
          }}
          // this is just for label-relationships
          entityLabels={entityLabels}
          relationshipLabels={relLabels}
          initialSequence={initialState.sequence}
          initialRelationships={initialState.relationships}
      />
  );
}

export default App;
