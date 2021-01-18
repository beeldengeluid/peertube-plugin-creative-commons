async function register ({
  registerHook,
  registerSetting,
  settingsManager,
  storageManager,
  videoCategoryManager,
  videoLicenceManager,
  videoLanguageManager
}) {

  videoLicenceManager.deleteLicence(1)
  videoLicenceManager.deleteLicence(2)
  videoLicenceManager.deleteLicence(3)
  videoLicenceManager.deleteLicence(4)
  videoLicenceManager.deleteLicence(5)
  videoLicenceManager.deleteLicence(6)
  // videoLicenceManager.deleteLicence(7)

  videoLicenceManager.addLicence(1, 'CC-BY')
  videoLicenceManager.addLicence(2, 'CC-BY-SA')
  videoLicenceManager.addLicence(3, 'CC-BY-ND')
  videoLicenceManager.addLicence(4, 'CC-BY-NC')
  videoLicenceManager.addLicence(5, 'CC-BY-NC-SA')
  videoLicenceManager.addLicence(6, 'CC-BY-NC-ND')
  // videoLicenceManager.addLicence(7, 'CC0')

}

async function unregister () {
  return
}

module.exports = {
  register,
  unregister
}
