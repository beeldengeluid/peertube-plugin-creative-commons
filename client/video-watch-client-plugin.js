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

  registerHook({
    target: 'filter:api.video-watch.video.get.result',
    handler: video => {

      video.licence.image = CC_VIDEO_LICENCES[video.licence.id].image
      video.licence.href = CC_VIDEO_LICENCES[video.licence.id].href

      return video

    }
  })

  registerHook({
    target: 'action:video-watch.video.loaded',
    handler: ( {videojs, video} ) => {

      if (video.licence && video.licence.id != 0) {

        if (document.getElementById('cc-licence')) {
          var licence_span = document.getElementById('cc-licence')
        } else {
          var licence_span = document.createElement('span')
        }

        licence_span.id = 'cc-licence'
        licence_span.innerHTML = ' • '

        var licence_link = document.createElement('a')
        licence_link.rel = 'license'
        licence_link.href = video.licence.href
        licence_link.target = '_blank'

        var licence_button = document.createElement('img')
        licence_button.src = video.licence.image

        licence_link.appendChild(licence_button)
        licence_span.appendChild(licence_link)

        let video_info_date_views = document.getElementsByClassName('video-info-date-views')

        Array.from(video_info_date_views).map(e => e.appendChild(licence_span))

      }
    }
  })  

  // Why does infoElems in video-watch.video.loaded handler remain empty without this hook? 
  // registerHook({
  //   target: 'filter:internal.video-watch.player.build-options.result',
  //   handler: (result, params) => {
  //     return result
  //   }
  // })
}

export {
  register
}
