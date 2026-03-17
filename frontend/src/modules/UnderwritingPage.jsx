import { useState } from "react";
import { submitJson } from "../lib/api";
import { FormGrid, Input } from "../components/FormControls";

export default function UnderwritingPage({ token, setToast }) {
  const [score, setScore] = useState({ applicationId: "1", bureauScore: "780" });
  const [decision, setDecision] = useState({
    applicationId: "1",
    decision: "APPROVE",
    approvedLimit: "80000",
    remarks: "Eligible for issue"
  });

  return (
    <section className="split-panel">
      <div className="panel">
        <span className="eyebrow">CAU</span>
        <h3>Generate credit score</h3>
        <FormGrid
          onSubmit={(event) =>
            submitJson(
              event,
              `/applications/${score.applicationId}/scores`,
              token,
              { bureauScore: Number(score.bureauScore) },
              setToast
            )
          }
        >
          <Input label="Application ID" value={score.applicationId} onChange={(value) => setScore({ ...score, applicationId: value })} />
          <Input label="Bureau Score" value={score.bureauScore} onChange={(value) => setScore({ ...score, bureauScore: value })} />
          <button className="primary-button">Generate Score</button>
        </FormGrid>
      </div>

      <div className="panel">
        <span className="eyebrow">Decision</span>
        <h3>Create underwriting decision</h3>
        <FormGrid
          onSubmit={(event) =>
            submitJson(
              event,
              `/applications/${decision.applicationId}/decisions`,
              token,
              {
                decision: decision.decision,
                approvedLimit: Number(decision.approvedLimit),
                remarks: decision.remarks
              },
              setToast
            )
          }
        >
          <Input label="Application ID" value={decision.applicationId} onChange={(value) => setDecision({ ...decision, applicationId: value })} />
          <Input label="Decision" value={decision.decision} onChange={(value) => setDecision({ ...decision, decision: value })} />
          <Input label="Approved Limit" value={decision.approvedLimit} onChange={(value) => setDecision({ ...decision, approvedLimit: value })} />
          <Input label="Remarks" value={decision.remarks} onChange={(value) => setDecision({ ...decision, remarks: value })} />
          <button className="primary-button">Save Decision</button>
        </FormGrid>
      </div>
    </section>
  );
}
