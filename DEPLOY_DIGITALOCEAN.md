# DigitalOcean Production Deployment (Voter-Alliance)

## What was added
- `.do/app.yaml`: DigitalOcean App Platform specification.
- `Voter-Alliance.Server/Dockerfile`: production image for ASP.NET API + bundled SPA assets.
- `.dockerignore` update to allow `Voter-Alliance.Server/Dockerfile` in build context.

## Prerequisites
- A DigitalOcean account.
- Repo connected to DigitalOcean App Platform.
- Replace placeholder env values in `.do/app.yaml` before first production release.

## Important production variables
Set these in App Platform (or keep in `.do/app.yaml` if managed securely):
- `JWT__Key` (required, strong random value)
- `ConnectionStrings__DefaultConnection` (wired to `${db.DATABASE_URL}` by default)
- `AllowedOrigins__0`, `AllowedOrigins__1` (your production domain)
- OAuth credentials for providers you use:
  - `Authentication__Google__ClientId`
  - `Authentication__Google__ClientSecret`
  - `Authentication__Facebook__ClientId`
  - `Authentication__Facebook__ClientSecret`
  - `Authentication__Microsoft__ClientId`
  - `Authentication__Microsoft__ClientSecret`
- `Stripe__SecretKey` (if billing is enabled)
- `CacheConnection` (optional; use DO Managed Redis if needed)

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

## OAuth callback URLs (required)
For Google and other providers, add callback URLs matching your live domain:
- `https://YOUR_APP_DOMAIN/signin-google`
- `https://YOUR_APP_DOMAIN/signin-facebook`
- `https://YOUR_APP_DOMAIN/signin-microsoft`

If these are missing, social login fails with redirect URI mismatch.

## Post-deploy checks
- Open `/` and verify the SPA loads.
- Verify API endpoints under `/api/...`.
- Test login/register.
- Test profile save.
- Verify DB writes by creating a test record.
- Confirm HTTPS and custom domain mapping in App Platform.
