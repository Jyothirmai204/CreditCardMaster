import { useState } from "react";
import { submitJson } from "../lib/api";
import { FormGrid, Input } from "../components/FormControls";

export default function CardsPage({ token, setToast }) {
  const [card, setCard] = useState({
    applicationId: "1",
    maskedCardNumber: "1234********5678",
    expiryDate: "2030-12-31",
    cvvHash: "hashed-cvv-123"
  });
  const [account, setAccount] = useState({ cardId: "1" });

  return (
    <section className="split-panel">
      <div className="panel">
        <span className="eyebrow">CIAS</span>
        <h3>Issue card</h3>
        <p className="panel-copy">Issue only from an approved application. Customer, product, and approved limit are inherited from underwriting.</p>
        <FormGrid
          onSubmit={(event) =>
            submitJson(
              event,
              "/api/cards",
              token,
              {
                applicationId: Number(card.applicationId),
                maskedCardNumber: card.maskedCardNumber,
                expiryDate: card.expiryDate,
                cvvHash: card.cvvHash
              },
              setToast
            )
          }
        >
          <Input label="Application ID" value={card.applicationId} onChange={(value) => setCard({ ...card, applicationId: value })} />
          <Input label="Masked Card Number" value={card.maskedCardNumber} onChange={(value) => setCard({ ...card, maskedCardNumber: value })} />
          <Input label="Expiry Date" type="date" value={card.expiryDate} onChange={(value) => setCard({ ...card, expiryDate: value })} />
          <Input label="CVV Hash" value={card.cvvHash} onChange={(value) => setCard({ ...card, cvvHash: value })} />
          <button className="primary-button">Create Card</button>
        </FormGrid>
      </div>

      <div className="panel">
        <span className="eyebrow">Account</span>
        <h3>Open linked card account</h3>
        <p className="panel-copy">The account opens only for an issued card and uses the latest approved underwriting limit automatically.</p>
        <FormGrid
          onSubmit={(event) =>
            submitJson(
              event,
              "/api/accounts",
              token,
              {
                cardId: Number(account.cardId)
              },
              setToast
            )
          }
        >
          <Input label="Card ID" value={account.cardId} onChange={(value) => setAccount({ ...account, cardId: value })} />
          <button className="primary-button">Create Account</button>
        </FormGrid>
      </div>
    </section>
  );
}
