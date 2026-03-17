import { useState } from "react";
import { submitJson } from "../lib/api";
import { FormGrid, Input } from "../components/FormControls";

export default function BillingPage({ token, setToast }) {
  const [statement, setStatement] = useState({
    accountId: "1",
    periodStart: "2026-03-01",
    periodEnd: "2026-03-31"
  });
  const [payment, setPayment] = useState({
    accountId: "1",
    statementId: "",
    amount: "3000",
    paymentDate: "2026-03-12T10:30",
    method: "UPI",
    status: "COMPLETED"
  });

  return (
    <section className="split-panel">
      <div className="panel">
        <span className="eyebrow">BSP</span>
        <h3>Generate billing statement</h3>
        <FormGrid
          onSubmit={(event) =>
            submitJson(
              event,
              "/billing/statements/generate",
              token,
              {
                accountId: Number(statement.accountId),
                periodStart: statement.periodStart,
                periodEnd: statement.periodEnd
              },
              setToast
            )
          }
        >
          <Input label="Account ID" value={statement.accountId} onChange={(value) => setStatement({ ...statement, accountId: value })} />
          <Input label="Period Start" type="date" value={statement.periodStart} onChange={(value) => setStatement({ ...statement, periodStart: value })} />
          <Input label="Period End" type="date" value={statement.periodEnd} onChange={(value) => setStatement({ ...statement, periodEnd: value })} />
          <button className="primary-button">Generate Statement</button>
        </FormGrid>
      </div>

      <div className="panel">
        <span className="eyebrow">Payments</span>
        <h3>Capture payment</h3>
        <p className="panel-copy">Use a statement ID when you want the payment allocated to a specific open bill. If left blank, the latest open statement is used.</p>
        <FormGrid
          onSubmit={(event) =>
            submitJson(
              event,
              "/billing/payments/capture",
              token,
              {
                accountId: Number(payment.accountId),
                statementId: payment.statementId ? Number(payment.statementId) : null,
                amount: Number(payment.amount),
                paymentDate: `${payment.paymentDate}:00`,
                method: payment.method,
                status: payment.status
              },
              setToast
            )
          }
        >
          <Input label="Account ID" value={payment.accountId} onChange={(value) => setPayment({ ...payment, accountId: value })} />
          <Input label="Statement ID" value={payment.statementId} onChange={(value) => setPayment({ ...payment, statementId: value })} />
          <Input label="Amount" value={payment.amount} onChange={(value) => setPayment({ ...payment, amount: value })} />
          <Input label="Payment Date" type="datetime-local" value={payment.paymentDate} onChange={(value) => setPayment({ ...payment, paymentDate: value })} />
          <Input label="Method" value={payment.method} onChange={(value) => setPayment({ ...payment, method: value })} />
          <Input label="Status" value={payment.status} onChange={(value) => setPayment({ ...payment, status: value })} />
          <button className="primary-button">Capture Payment</button>
        </FormGrid>
      </div>
    </section>
  );
}
