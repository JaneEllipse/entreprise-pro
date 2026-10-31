// Script du Google Sheet « Commandes Entreprise Pro ».
// Coller dans Extensions > Apps Script, puis déployer en « Application Web » (voir README dans la discussion).
// Chaque commande validée sur la page ajoute une ligne et vous envoie un email.

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sheet.appendRow([
    new Date(),
    d.num,
    d.pack,
    Number(d.total),
    Number(d.first),
    d.nom,
    d.entreprise,
    "'" + d.tel,
    d.email,
    "Nouvelle"
  ]);
  MailApp.sendEmail(
    Session.getEffectiveUser().getEmail(),
    "Nouvelle commande " + d.num + " · " + d.pack,
    d.nom + " · " + d.entreprise + "\nTél. : " + d.tel + "\nEmail : " + d.email +
      "\nTotal : " + d.total + " FCFA TTC\nÀ payer à la commande : " + d.first + " FCFA TTC"
  );
  return ContentService.createTextOutput("ok");
}

// Ouvrir l'adresse du script dans un navigateur affiche ce message : sert à vérifier que le déploiement est accessible.
function doGet() {
  return ContentService.createTextOutput("OK - le script des commandes est actif.");
}
