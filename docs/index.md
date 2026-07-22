# Feature Registry (F-*)

Canonical list of features present in code. Mint new `F-*` IDs here. Status = state on **Android** (this repo); cross-platform state → [/src/platforms/parity.json](../src/platforms/parity.json). PRDs are stubs — see [features/](features/). Owning screens use `S-*` / nav ids ([../memory/design/screens.md](../memory/design/screens.md)); endpoints per [../memory/architecture/api-contracts.md](../memory/architecture/api-contracts.md).

| F-* | Name | Status (Android) | PRD | Owning screens (navId) | Key endpoints |
|---|---|---|---|---|---|
| F-AUTH | Login & account | implemented (V1+V2, ADR-007) | [prd](features/auth/prd.md) | loginFragmentV2, EmailLogin, EmailOtpLogin, PhoneLogin, UserProfile | /auth_v2/audio/send-otp, verify-otp, login; /users/v3/international/create; /auth_v2/logout; /disable/account |
| F-ONBOARDING | First-run walkthrough | implemented | TODO | walkthroughOnboard, personalizedFragment, deviceInfoWalkAroundFragment | /user_detail/audio/device/intro |
| F-PAIRING | Device pairing | implemented (V1 dead, V2 live; ADR-007) | [prd](features/pairing/prd.md) | scanningFragment, setUpYourDeviceFragment, findDeviceListV2Fragment, pairingFragmentV2, meetDeviceFragment | /user_detail/audio/devices; /device-config; audio-device-assets |
| F-HOME | Home dashboard | implemented | TODO | homeFragment | /user_detail/audio/devices/list; /device_features |
| F-ANC | Noise control (ANC/Transparency) | implemented | [prd](features/anc/prd.md) | ancFragment | — (device SDK) |
| F-EQ | Equalizer | implemented | TODO | equalizerFragment, equalizerMaxFragment | — (device SDK) |
| F-SOUND | Sound controls (spatial/sidetone/gaming/bass/audio-boost) | implemented | TODO | soundControlsFragment, audioBoostFragment, spatialInfoFragment | — (device SDK) |
| F-TOUCH | Touch-gesture config | implemented (V1+V2) | TODO | touchGestureV2, customBudsFragment | — (device SDK) |
| F-MOTION | Motion control | implemented | TODO | motionControlInfoFragment | — (device SDK) |
| F-DUAL | Dual pairing | implemented | TODO | dualPairingFragment | — (device SDK) |
| F-FIRMWARE | Firmware OTA | implemented | [prd](features/firmware/prd.md) | firmwareUpdateFragment, firmwareTestFragment | /core/audio/firmware-versions |
| F-FINDMY | Find my device | implemented | TODO | findMyEarBudsFragment, findMyHeadPhoneFragment | — (device SDK) |
| F-AI-VOICE | Noise AI voice assistant | implemented | [prd](features/ai-voice/prd.md) | audioAiFragment, audioAiCalibrationFragment, activateAiOnDeviceFragment | wss /audio/ai/v1/voice |
| F-AI-CHAT | Noise AI text chat | implemented | TODO | aiHomeFragment, aiTextChatFragment, chatHistoryFragment | /audio/ai/v2/new-chat, stream, chat, chat-history, stopStream, message/limit |
| F-AI-TRANSCRIBE | Live transcription | implemented | TODO | wsTranscribeFragment, aiTranscriptionFragment, transcriptionDetailsFragment, transcriptionHistoryFragment | wss /audio/ai/v1/transcribe; /audio/ai/v2/transcriptions* |
| F-PRODUCT-GUIDE | Product guides | implemented | TODO | productGuideFragment, productMB1GuideFragment, productMBClipGuideFragment, productHeadphoneGuideFragment | assets |
| F-WARRANTY | Warranty registration | implemented | TODO | warrantyFragment, warrantyUserDetailFragment, deviceWarrantyFragment | validateSerialNo, registerWarranty, getWarrantyDetails, getPurchaseChannels |
| F-RATE-EARN | Rate & Earn | implemented | TODO | rateAndEarnFragment, rateEarnUploadImageFragment | /user_detail/audio/rate_and_earn/status, upload; /rewards/rae/claim |
| F-PROFILE | User profile | implemented (V1+V2) | TODO | profileFragmentV2, profileEditFragmentV2, avatarCropperFragmentV2 | /profile/update; /upload/profile-image |
| F-SETTINGS | Settings hub | implemented (V1+V2) | TODO | settingsFragmentV2, managePermissionsFragment, backgroundManagementFragment, appBatteryUsageFragment, forgotDeviceFragment | — |
| F-LANGUAGE | App language (17 locales) | implemented | TODO | appLanguageFragment | — |
| F-HELP | Help & support | implemented | TODO | helpAndSupportFragment, faqFragment, reportIssueFragment, ownerGuideWebViewFragment | /user_detail/audio/faq; submitSupportTicket |
| F-ABOUT | About & how-to-wear | implemented | TODO | aboutFragment, howToWearFragment | /how-to-wear |
| F-APP-UPDATE | In-app update | implemented | TODO | appUpdateFragment (+ bottom sheets) | /core/audio/app-version |

**Legend:** implemented = code path exists and is reachable. "V1+V2" = legacy duplication (ADR-007). PRDs marked `TODO` are registered but not yet drafted — use [/templates/new-feature.md](../templates/new-feature.md).

## PRD authoring order (suggested)
Draft PRDs first for the highest-risk/most-branched features: F-FIRMWARE (ADR-016), F-PAIRING (ADR-002/007), F-AI-VOICE/CHAT (ADR-008), F-ANC. Stubs exist for these; the rest are `TODO`.
