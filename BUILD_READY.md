BUILD READY - EquiMood
======================

But : préparer un état propre à transmettre à un développeur pour qu'il puisse reconstruire les builds iOS / Android / Web sans modifier la production Netlify.

IMPORTANT : je n'ai modifié aucun fichier de code ni de configuration en production. Ce document contient :

- une checklist pour vérifier l'environnement
- les commandes à exécuter pour générer les builds (web et iOS)
- l'emplacement des fichiers importants et des assets
- un petit script non intrusif pour collecter les versions d'outils (`scripts/collect_build_info.sh`)

1) Fichiers et infos importants
-------------------------------

- `app.json` — configuration Expo (bundleId iOS : `com.emiliecolli.EquiMood`).
- `eas.json` — profils EAS build (profil `production` autoIncrement activé). `ascAppId` présent : 6760657966.
- `netlify.toml` — pipeline web utilisé par Netlify (commande : `npx expo export -p web && cp -r public/* dist/`).
- Dossiers d'assets : `assets/` (images, audio, fonts, videos), `public/` (fichiers web générés).
- iOS native : `ios/Podfile` (platform : iOS 18.0), `ios/Podfile.properties.json` si présent.

2) Versions recommandées
------------------------

- Node.js >= 20 (Netlify indique `NODE_VERSION = "20"`).
- eas-cli >= 18.0.1 (requis par `eas.json`).
- Xcode compatible avec iOS deployment target 18.0 (sur macOS pour build iOS local).
- CocoaPods installé (`pod`) pour installer dépendances iOS.

3) Commands utiles (à exécuter localement) — ne rien exécuter sur le site de production
-----------------------------------------------------------------------------------

Install dependencies:

```bash
# depuis la racine du projet
node --version  # vérifier version
npm ci          # installe proprement à partir du package-lock si présent, sinon `npm install`
```

Web (générer ce que Netlify déploie) :

```bash
# génère le site statique utilisé par Netlify
npx expo export -p web
# la commande ci-dessus produit un dossier `web-build`/ou `dist` selon config; Netlify copie `public/*` vers `dist/` dans netlify.toml
```

iOS (EAS build — recommandé pour App Store Connect) :

```bash
# installer/exiger eas-cli >= 18
npm install -g eas-cli@latest
# vérifier que l'utilisateur a accès au compte Apple et aux credentials
eas login
# build production (dans le cloud) — génère l'archive .ipa prête pour App Store
eas build -p ios --profile production
# submit si souhaité (nécessite credentials Apple) :
eas submit -p ios --profile production
```

Notes pour iOS local (si nécessaire) :

```bash
# sur macOS avec Xcode installé
cd ios
pod install
open EquiMood.xcworkspace
# ensuite archive via Xcode ou utiliser `xcodebuild` si requis
```

4) Préserver les credentials
----------------------------

Ne pas inclure les clés privées, profils de provisioning, ou mots de passe dans le zip que vous partagerez. Demande au développeur de fournir l'accès Apple (ou de configurer EAS credentials) séparément.

5) Packaging à fournir au développeur
------------------------------------

- Une archive ZIP (ou un partage cloud) contenant :
  - `app.json`, `eas.json`, `package.json`, `tsconfig.json`
  - le dossier `ios/` complet (sans modifier)
  - le dossier `android/` s'il existe (ici le repo est Expo-managed)
  - le dossier `assets/` et `public/`
  - ce fichier `BUILD_READY.md`

6) Script non-intrusif
----------------------

Exécutez `scripts/collect_build_info.sh` (fourni) pour collecter les versions d'outils et un état succinct du dépôt. Le script ne modifie rien.

7) Checklist rapide à donner au développeur
-----------------------------------------

- [ ] Node >= 20
- [ ] eas-cli >= 18 (ou version spécifiée)
- [ ] accès Apple/ASC ou accès aux credentials EAS
- [ ] Xcode récent compatible iOS 18 si build local
- [ ] CocoaPods installé et `pod install` OK

8) Questions à confirmer avec toi (ou le dev)
--------------------------------------------

- Le développeur utilisera-t-il EAS cloud build ou un Mac local pour générer l'IPA ?
- Voulez-vous que je crée l'archive ZIP contenant les fichiers listés ci-dessus (je peux la préparer mais je ne l'enverrai pas) ?

---

Fichier ajouté : `scripts/collect_build_info.sh` (exécutable, non intrusif).
