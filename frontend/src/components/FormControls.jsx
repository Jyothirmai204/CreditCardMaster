export function FormGrid({ children, onSubmit }) {
  return (
    <form className="form-grid" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export function Input({ label, value, onChange, type = "text" }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

export function ActionCard({ label, fieldLabel, fieldValue, onFieldChange, onSubmit }) {
  return (
    <div className="panel">
      <h3>{label}</h3>
      <FormGrid onSubmit={onSubmit}>
        <Input label={fieldLabel} value={fieldValue} onChange={onFieldChange} />
        <button className="primary-button">Run</button>
      </FormGrid>
    </div>
  );
}
