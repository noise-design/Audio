# Screen Registry (S-*)

Stable screen IDs. ~106 screen classes total (~12 Activities + ~94 Fragments, ~15 of them dialogs/bottom-sheets) + ~15 nav-only bottom-sheet destinations. Registered below by area with owning `F-*`, nav id, and "affected-by" (features that can change the screen). Cross-ref flows in [flows.md](flows.md).

Columns: **S-ID** · screen (navId) · owning F-* · states implemented · affected-by.

## Onboarding / auth (S-ONB-*, S-AUTH-*)
| S-ID | Screen (navId) | F-* | States | Affected-by |
|---|---|---|---|---|
| S-ONB-01 | SplashActivity | F-ONBOARDING | routing, privacy-sheet | force-OTA (F-FIRMWARE) |
| S-AUTH-01 | LoginFragmentV2 (loginFragmentV2) | F-AUTH | idle, loading, error | google/guest paths |
| S-AUTH-02 | EmailLoginFragment (EmailLogin) | F-AUTH | idle, invalid, loading | — |
| S-AUTH-03 | EmailOtpFragment (EmailOtpLogin) | F-AUTH | idle, invalid, resend, loading | — |
| S-AUTH-04 | PhoneLoginFragment / PhoneOtpVerifyFragment | F-AUTH | idle, invalid, loading | — |
| S-AUTH-05 | UserProfileFragment (UserProfile) | F-AUTH | idle, saving, error | — |
| S-ONB-02 | WalkThroughParentFragment (walkthroughOnboard) | F-ONBOARDING | pager | device-type (HW-*) |
| S-ONB-03 | PersonalizedFragment / DeviceInfoWalkAroundFragment | F-ONBOARDING | — | HW-* |

## Pairing (S-PAIR-*)
| S-PAIR-01 | ScanningFragment (scanningFragment) | F-PAIRING | scanning, found, not-found, BLE-off, no-permission | HW-* patterns |
| S-PAIR-02 | SetUpYourDeviceFragment | F-PAIRING | idle | HW-* |
| S-PAIR-03 | FindDeviceListV2Fragment | F-PAIRING | list, empty | HW-* |
| S-PAIR-04 | PairingFragmentV2 (pairingFragmentV2) | F-PAIRING | connecting, success, failed, DFU | HW-*, F-FIRMWARE |
| S-PAIR-05 | MeetDeviceFragment | F-PAIRING | video/intro | HW-* |
| S-PAIR-06 | ScanTryAgainFragment / DidntFindYoursFragment | F-PAIRING | retry, help | — |

## Home & device controls (S-HOME-*, S-CTRL-*)
| S-HOME-01 | HomeFragment (homeFragment) | F-HOME | connected, disconnected, reconnecting, battery-states, music | ALL device features, HW-* |
| S-CTRL-ANC | ActiveNoiseCancellationFragment (ancFragment) | F-ANC | off/transparency/anc, levels, disconnected | HW-* (F-ANC map) |
| S-CTRL-EQ | EqualizerFragment / EqualizerMaxFragment | F-EQ | presets, custom bands, disconnected | HW-* (EQ vs EQ_9) |
| S-CTRL-SND | SoundControlsFragment / AudioBoostFragment | F-SOUND | toggles, disconnected | HW-* |
| S-CTRL-TCH | TouchGestureFragmentV2 (touchGestureV2) / CustomizingBudsFragment | F-TOUCH | gesture map, four-tap (ALT_BUDS_S/CLIP), isMax | HW-* |
| S-CTRL-MOT | MotionControlInfoFragment | F-MOTION | info, toggle | HW-* |
| S-CTRL-DUAL | DualPairingFragment (dualPairingFragment) | F-DUAL | device list, switching | HW-MBUDS-MAX |
| S-CTRL-SPA | SpatialInfoFragment / SpatialAudioWalkThroughFragment | F-SOUND | info, demo | HW-MBUDS-2 |
| S-CTRL-FIND | FindMyEarBudsFragment / FindMyHeadPhoneFragment | F-FINDMY | playing, disconnected | HW-* (buds vs headphone) |

