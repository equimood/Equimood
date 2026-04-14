# 📹 Comment ajouter des vidéos dans l'app

## 🎥 Vidéos depuis ton iPhone

### ✅ Tes vidéos iPhone sont PARFAITES !
- Format natif : MOV (H.264) ou MP4
- Résolution : 1080p (idéal pour mobile)
- Qualité : Professionnelle ✨

---

## 📱 Étapes pour ajouter une vidéo

### 1️⃣ **Transférer depuis iPhone vers Mac**
- **AirDrop** : iPhone → Mac (le plus simple)
- Ou **iCloud Photos** : Télécharger sur Mac
- Ou **Câble USB** : Importer avec Photos.app

### 2️⃣ **Optimiser la vidéo (optionnel)**

#### Option A : Utiliser iMovie (gratuit Mac)
1. Ouvrir la vidéo dans iMovie
2. Fichier → Partager → Fichier
3. Choisir **"Haute - 720p"**
4. Sauvegarder avec un nom clair : `interview-mathilde.mp4`

#### Option B : Utiliser QuickTime (gratuit Mac)
1. Ouvrir la vidéo dans QuickTime
2. Fichier → Exporter vers → 720p
3. Sauvegarder

#### Option C : Utiliser HandBrake (gratuit, plus d'options)
1. Télécharger HandBrake : https://handbrake.fr
2. Glisser ta vidéo
3. Preset : **"Fast 720p30"**
4. Cliquer "Start Encode"

### 3️⃣ **Ajouter dans l'app**
1. Copier ta vidéo ici : `/assets/videos/`
2. Nommer clairement : `interview-mathilde.mp4`

### 4️⃣ **Utiliser dans le code**

#### Dans experts.tsx (exemple) :
```tsx
import VideoPlayer from '@/components/VideoPlayer';

// Dans ton composant :
<VideoPlayer 
  videoFile={require('@/assets/videos/interview-mathilde.mp4')}
  title="Interview Mathilde Level"
  onClose={() => {/* fermer la vidéo */}}
/>
```

---

## 📊 Recommandations de format

### ✅ Format idéal
- **Extension** : `.mp4`
- **Résolution** : 720p (1280x720) ou 1080p (1920x1080)
- **Codec vidéo** : H.264
- **Codec audio** : AAC
- **Bitrate** : 2-5 Mbps
- **Taille fichier** : < 50 Mo pour vidéos courtes (5-10 min)

### ⚠️ Attention aux gros fichiers
- Si vidéo > 50 Mo → Optimiser avec HandBrake
- Si vidéo > 100 Mo → Envisager hébergement externe (Vimeo, YouTube)

---

## 🎬 Types de vidéos pour l'app

### Côté pros (experts.tsx)
- Interviews d'experts
- Démonstrations techniques
- Conseils professionnels

### Bibliothèque (library.tsx)
- Tutoriels
- Exercices guidés
- Masterclass

---

## 🚀 Test dans le simulateur

1. Ajouter ta vidéo dans `/assets/videos/`
2. Relancer l'app : `npx expo start`
3. La vidéo devrait se charger automatiquement

---

## 💡 Astuces

### Orientation recommandée
- **Paysage (16:9)** : Idéal pour interviews, démonstrations
- **Portrait (9:16)** : Ok pour témoignages courts

### Durée recommandée
- Interviews : 5-15 minutes
- Tutoriels : 3-10 minutes
- Témoignages : 1-3 minutes

### Miniature (poster)
Tu peux ajouter une image de couverture :
1. Extraire une frame de la vidéo (QuickTime → cmd+E)
2. Sauvegarder : `interview-mathilde-poster.jpg`
3. Placer dans `/assets/images/`

---

## 🆘 Besoin d'aide ?

Demande à @hamett pour intégrer une nouvelle vidéo dans l'app ! 🎯
