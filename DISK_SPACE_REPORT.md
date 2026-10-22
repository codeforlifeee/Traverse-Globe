# 💾 Comprehensive Disk Space & Developer Environment Report

This document contains a full analysis of your `C:` drive, detailing where your storage space is going, with a specific focus on developer environments, hidden caches, and heavy folders.

## 📊 1. Overall System Status
- **Total Capacity:** 475.95 GB
- **Used Space:** ~378 GB
- **Free Space:** 97.85 GB

---

## ⚙️ 2. Top System & Program Folders (Outside your User folder)
These are standard Windows and installed application files. They generally shouldn't be touched manually.

| Folder | Size | Notes |
| :--- | :--- | :--- |
| `C:\Windows` | **43.58 GB** | Normal size for a healthy Windows 10/11 installation. |
| `C:\Program Files` | **19.56 GB** | 64-bit applications (Safe to uninstall unused apps via Control Panel). |
| `C:\ProgramData` | **10.45 GB** | Shared application data. |
| `C:\Program Files (x86)` | **6.97 GB** | 32-bit applications. |
| `C:\$Recycle.Bin` | **3.03 GB** | Don't forget to empty your recycle bin! |

---

## 📂 3. Top Largest Folders in Your User Account (`C:\Users\LENOVO`)
This is where the majority of your personal files, downloads, and developer tools live.

| Folder | Size | Notes |
| :--- | :--- | :--- |
| **Desktop** | **37.33 GB** | Unusually large. Likely contains big video files, zip archives, or large project folders. |
| **anaconda3** | **24.15 GB** | Your Python/Conda data science environments. |
| **.gemini** | **19.28 GB** | System cache/artifacts for Google Antigravity IDE. |
| **Pictures** | **18.91 GB** | Personal images and media. |
| **Downloads** | **11.86 GB** | Safe to clear out old installers and zips. |
| **Videos** | **8.87 GB** | Personal video files. |

> **Hidden Space Note:** There is an estimated ~50GB-100GB of space used in `C:\Users\LENOVO\AppData` (Hidden) and system files like `hiberfil.sys`/`pagefile.sys`.

---

## 🗑️ 4. Developer Caches (100% Safe to Delete)
These caches hold downloaded packages so they install faster next time. **You can safely clear all of these without breaking your code.** If a project needs a package later, it will simply re-download it.

| Cache Name | Path | Size | Cleanup Command |
| :--- | :--- | :--- | :--- |
| **NPM Cache** | `~\AppData\Local\npm-cache` | **15.05 GB** | `npm cache clean --force` |
| **Pip Cache** | `~\AppData\Local\pip\cache` | **10.94 GB** | `pip cache purge` |
| **Anaconda Pkgs** | `~\anaconda3\pkgs` | **10.45 GB** | `conda clean --all -y` |
| **General Cache** | `~\.cache` | **1.97 GB** | *(Delete folder manually)* |
| **Gradle Cache** | `~\.gradle` | **1.78 GB** | *(Delete folder manually)* |
| **VSCode Exts** | `~\.vscode\extensions` | **1.54 GB** | *(Uninstall unused via VSCode)* |
| **Cargo Registry**| `~\.cargo\registry` | **0.98 GB** | `cargo cache -a` |

**Total Space Wasted by Caches: ~42.71 GB**

---

## 📦 5. Node.js Projects (`node_modules`)
The `node_modules` folder contains all javascript dependencies for your projects. **They are 100% safe to delete** if you aren't currently coding in that project. To get them back later, just open the project and run `npm install`.

| Project Path | Size |
| :--- | :--- |
| `Downloads\Generate Next.js Frontend_\node_modules` | **1.59 GB** |
| `Desktop\master\node_modules` | **486 MB** |
| `Desktop\Project\pluely-master\node_modules` | **486 MB** |
| `Desktop\Project\portfolio-tejas-surya\node_modules` | **395 MB** |
| `Downloads\Generate Next.js Frontend\node_modules` | **364 MB** |
| `Desktop\Project\Traverse-Globe\sanity-studio\node_modules` | **337 MB** |
| `Desktop\Project\Traverse-Globe\node_modules` | **198 MB** |
| `Desktop\Project\career-ops\node_modules` | **18 MB** |
| `Downloads\Dev (1)\Dev\NOTES\... (Various Tutorials)` | **~25 MB** |

**Total Space tied up in node_modules: ~3.8 GB**

---

## 🐍 6. Python Virtual Environments (`.venv`)
Virtual environments isolate python dependencies. If you aren't actively working on the project, you can safely delete the `.venv` folder and recreate it later with `python -m venv .venv`.

| Project Path | Size |
| :--- | :--- |
| `Desktop\TelegramAutomation\.venv` | **320.25 MB** |
| `Desktop\LLMC\.venv` | **123.53 MB** |
| `Desktop\Project\Traverse-Globe\.venv` | **19.77 MB** |
| `Downloads\Generate Next.js Frontend_\.venv` | **10.60 MB** |

**Total Space tied up in venvs: ~474 MB**

---

## ✅ Action Plan for Reclaiming Space
To immediately free up massive amounts of storage without risking your personal files or breaking your code, open **PowerShell** or **Command Prompt** and run the following commands one by one:

```powershell
npm cache clean --force
```
```powershell
pip cache purge
```
```powershell
conda clean --all -y
```

After doing that, consider deleting the `node_modules` folders from the old projects in your Downloads and Desktop folders.
