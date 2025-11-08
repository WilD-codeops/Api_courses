let listeCourses = [
  { id: 1, nom: "Lait", quantite: 1, achete: false },
  { id: 2, nom: "Pain", quantite: 2, achete: false },
  { id: 3, nom: "Pommes", quantite: 6, achete: true },
];

function getAll() {
  return listeCourses;
}

function getById(id) {
  return listeCourses.find((article) => article.id === id);
}

function insert(nom, quantite) {
  function idAutoincrement() {
    const lastArticle = listeCourses.at(-1);
    const lastId = lastArticle ? lastArticle.id : 0; // ternaire si le tableau est vide, id = 0
    return lastId + 1;
  }

  const newArticle = {
    id: idAutoincrement(),
    nom: nom,
    quantite: quantite,
    achete: false,
  };

  listeCourses.push(newArticle);
  return newArticle;
}

function update(id, data) {
  const article = getById(id);
  if (!article) return null;

  // mise à jour des propriétés
  if (data.nom !== undefined) article.nom = data.nom;
  if (data.quantite !== undefined) article.quantite = data.quantite;
  if (data.achete !== undefined) article.achete = data.achete;

  return article;
}

function deleteArticle(id) {
  const index = listeCourses.findIndex((article) => article.id === id); //findindex() renvoie la position de l'objet dans le tableau et -1 si vide
  if (index === -1) return false;

  listeCourses.splice(index, 1); //supprime nb éléments (1) à partir de la position position "index"
  return true;
}

function clearAll() {
  listeCourses = [];
  return true;
}

module.exports = { getAll, getById, insert, update, deleteArticle, clearAll };
