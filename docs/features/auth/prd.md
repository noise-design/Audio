# PRD — F-AUTH: Login & account

**Status:** stub. **Owning screens:** `loginFragmentV2`, `EmailLogin`, `EmailOtpLogin`, `PhoneLogin`, `PhoneOtpLogin`, `UserProfile`. **Endpoints:** `/auth_v2/audio/send-otp`, `verify-otp`, `login`; `/users/v3/international/create`; `/auth_v2/logout`; `/disable/account`.

## Summary
Email/phone OTP authentication with Google sign-in and a guest path; creates the user and profile.

## Declares (acceptance criteria)
- **AC-1 ✓** Email or phone OTP send/verify via `/auth_v2/audio/send-otp` + `verify-otp`.
- **AC-2 ✓** Google sign-in supported (`login_google_click`, Credentials/GoogleID; `GOOGLE_CLIENT_ID` build field — see ADR-001).
- **AC-3 ✓** Guest path (`login_guest_click`, `createGuestUser`).
- **AC-4 ✓** Terms opt-in tracked (`login_terms_and_Conditions_optin` — capital-C naming bug, ADR-011).
- **AC-5 ✓** New user creates profile (`UserProfileFragment`, `/profile/update`).
- **AC-6 ✓** Account deletion + logout endpoints exist (`/disable/account`, `/auth_v2/logout`).
- **AC-7 TODO(product)** Session/token refresh UX (token refresh via `TokenRefreshApi`); re-auth on `InvalidToken` (`AudioBindState`).
- **AC-8 TODO** Confirm `LoginFragment` (V1) is dead (ADR-007).

## Risks
Token refresh uses a separate OkHttp client to avoid interceptor recursion (`NetworkModule.kt:41-64`).
