# Chrome automation isolation

## Initial goal
[User request](prompt.md).

## Recovery
- [x] Inspect running processes: only two headless personal Chrome instances, ports 9481 and 9571, using scratch profiles from Voxel Samurai Reborn and Shardfall.
- [x] Send SIGTERM only after checking exact PID, executable and headless/port arguments. No profile deletion.
- [x] Open normal Chrome with Computer Use. Native window returned; user confirmed it works.

## Prevention
- [x] Replace the three Voxel launch defaults and three local Shardfall scratch launch defaults with separately identified Chrome for Testing.
- [x] Add executable realpath and macOS bundle identity validation, including explicit environment overrides. No personal Chrome fallback and no version-number gate.
- [x] Add the isolation rule to shared coding guidance.
- [x] Both helpers resolve the separate installed app and reject explicit personal Chrome overrides. All six launchers pass node --check. Voxel launcher started Chrome for Testing 145.0.7632.6 on isolated port 19641; native Computer Use could read the normal Chrome window concurrently. Verification browser was terminated afterwards.
- [x] Commit and push owned files only. Voxel 7a4b8d7, Shardfall 4174f55, shared guidance 43f9496; all three remote heads matched after push. Existing game edits and untracked work remain untouched. Shared upstream changes merged, retaining both the no-focus rule and app isolation.

## Scope and limits
The installed separate test app is Chrome for Testing 145.0.7632.6 (`com.google.chrome.for.testing`); personal Chrome is 153.0.8010.54 (`com.google.Chrome`). Performance comparisons must establish a new baseline with the same test version. Existing scratch profiles are retained. The three scratch launchers are local ignored files; their backups are in `/tmp/chrome-isolation-20260926`. Other historical/archived launch scripts exist outside the two affected projects and are not silently rewritten. Shared guidance is prevention for future work, not an OS-wide interception barrier against arbitrary external commands. No claim that every possible Chrome failure is eliminated.

## Additional verification and remaining boundaries
- A symlink to personal Chrome is also rejected after realpath resolution. A missing explicit executable fails without falling back to personal Chrome.
- The temporary verification browser exited. Personal Chrome continued as PID 7044 without test arguments. The two original scratch browser sessions were stopped; their game automation sessions were not resumed.
- Game builds were not used as evidence for this operating-system/app-identity fix. Launch syntax, direct process identity, guard checks and native normal-browser access were checked instead.
- Shardfall deployment status has no published GitHub status or deployment record for the tools-only commit; no live-site deployment success is claimed. Local browser isolation does not depend on web deployment.
- Closing the user’s working Chrome again solely to retest a cold start was deliberately avoided. Existing archived launchers outside the two affected projects are not protected by these per-project helpers until migrated.
