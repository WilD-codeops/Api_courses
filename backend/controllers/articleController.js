const articleModel = require("../../backend/models/articleModel.js");

function index(req, res) {
  res.json(articleModel.getAll());
}

function show(req, res) {
  const id = parseInt(req.params.id);
  const article = articleModel.getById(id);

  if (!article) {
    res.status(404).json({ message: "Article non trouvé" });
  } else {
    res.status(200).json({ message: "Article trouvé", Article: article });
  }
}

function store(req, res) {
  const { nom, quantite } = req.body;
  const newArticle = articleModel.insert(nom, quantite);

  res.status(201).json({
    message: "Article ajouté avec succès",
    Article: newArticle,
  });
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;
  const articleUpdated = articleModel.update(id, data);

  if (!articleUpdated) {
    res.status(404).json({
      message: "Article non trouvé suppression impossible",
    });
  } else {
    res.status(200).json({ message: "Article modifié avec succès" });
  }
}

function destroy(req, res) {
  const id = parseInt(req.params.id);
  const articleDestroyed = articleModel.deleteArticle(id);

  if (!articleDestroyed) {
    res.status(404).json({
      message: "Article non trouvé suppression impossible",
    });
  } else {
    res.status(200).json({
      message: "Article supprimé avec succès",
    });
  }
}

function clear() {
  const listCleared = articleModel.clearAll();

  if (!listCleared) {
    res.status(500).json({
      message: "Erreur lors de la suppression de la liste",
    });
  } else {
    res.status(200).json({
      message: "Liste de courses effacée avec succès",
    });
  }
}

module.exports = { index, show, store, update, destroy, clear };