## AI (S-AI-*)
| S-AI-01 | AIHomeFragment (aiHomeFragment) | F-AI-CHAT | idle | consent |
| S-AI-02 | AiTextChatFragment (aiTextChatFragment) | F-AI-CHAT | empty, streaming, error, limit-reached | — |
| S-AI-03 | ChatHistoryFragment | F-AI-CHAT | list, empty, delete | — |
| S-AI-04 | ActivateAiOnDeviceFragment / AudioAiCalibrationFragment | F-AI-VOICE | intro, calibrating | HW-* |
| S-AI-05 | AudioAiFragment (audioAiFragment) | F-AI-VOICE | idle, listening, speaking, no-network, idle-timeout, limit | — |
| S-AI-06 | WsTranscribeFragment / TranscriptionFragment | F-AI-TRANSCRIBE | recording, partial, error, rate-limit, quota-states | — |
| S-AI-07 | TranscriptionDetailsFragment / TranscriptionHistoryFragment | F-AI-TRANSCRIBE | detail, summarizing, list, empty | — |

## Firmware / settings / support (S-FW-*, S-SET-*, S-HELP-*)
| S-FW-01 | FirmwareUpdateFragment (firmwareUpdateFragment) | F-FIRMWARE | check, updating, verifying, reboot, success, failed, precheck-fail | HW-* (OTA quirks ADR-016) |
| S-SET-01 | SettingsFragmentV2 (settingsFragmentV2) | F-SETTINGS | list | HW-* (available items) |
| S-SET-02 | ManagePermissionsFragment / BackgroundManagementFragment / AppBatteryUsageFragment | F-SETTINGS | toggles | — |
| S-SET-03 | ForgotDeviceFragment (forgotDeviceFragment) | F-SETTINGS | confirm | HW-* |
| S-HELP-01 | HelpAndSupportFragment / FaqFragment / ReportIssueFragment / OwnerGuideWebViewFragment | F-HELP | list, expand (faq), submit, web | — |
| S-GUIDE-01 | ProductGuideFragment / ProductMB1GuideFragment / ProductMBClipGuideFragment / ProductHeadphoneGuideFragment | F-PRODUCT-GUIDE | pager, images | HW-* |

## Profile / warranty / rate / about / language (S-PROF-*, S-WAR-*, S-RATE-*, S-ABOUT-*, S-LANG-*)
| S-PROF-01 | UserInfoFragmentV2 / UserEditInfoFragmentV2 / AvatarCropperFragmentV2 | F-PROFILE | view, edit, crop, saving | — |
| S-WAR-01 | WarrantyFragment / WarrantyUserDetailFragment / DeviceWarrantyFragment | F-WARRANTY | form, states (pending/approved/expired/rejected/provisional) | HW-* |
| S-RATE-01 | RateAndEarnFragment / RateEarnUploadImageFragment | F-RATE-EARN | form, upload, reward | — |
| S-ABOUT-01 | AboutFragment (aboutFragment) / HowToWearFragment | F-ABOUT | info | HW-* |
| S-LANG-01 | AppLanguageFragment (appLanguageFragment) | F-LANGUAGE | list, save | — |
| S-UPD-01 | AppUpdateFragment / AppUpdateActivity (+ sheets) | F-APP-UPDATE | soft, force, success | — |

## Compose vs View
Compose bodies: S-HELP-01/Faq, S-LANG-01, S-SET-02/BackgroundManagement, S-ABOUT-01. All others are XML/View. See [../platforms/android.md](../platforms/android.md).

> **Rule:** every device-dependent screen (S-HOME-*, S-CTRL-*, S-FW-*) must implement the hardware states in [flows.md](flows.md) (disconnected/connecting/reconnecting/DFU) in addition to loading/empty/error.
