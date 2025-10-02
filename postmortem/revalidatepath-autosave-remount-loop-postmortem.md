# Postmortem: revalidatePath during autosave caused remount loop on /notes

Date: 2025-10-01
Status: Resolved (documentation + rule in Coding Rules)

## Summary
- Every autosave of a note triggered `revalidatePath('/notes')` and `revalidatePath(/notes/${id})` in the update action.
- This invalidated the route during active editing, forcing a full rerender and remount of `NoteEditorSection` on each save.
- Result: Editor unmounted/mounted repeatedly, user could not continue typing; logs showed continuous mount/unmount and save cycles.

## Root Cause
- Using `revalidatePath` for frequent, incremental content updates in an actively mounted route (/notes) resets the entire route tree, including the editor.
- The editor’s debounced autosave cycle wrote to the DB, then invalidated the route, which remounted the editor and re-triggered another save.

## Fix
- Removed `revalidatePath('/notes')` and `revalidatePath(/notes/${id})` from `db/actions/local/notes-actions.local.ts:updateNote`.
- Kept revalidation only for create/delete flows where a lightweight refresh of listings is desired, not during content editing.
- Rely on client-side update flows (NotesContext + Tiptap callbacks) for UI state:
  - `onSaved()` to update local saving indicators
  - `invalidateCache(contentId, 'note')` to mark cached content stale
  - Optional `refreshData()` if a targeted refetch is needed

## Preventive Rule (Added to Coding Rules)
- Do NOT call `revalidatePath` from autosave-like actions that run while an editor or heavy client UI is mounted.
- Instead, update UI using client context/state and invalidate local caches. Only revalidate on create/delete or when switching routes.

## Developer Guidance
- For editors with debounced saves:
  - Server action: write only, avoid revalidate; return the updated record if callers require it.
  - Client: show saving/saved via state; update caches optimistically or on `onSaved()`.
- For list views or sidebars that depend on server cache, revalidate selectively after explicit user actions (create/delete), not during typing.

## Evidence (redacted)
- Console log excerpts showed rapid succession of `NoteEditorSection MOUNTED/UNMOUNTED` and autosave logs.

## Follow-ups
- Align all content editors (notes, diagrams) to the same pattern (already done for diagrams previously).
