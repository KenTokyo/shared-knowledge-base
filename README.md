# 📚 Shared Knowledge Base

This repository serves as a central "Single Source of Truth" for shared documentation, such as `agents` configurations and `refactoring-docs`. It is designed to be integrated into multiple projects as a Git Submodule.

---

## 🚀 How to Integrate into a Project

Follow these steps in the root directory of the project where you want to include this documentation.

### 1. Backup & Remove Old Folders (Optional but Recommended)

If you have existing `agents` or `refactoring-docs` folders, back them up first by renaming them:

```bash
# Use 'ren' on Windows CMD, 'mv' on Git Bash/Linux/macOS
ren agents agents_backup
ren refactoring-docs refactoring-docs_backup
```

### 2. Add as a Submodule

Add this repository as a submodule. The documentation will be placed in a `shared/docs` folder to keep it separate from project-specific code. Replace `<REPO_URL>` with the actual URL of this repository.

```bash
git submodule add https://github.com/KenTokyo/shared-knowledge-base shared-docs

git submodule remove https://github.com/KenTokyo/shared-knowledge-base shared/docs
```

### 3. Commit the Integration

The addition of a submodule is a change to your main project that needs to be committed.

```bash
git add .
git commit -m "feat: Integrate shared knowledge base as submodule"
```

---

## 🔄 How to Work with the Submodule

### Cloning a Project That Already Has This Submodule

To clone a project and initialize the submodule's contents at the same time:

```bash
git clone --recurse-submodules <MAIN_PROJECT_URL>
```

If you've already cloned the project without the submodule's content, run this:

```bash
git submodule update --init --recursive
```

### Updating the Knowledge Base to the Latest Version

To pull the latest changes from this `shared-knowledge-base` repository into your main project:

```bash
git submodule update --remote
```

This will fetch the latest commit from the submodule. This change (the new submodule commit pointer) must then be committed in your main project:

```bash
git add shared/docs
git commit -m "docs: Sync latest knowledge base"