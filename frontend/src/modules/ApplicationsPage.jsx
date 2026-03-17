import { useState } from "react";
import { submitJson } from "../lib/api";
import { FormGrid, Input } from "../components/FormControls";

export default function ApplicationsPage({ token, setToast }) {
  const [customer, setCustomer] = useState({
    name: "Harsha",
    dob: "2001-05-20",
    email: "harsha@example.com",
    phone: "9999999999",
    address: "Hyderabad",
    income: "750000",
    employmentType: "Salaried",
    status: "Active"
  });
  const [application, setApplication] = useState({
    customerId: "1",
    productId: "1",
    requestedLimit: "100000",
    applicationDate: new Date().toISOString().slice(0, 10)
  });
  const [document, setDocument] = useState({
    applicationId: "1",
    documentType: "IdentityProof",
    fileURI: "/docs/aadhar.pdf",
    status: "Submitted"
  });

  return (
    <section className="stacked-panels">
      <div className="panel">
        <span className="eyebrow">PAA</span>
        <h3>Customer onboarding</h3>
        <FormGrid
          onSubmit={(event) =>
            submitJson(
              event,
              "/customers",
              token,
              {
                name: customer.name,
                dob: customer.dob,
                contactInfo: {
                  email: customer.email,
                  phone: customer.phone,
                  address: customer.address
                },
                income: Number(customer.income),
                employmentType: customer.employmentType,
                status: customer.status
              },
              setToast
            )
          }
        >
          <Input label="Name" value={customer.name} onChange={(value) => setCustomer({ ...customer, name: value })} />
          <Input label="DOB" type="date" value={customer.dob} onChange={(value) => setCustomer({ ...customer, dob: value })} />
          <Input label="Email" value={customer.email} onChange={(value) => setCustomer({ ...customer, email: value })} />
          <Input label="Phone" value={customer.phone} onChange={(value) => setCustomer({ ...customer, phone: value })} />
          <Input label="Address" value={customer.address} onChange={(value) => setCustomer({ ...customer, address: value })} />
          <Input label="Income" value={customer.income} onChange={(value) => setCustomer({ ...customer, income: value })} />
          <Input label="Employment Type" value={customer.employmentType} onChange={(value) => setCustomer({ ...customer, employmentType: value })} />
          <Input label="Status" value={customer.status} onChange={(value) => setCustomer({ ...customer, status: value })} />
          <button className="primary-button">Create Customer</button>
        </FormGrid>
      </div>

      <div className="split-panel">
        <div className="panel">
          <span className="eyebrow">Applications</span>
          <h3>Open card application</h3>
          <FormGrid
            onSubmit={(event) =>
              submitJson(
                event,
                "/applications",
                token,
                {
                  customerId: Number(application.customerId),
                  productId: Number(application.productId),
                  requestedLimit: Number(application.requestedLimit),
                  applicationDate: application.applicationDate
                },
                setToast
              )
            }
          >
            <Input label="Customer ID" value={application.customerId} onChange={(value) => setApplication({ ...application, customerId: value })} />
            <Input label="Product ID" value={application.productId} onChange={(value) => setApplication({ ...application, productId: value })} />
            <Input label="Requested Limit" value={application.requestedLimit} onChange={(value) => setApplication({ ...application, requestedLimit: value })} />
            <Input label="Application Date" type="date" value={application.applicationDate} onChange={(value) => setApplication({ ...application, applicationDate: value })} />
            <button className="primary-button">Create Application</button>
          </FormGrid>
        </div>

        <div className="panel">
          <span className="eyebrow">Documents</span>
          <h3>Attach KYC document</h3>
          <FormGrid
            onSubmit={(event) =>
              submitJson(
                event,
                "/documents",
                token,
                {
                  applicationId: Number(document.applicationId),
                  documentType: document.documentType,
                  fileURI: document.fileURI,
                  status: document.status
                },
                setToast
              )
            }
          >
            <Input label="Application ID" value={document.applicationId} onChange={(value) => setDocument({ ...document, applicationId: value })} />
            <Input label="Document Type" value={document.documentType} onChange={(value) => setDocument({ ...document, documentType: value })} />
            <Input label="File URI" value={document.fileURI} onChange={(value) => setDocument({ ...document, fileURI: value })} />
            <Input label="Status" value={document.status} onChange={(value) => setDocument({ ...document, status: value })} />
            <button className="primary-button">Upload Document</button>
          </FormGrid>
        </div>
      </div>
    </section>
  );
}
