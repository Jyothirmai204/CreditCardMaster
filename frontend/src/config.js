export const API_BASE = "http://localhost:8082";

export const ROUTES = {
  LOGIN: "/",
  OVERVIEW: "/overview",
  IAM: "/iam",
  APPLICATIONS: "/applications",
  UNDERWRITING: "/underwriting",
  CARDS: "/cards",
  TRANSACTIONS: "/transactions",
  BILLING: "/billing"
};

export const ROLE_NAV = {
  ADMIN: [
    ROUTES.OVERVIEW,
    ROUTES.IAM,
    ROUTES.APPLICATIONS,
    ROUTES.UNDERWRITING,
    ROUTES.CARDS,
    ROUTES.TRANSACTIONS,
    ROUTES.BILLING
  ],
  CUSTOMER: [ROUTES.OVERVIEW, ROUTES.APPLICATIONS, ROUTES.CARDS, ROUTES.TRANSACTIONS, ROUTES.BILLING],
  UNDERWRITER: [ROUTES.OVERVIEW, ROUTES.APPLICATIONS, ROUTES.UNDERWRITING],
  OFFICER: [ROUTES.OVERVIEW, ROUTES.CARDS, ROUTES.TRANSACTIONS, ROUTES.BILLING],
  RISK: [ROUTES.OVERVIEW, ROUTES.TRANSACTIONS]
};

export const PAGES = [
  {
    path: ROUTES.OVERVIEW,
    label: "Overview",
    eyebrow: "Platform View",
    title: "Card lifecycle from onboarding to settlement",
    description: "Navigate CardMaster module by module. Each screen maps directly to one backend domain and has its own route."
  },
  {
    path: ROUTES.IAM,
    label: "IAM",
    eyebrow: "Identity Module",
    title: "Session and access context",
    description: "Inspect the authenticated operator, JWT context, and role-specific navigation available to the current session."
  },
  {
    path: ROUTES.APPLICATIONS,
    label: "Applications",
    eyebrow: "PAA",
    title: "Onboard customers and open applications",
    description: "Create customers, submit applications, and attach KYC documents before underwriting begins."
  },
  {
    path: ROUTES.UNDERWRITING,
    label: "Underwriting",
    eyebrow: "CAU",
    title: "Assess credit and record decisions",
    description: "Generate credit scores and store underwriting outcomes per application."
  },
  {
    path: ROUTES.CARDS,
    label: "Cards",
    eyebrow: "CIAS",
    title: "Issue cards and open linked accounts",
    description: "Create card records and provision the corresponding card account with limits."
  },
  {
    path: ROUTES.TRANSACTIONS,
    label: "Transactions",
    eyebrow: "TAP",
    title: "Authorize, post, reverse, and release holds",
    description: "Drive transaction lifecycle actions through the transaction processing APIs."
  },
  {
    path: ROUTES.BILLING,
    label: "Billing",
    eyebrow: "BSP",
    title: "Generate statements and capture payments",
    description: "Close billing cycles and record payments against card accounts."
  }
];

export const MODULE_CARDS = [
  {
    id: "PAA",
    path: ROUTES.APPLICATIONS,
    title: "Application Intake",
    text: "Create customers, open applications, and attach KYC documents before underwriting."
  },
  {
    id: "CAU",
    path: ROUTES.UNDERWRITING,
    title: "Credit Assessment",
    text: "Generate bureau-backed scores and approve, reject, or condition applications."
  },
  {
    id: "CIAS",
    path: ROUTES.CARDS,
    title: "Issuance and Accounts",
    text: "Issue the card, activate the linked account, and control credit limits."
  },
  {
    id: "TAP",
    path: ROUTES.TRANSACTIONS,
    title: "Transaction Processing",
    text: "Authorize, post, reverse, and inspect holds with role-based operational access."
  },
  {
    id: "BSP",
    path: ROUTES.BILLING,
    title: "Billing and Payments",
    text: "Generate statements, close billing cycles, and capture payments against accounts."
  }
];
