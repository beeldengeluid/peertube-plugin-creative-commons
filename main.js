async function register ({
  registerHook,
  videoLicenceManager,
}) {

  videoLicenceManager.deleteConstant(1)
  videoLicenceManager.deleteConstant(2)
  videoLicenceManager.deleteConstant(3)
  videoLicenceManager.deleteConstant(4)
  videoLicenceManager.deleteConstant(5)
  videoLicenceManager.deleteConstant(6)
  videoLicenceManager.deleteConstant(7)
  
  videoLicenceManager.addConstant(1, 'CC BY 4.0')
  videoLicenceManager.addConstant(2, 'CC BY-SA 4.0')
  videoLicenceManager.addConstant(3, 'CC BY-ND 4.0')
  videoLicenceManager.addConstant(4, 'CC BY-NC 4.0')
  videoLicenceManager.addConstant(5, 'CC BY-NC-SA 4.0')
  videoLicenceManager.addConstant(6, 'CC BY-NC-ND 4.0')
  videoLicenceManager.addConstant(7, 'CC0 1.0')
  videoLicenceManager.addConstant(8, 'Public Domain Mark 1.0')

}

async function unregister () {
  return
}

module.exports = {
  register,
  unregister
}
