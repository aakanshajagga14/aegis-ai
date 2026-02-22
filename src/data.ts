export const VELA_POLICY_ANALYSIS = {
    you_lose: [
        "Location data collected even when app is closed",
        "Contacts list uploaded and stored indefinitely",
        "Browsing history tracked across third-party sites",
        "Data sold to advertising partners without explicit notice",
        "Account deletion does not remove data from partner systems",
        "Biometric data may be collected via camera features"
    ],
    unclear: [
        "Undefined 'affiliated entities' may receive your data",
        "'We may share' used 14 times with no scope limit",
        "Opt-out exists but location is not disclosed",
        "Retention period described as 'reasonable' — undefined",
        "'Improving our services' used as a catch-all permission",
        "No explanation of how automated decisions affect users"
    ],
    safe: [
        "You can request a full data export at any time",
        "Passwords are hashed and never stored in plain text",
        "You are notified within 72 hours of a data breach",
        "Children under 13 are explicitly excluded from data profiling",
        "EU users retain right to erasure under GDPR",
        "Two-factor authentication is available and documented"
    ],
    red_flags: [
        {
            label: "DATA OWNERSHIP",
            quote: "By using Vela, you grant us a perpetual, irrevocable, royalty-free license to use, reproduce, and distribute any content you post."
        },
        {
            label: "UNILATERAL UPDATES",
            quote: "We reserve the right to modify these terms at any time without prior notice."
        },
        {
            label: "IMPLIED CONSENT",
            quote: "Your continued use of the platform constitutes acceptance of any updated terms."
        },
        {
            label: "DATA JURISDICTION",
            quote: "Data may be transferred to jurisdictions that do not provide the same level of protection as your home country."
        }
    ],
    benefit_score: { user: 28, company: 72 }
};

export const VELA_RAW_POLICY = `
# Privacy Policy for Vela Social

Last Updated: February 22, 2026

## 1. Introduction
Welcome to Vela. Your privacy is important to us, but so is our ability to provide a seamless, interconnected social experience. By using Vela, you agree to the practices described in this policy.

## 2. Information Collection and Use
We collect various types of information to improve our services and provide a personalized experience. "Improving our services" used as a catch-all permission for data processing.

### 2.1. Personal Data
When you register, we collect your name, email, and other profile details. We also upload and store your contacts list indefinitely to suggest connections and optimize our social graph.

### 2.2. Tracking and Cookies
We track your browsing history across third-party sites using our proprietary beacon technology. This allows us to serve relevant advertisements through our network of advertising partners. Data may be sold to advertising partners without explicit notice to ensure service continuity.

### 2.3. Location Data
To provide location-based features, your location data is collected even when the app is closed. This high-precision tracking is necessary for our "Vela NearMe" functionality.

### 2.4. Biometric Data
Biometric data may be collected via camera features for various filters and safety checks. You grant us a perpetual, irrevocable, royalty-free license to use, reproduce, and distribute any content you post, including biometric metadata.

## 3. Data Sharing
We may share your information with affiliated entities and third-party partners. Undefined 'affiliated entities' may receive your data for processing purposes. 'We may share' used 14 times with no scope limit throughout our internal processing guidelines.

## 4. Your Rights
You can request a full data export at any time. Passwords are hashed and never stored in plain text to ensure maximum security. EU users retain the right to erasure under GDPR. Two-factor authentication is available and documented in our Security Center.

## 5. Data Retention and Security
We retain your data for a period described as "reasonable" — which is undefined but generally correlates with the lifespan of your account. Note that account deletion does not remove data from partner systems. You are notified within 72 hours of a data breach.

## 6. General Terms
We reserve the right to modify these terms at any time without prior notice. Your continued use of the platform constitutes acceptance of any updated terms. Data may be transferred to jurisdictions that do not provide the same level of protection as your home country.

Children under 13 are explicitly excluded from data profiling.
`;

export const SCANNING_MESSAGES = [
    "Fetching policy document...",
    "Extracting clauses...",
    "Identifying data collection scope...",
    "Cross-referencing permission language...",
    "Scoring benefit distribution..."
];
