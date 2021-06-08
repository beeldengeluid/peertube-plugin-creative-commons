async function register ({
  registerHook,
  videoLicenceManager,
}) {

  videoLicenceManager.deleteLicence(1)
  videoLicenceManager.deleteLicence(2)
  videoLicenceManager.deleteLicence(3)
  videoLicenceManager.deleteLicence(4)
  videoLicenceManager.deleteLicence(5)
  videoLicenceManager.deleteLicence(6)
  videoLicenceManager.deleteLicence(7)
  
  videoLicenceManager.addLicence(1, 'CC BY 4.0')
  videoLicenceManager.addLicence(2, 'CC BY-SA 4.0')
  videoLicenceManager.addLicence(3, 'CC BY-ND 4.0')
  videoLicenceManager.addLicence(4, 'CC BY-NC 4.0')
  videoLicenceManager.addLicence(5, 'CC BY-NC-SA 4.0')
  videoLicenceManager.addLicence(6, 'CC BY-NC-ND 4.0')
  videoLicenceManager.addLicence(7, 'CC0 1.0')
  videoLicenceManager.addLicence(8, 'Public Domain Mark 1.0')

}

async function unregister () {
  return
}

module.exports = {
  register,
  unregister
}
