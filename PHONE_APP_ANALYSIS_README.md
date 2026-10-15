# 📱 POCO X4 Pro 5G - Deep App Storage Analysis

This report provides an advanced, byte-by-byte breakdown of the hidden system data, app caches, and orphaned files currently filling up your internal storage.

## 🚨 The Core Problem
Your Internal Storage is at **97% capacity (40 GB / 42 GB used)**. 
Because Android hides the exact size of internal app databases and private caches from standard file managers, it looks like "System Data" is taking up all your space. By querying the Android Package Manager directly, we've exposed exactly which apps are hoarding your storage.

---

## 🕵️‍♂️ Top 12 Heaviest Apps (Hidden Data & Caches)
These apps are responsible for the vast majority of your missing storage. Most of this space is taken up by temporary caches, voice packs, and thumbnails that can be safely deleted.

| App Name | Package Name | Total Size | Action / Notes |
| :--- | :--- | :--- | :--- |
| **Google Play Services** | `com.google.android.gms` | **2.25 GB** | Safe to clear. Go to *Settings > Apps > Google Play Services > Manage Space > Clear All Data*. |
| **MIUI Gallery** | `com.miui.gallery` | **2.24 GB** | Huge thumbnail cache and items stuck in the "Trash" bin. Empty the gallery trash bin and clear the app cache. |
| **WhatsApp** | `com.whatsapp` | **1.49 GB** | Chat databases, voice notes, and media. Back up chats to Google Drive and delete forwarded videos. |
| **Google Speech Services**| `com.google.android.tts` | **1.06 GB** | Offline voice packs. Safe to clear data if you don't use offline translation. |
| **Google Search** | `com.google.android.googlequicksearchbox` | **1.00 GB** | Search history and Google Assistant data. Safe to clear. |
| **Phone / Dialer** | `com.google.android.dialer` | **827 MB** | Usually caused by saved Call Recordings. Check for old recordings or clear the app cache. |
| **Google Photos** | `com.google.android.apps.photos` | **581 MB** | Thumbnail caches. Safe to clear cache. |
| **Document Scanner** | `com.indymobileapp.document.scanner` | **545 MB** | Scanned PDFs and images stored locally inside the app. |
| **Xiaomi Discover** | `com.xiaomi.discover` | **520 MB** | System bloatware. **Safe to clear data!** |
| **Chrome** | `com.android.chrome` | **505 MB** | Browsing history and website caches. **Safe to clear cache!** |
| **ReVanced Manager** | `com.revanced.net.revancedmanager` | **454 MB** | Patched APKs and update files left over in the manager. |
| **Telegram** | `org.telegram.messenger` | **426 MB** | Downloaded videos and gifs. Open Telegram > Settings > Data and Storage > Storage Usage > Clear Cache. |

---

## 👻 Orphaned Files in the `Android` Folder
The `Android` folder on your internal storage is currently consuming **18.7 GB**. However, the installed apps listed above only account for about ~12 GB of that space. 

This mismatch means you have **Orphaned Files**.

### What are Orphaned Files?
When you uninstall a heavy mobile game (like BGMI, PUBG, Call of Duty, or Genshin Impact), Android sometimes fails to delete the massive `.obb` expansion files associated with the game. These files are left behind as "orphans" and permanently take up gigabytes of space until manually deleted.

### How to Fix the `Android` Folder:
1. Open your phone's built-in **File Manager**.
2. Navigate to `Internal Storage -> Android -> obb`.
3. Look closely at the folder names (e.g., `com.tencent.ig`, `com.activision.callofduty.shooter`).
4. **Delete any folder** that belongs to a game or app you have already uninstalled.
5. Do the same for the `Internal Storage -> Android -> data` folder.

---

## ☁️ Bonus Tip: TeraBox / Dubox
Don't forget that your **SD Card** has a folder named `Dubox` taking up **10.9 GB**. This is TeraBox hoarding cached videos. Clearing that from the TeraBox app settings will give your SD card even more breathing room!
