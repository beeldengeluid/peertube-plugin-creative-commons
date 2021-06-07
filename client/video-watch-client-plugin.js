function register ({ registerHook, peertubeHelpers }) {
  // TODO declare licence info in external place
  // TODO DRY use across client and server?
  const CC_VIDEO_LICENCES = {
    1: {
      label: "CC-BY",
      image: "https://licensebuttons.net/l/by/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by/4.0/" 
    },
    2: {
      label: "CC-BY-SA",
      image: "https://licensebuttons.net/l/by-sa/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by-sa/4.0/" 
    },
    3: {
      label: "CC-BY-ND",
      image: "https://licensebuttons.net/l/by-nd/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by-nd/4.0/" 
    },
    4: {
      label: "CC-BY-NC",
      image: "https://licensebuttons.net/l/by-nc/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by-nc/4.0/" 
    },
    5: {
      label: "CC-BY-NC-SA",
      image: "https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by-nc-sa/4.0/" 
    },
    6: {
      label: "CC-BY-NC-ND",
      image: "https://licensebuttons.net/l/by-nc-nd/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by-nc-nd/4.0/" 
    },
    7: {
      label: "CC0",
      image: "https://licensebuttons.net/l/zero/1.0/80x15.png",
      href: "https://creativecommons.org/publicdomain/zero/1.0/" 
    },
    8: {
      label: "PDM",
      image: "https://licensebuttons.net/l/publicdomain/80x15.png",
      href: "https://creativecommons.org/publicdomain/mark/1.0/"
    }
  }

  let videoLicence;

  registerHook({
    target: 'filter:api.video-watch.video.get.result',
    handler: video => {
      videoLicence = video.licence
      return video
    }
  })

  registerHook({
    target: 'action:video-watch.video.loaded',
    handler: ( videojs, video ) => {
      // Insert licence icon next to date and views info elements
      {
        if (videoLicence && videoLicence.id != 0) {
          let licenceHref    = CC_VIDEO_LICENCES[videoLicence.id].href;
          let licenceIconSrc = CC_VIDEO_LICENCES[videoLicence.id].image;

          let infoElems = document.getElementsByClassName('video-info-date-views')
          
          Array.from(infoElems).map(e => e.insertAdjacentHTML(
            'beforeend', 
            ` • 
            <a rel="license" href="${licenceHref}" target="_blank">
              <img src="${licenceIconSrc}" />
            </a>`
          ));
        }
      }
    }
  })  

  // Why does infoElems in video-watch.video.loaded handler remain empty without this hook? 
  registerHook({
    target: 'filter:internal.video-watch.player.build-options.result',
    handler: (result, params) => {
      return result
    }
  })
}

export {
  register
}
