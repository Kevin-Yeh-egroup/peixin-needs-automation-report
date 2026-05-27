# Publication Checklist

## Current Status

- [x] Static HTML package prepared.
- [x] Review-stage noindex controls added.
- [x] Local Git repo can version the package.
- [ ] Kevin approved external upload to GitHub.
- [ ] Kevin approved repository visibility.
- [ ] Kevin approved Vercel deployment.
- [ ] Final URL verified.

## Sensitivity Review

- Profile: `private-preview` recommended.
- Reason: internal process details, staff names, operational systems, and possible personal-data context.
- Public release requires content redaction or explicit approval.

## Verification To Run Before Sharing

- Open `index.html` locally on desktop.
- Check mobile responsive layout.
- If deployed, verify:
  - `200 OK` or protected auth status.
  - `X-Robots-Tag: noindex, nofollow, noarchive`.
  - `robots.txt` returns `Disallow: /`.

## Approval Gates

Ask Kevin before:

- creating or pushing to a GitHub repository;
- creating a public repository;
- deploying to Vercel;
- sharing a URL externally;
- removing noindex or changing visibility.

