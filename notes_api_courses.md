# 🗒️ Notes personnelles – API Liste de Courses (Node.js / Express)

## 1. Environnement et structure de base

### Installation et exécution

- Installer Express et Nodemon :
  ```bash
  npm install express
  npm install --save-dev nodemon
  ```
- Lancer le serveur avec Nodemon :
  ```bash
  npm start
  npx nodemon index.js
  ```
- Port par défaut : `http://localhost:3000`

### Architecture du projet

```
project/
├── models/
│   └── coursesModel.js
├── controllers/
│   └── coursesController.js
├── routes/
│   └── coursesRoutes.js
├── index.js
└── package.json
```

Chaque couche a une **responsabilité précise** :

| Couche         | Rôle principal                                                                  |
| -------------- | ------------------------------------------------------------------------------- |
| **Model**      | Gère les données (simulation d'une BDD avec un tableau, ou vraie DB plus tard). |
| **Controller** | Gère la logique métier et les réponses HTTP.                                    |
| **Router**     | Définit les chemins d’accès à chaque ressource (endpoints).                     |
| **Server.js**  | Point d’entrée, configure Express et monte les routes.                          |

---

## 2. Middleware essentiel : `express.json()`

### Pourquoi on l’utilise

`app.use(express.json())` est un **middleware** qui :

- lit le corps de la requête HTTP (request body),
- le **convertit en objet JS** utilisable via `req.body`.

Exemple :

```js
app.use(express.json());
```

### Sans ce middleware :

```js
console.log(req.body); // undefined
```

### Avec ce middleware :

```js
console.log(req.body); // { nom: "Pommes", quantite: 5 }
```

💡 **Résumé** :

- `Content-Type: application/json` → indique que le client envoie du JSON.
- `express.json()` → dit à Express comment le lire.

---

## 3. Les routes principales de l’API

### Exemple d’intégration dans `server.js`

```js
const express = require("express");
const app = express();
app.use(express.json());

const coursesRoutes = require("./routes/coursesRoutes");
app.use("/api/courses", coursesRoutes);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Serveur en ligne sur http://localhost:${PORT}`)
);
```

### Pourquoi `/api/courses` ?

C’est une convention :

- `/api/` → indique que c’est une API REST.
- `/courses` → la ressource manipulée.
  Cela donne des chemins clairs :
- `GET /api/courses` → liste complète
- `POST /api/courses` → ajout d’un article
- `PUT /api/courses/:id` → modifier un article
- `DELETE /api/courses/:id` → supprimer un article
- `DELETE /api/courses` → **vider la liste entière**

---

## 4. Les routes Express (router)

```js
const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/coursesController");

router.get("/", coursesController.index);
router.get("/:id", coursesController.show);

module.exports = router;
```

💡 Les fonctions comme `coursesController.show` sont **référencées** sans parenthèses,  
car Express les **appelle automatiquement** quand la route correspond.

---

## 5. Le modèle (`coursesModel.js`)

Le **model** simule une base de données avec un tableau JavaScript.

### Notes importantes :

- `undefined` → signifie “pas de valeur” (ex: élément non trouvé).
- On l’utilise souvent pour **détecter une absence de résultat**.
- Le `return false` est plus logique pour signaler un échec (par ex. suppression impossible).

---

## 6. Le contrôleur (`coursesController.js`)

C’est lui qui relie **Express (req, res)** et le **model** :

### Détails :

- `res.status(201)` → “Created” (ressource ajoutée avec succès).
- `res.status(204).send()` → “No Content” (rien à renvoyer, mais succès).
- `res.json()` → transforme un objet JS en JSON pour la réponse.

---

## 7. Pourquoi utiliser `!variable` (négation)

Dans :

```js
if (!updated) { ... }
```

cela signifie :

> “Si la variable `updated` est **falsy** (false, undefined, null, 0, ‘’), alors...”

C’est une manière concise d’écrire :

```js
if (updated === undefined || updated === false) { ... }
```

✅ Lisible et idiomatique en JavaScript.

---

## 8. Bonnes pratiques et conventions

- Utiliser **des noms cohérents** :  
  `index`, `show`, `store`, `update`, `destroy`, `clearAll`
- **Toujours parser `req.params.id`** avec `parseInt()`.
- **Toujours valider `req.body`** (par ex. vérifier que `nom` et `quantite` existent).
- Respecter les **codes HTTP standards** :
  | Code | Signification | Exemple d’usage |
  |------|----------------|----------------|
  | 200 | OK | Retour de données |
  | 201 | Created | Article ajouté |
  | 204 | No Content | Suppression réussie |
  | 400 | Bad Request | Données invalides |
  | 404 | Not Found | Article introuvable |
  | 500 | Server Error | Erreur inattendue |

---

## 9. Résumé global (logique de flux)

| Étape                       | Action                             |
| --------------------------- | ---------------------------------- |
| Client → POST /api/courses  | Envoie `{ nom, quantite }`         |
| `express.json()`            | Parse le corps JSON                |
| `coursesController.store()` | Appelle `coursesModel.insert()`    |
| `coursesModel.insert()`     | Crée un objet et le stocke         |
| Retour                      | `201 Created` avec l’objet en JSON |

---

### 💬 En résumé

> Express + CommonJS = architecture claire, simple et extensible.  
> Chaque couche (model, controller, route) a une mission propre.  
> L’API est prête à évoluer vers une vraie base de données (ex: MongoDB ou MySQL).
