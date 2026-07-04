# DigitalOcean Production Deployment (Voter-Alliance)

## What was added
- `.do/app.yaml`: DigitalOcean App Platform specification.
- `Voter-Alliance.Server/Dockerfile`: backend container build recipe (kept for full-stack deployment when backend source is tracked).
- `.dockerignore` update to allow `Voter-Alliance.Server/Dockerfile` in build context.

## Prerequisites
- A DigitalOcean account.
- Repo connected to DigitalOcean App Platform.
- Replace placeholder env values in `.do/app.yaml` before first production release.

## Current mode in this repo
Current `.do/app.yaml` deploys as a static site from `voter-alliance.client/dist` because this repository snapshot does not include tracked backend source files needed for Docker build in App Platform.

If you want full-stack API + DB deployment later, re-enable the service section in `.do/app.yaml` and ensure backend project files are tracked in Git.

## Deploy from DigitalOcean UI
1. Create a new App in DigitalOcean App Platform.
2. Choose GitHub and select this repository.
3. Use existing app spec: `.do/app.yaml`.
4. Review and replace placeholders.
5. Launch app.

## Deploy with doctl
```bash
doctl apps create --spec .do/app.yaml
```

For updates:
```bash
doctl apps update <APP_ID> --spec .do/app.yaml
```

## OAuth callback URLs (required when backend auth is enabled)
For Google and other providers, add callback URLs matching your live domain:
- `https://YOUR_APP_DOMAIN/signin-google`
- `https://YOUR_APP_DOMAIN/signin-facebook`
- `https://YOUR_APP_DOMAIN/signin-microsoft`

## Post-deploy checks
- Open `/` and verify the SPA loads.
- Verify API endpoints under `/api/...`.
- Test login/register.
- Test profile save.
- Verify DB writes by creating a test record.
- Confirm HTTPS and custom domain mapping in App Platform.
