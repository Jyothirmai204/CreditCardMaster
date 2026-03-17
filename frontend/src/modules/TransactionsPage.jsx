import { useState } from "react";
import { submitJson, submitWithoutBody } from "../lib/api";
import { ActionCard, FormGrid, Input } from "../components/FormControls";

export default function TransactionsPage({ token, setToast }) {
  const [authorizeForm, setAuthorizeForm] = useState({
    accountId: "1",
    amount: "5000",
    currency: "INR",
    merchant: "Amazon",
    channel: "POS"
  });
  const [transactionId, setTransactionId] = useState("1");
  const [holdId, setHoldId] = useState("1");

  return (
    <section className="stacked-panels">
      <div className="panel">
        <span className="eyebrow">TAP</span>
        <h3>Transaction authorizer</h3>
        <FormGrid
          onSubmit={(event) =>
            submitJson(
              event,
              "/transactions/authorize",
              token,
              {
                accountId: Number(authorizeForm.accountId),
                amount: Number(authorizeForm.amount),
                currency: authorizeForm.currency,
                merchant: authorizeForm.merchant,
                channel: authorizeForm.channel
              },
              setToast
            )
          }
        >
          <Input label="Account ID" value={authorizeForm.accountId} onChange={(value) => setAuthorizeForm({ ...authorizeForm, accountId: value })} />
          <Input label="Amount" value={authorizeForm.amount} onChange={(value) => setAuthorizeForm({ ...authorizeForm, amount: value })} />
          <Input label="Currency" value={authorizeForm.currency} onChange={(value) => setAuthorizeForm({ ...authorizeForm, currency: value })} />
          <Input label="Merchant" value={authorizeForm.merchant} onChange={(value) => setAuthorizeForm({ ...authorizeForm, merchant: value })} />
          <Input label="Channel" value={authorizeForm.channel} onChange={(value) => setAuthorizeForm({ ...authorizeForm, channel: value })} />
          <button className="primary-button">Authorize</button>
        </FormGrid>
      </div>

      <div className="triple-panel">
        <ActionCard
          label="Post Transaction"
          fieldLabel="Transaction ID"
          fieldValue={transactionId}
          onFieldChange={setTransactionId}
          onSubmit={(event) => submitWithoutBody(event, `/transactions/post/${transactionId}`, token, setToast)}
        />
        <ActionCard
          label="Reverse Transaction"
          fieldLabel="Transaction ID"
          fieldValue={transactionId}
          onFieldChange={setTransactionId}
          onSubmit={(event) => submitWithoutBody(event, `/transactions/reverse/${transactionId}`, token, setToast)}
        />
        <ActionCard
          label="Release Hold"
          fieldLabel="Hold ID"
          fieldValue={holdId}
          onFieldChange={setHoldId}
          onSubmit={(event) => submitWithoutBody(event, `/transaction-holds/release/${holdId}`, token, setToast)}
        />
      </div>
    </section>
  );
}
