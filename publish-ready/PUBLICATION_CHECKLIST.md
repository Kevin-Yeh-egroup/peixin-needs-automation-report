# Publication Checklist

## Current Status

- [x] Static HTML package prepared.
- [x] Review-stage noindex controls added.
- [x] Local Git repo can version the package.
- [x] Kevin approved option B: public GitHub repo plus Vercel noindex preview.
- [x] Public GitHub repo created.
- [x] Repository pushed to GitHub.
- [x] Vercel preview deployment created.
- [x] Deployment content verified through `vercel curl`.
- [x] Vercel production deployment created.
- [x] Public unauthenticated production alias verified.
- [x] Current-workflow and optimization section added and verified in production.
- [x] Dedicated Vercel project created for Peixin report.
- [x] Dedicated production alias verified.

## Published Locations

- GitHub repo: `https://github.com/Kevin-Yeh-egroup/peixin-needs-automation-report`
- Vercel production alias: `https://peixin-needs-automation-report.vercel.app`
- Vercel project name: `peixin-needs-automation-report`
- Vercel project ID: `prj_coAOwvJCqT4qHPBxwqRyiIrM5a8P`
- Vercel team ID: `team_lOk9yHNRxLRBcdrU9DATWODG`

Legacy shared-project URLs under `publish-ready*.vercel.app` are deprecated for this report and should not be shared.

## Sensitivity Review

- Profile: Kevin approved public GitHub / Vercel noindex preview for this iteration.
- Reason: internal process details, staff names, operational systems, and possible personal-data context.
- Important: noindex controls are indexing hints, not access control.

## Verification To Run Before Sharing

- GitHub push completed on `main`.
- `curl -I -L https://peixin-needs-automation-report.vercel.app` returned `200 OK`.
- Production response headers include `X-Robots-Tag: noindex, nofollow, noarchive`.
- `robots.txt` returns `User-agent: *` and `Disallow: /`.
- `Invoke-WebRequest` confirmed dedicated production HTML contains the report title, `Ivy`, `素菁`, `她現在的工作流程與優化可能`, and `<meta name="robots" content="noindex,nofollow,noarchive">`.
- Public unauthenticated access should use the dedicated production alias.

## Approval Gates

Ask Kevin before:

- sharing a URL externally;
- removing noindex or changing visibility.
- changing Vercel Deployment Protection settings;
- promoting future changes to Vercel production;
