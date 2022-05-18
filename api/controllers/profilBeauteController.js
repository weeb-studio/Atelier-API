const db = require('../models')
const ProfilBeaute = db.profilBeaute

exports.addProfil = (req, res) => {
   ProfilBeaute.findByIdAndRemove({})
}

exports.getProfil = (req, res) => {
   const id = req.params.id
   ProfilBeaute.findById(id)
      .exec()
      .then((resultat) => {
         return res.status(200).json(resultat)
      })
      .catch((err) => {
         console.log(err)
         res.status(500).json({
            message: 'Une erreur est survenue',
            error: err,
         })
      })
}
