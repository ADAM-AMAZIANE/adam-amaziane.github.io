# Adam Amaziane — Portfolio

Portfolio personnel d'**Adam Amaziane**, étudiant ingénieur en MIAGE à l'EMSI Tanger, à la recherche d'un stage de fin d'études (PFE).

Site en ligne : **https://adam-amaziane.github.io**

## Fonctionnalités

- Design "dark tech" avec thème clair / sombre (préférence mémorisée)
- Bilingue **Français / English** (préférence mémorisée)
- Animations : particules connectées, curseur personnalisé, effet machine à écrire, terminal animé, révélations au scroll, cartes avec effet tilt
- 100 % statique : HTML + CSS + JavaScript vanilla, aucune dépendance, aucun build
- Responsive (desktop, tablette, mobile) et accessible (navigation clavier, `prefers-reduced-motion`)
- Optimisé pour GitHub Pages (aucune configuration nécessaire)

## Structure

```
├── index.html              # Page unique
├── favicon.svg
├── assets/
│   ├── css/style.css       # Design system + thème clair/sombre
│   └── js/
│       ├── i18n.js         # Tout le contenu FR/EN (éditez ce fichier pour personnaliser)
│       └── main.js         # Animations, rendu des listes, interactions
```

## Personnaliser

- **Contenu** (projets, parcours, compétences, certifications, textes) : `assets/js/i18n.js`
- **Certifications** : remplir le tableau `I18N.fr.certs.items` (et son équivalent EN) avec `{ title, issuer, year, link }` — un objet par certification.
- **CV PDF** : déposer le fichier à l'emplacement `assets/CV-Adam-Amaziane.pdf` (depuis GitHub : *Add file → Upload files → glisser le PDF → Commit*). Le bouton « Télécharger le CV » fonctionne immédiatement ; tant que le PDF est absent, le bouton renvoie automatiquement vers LinkedIn.

## Déploiement

Le site est publié automatiquement par **GitHub Pages** depuis la branche `main` (dépôt `adam-amaziane.github.io`). Toute modification poussée sur `main` est en ligne en une à deux minutes.
