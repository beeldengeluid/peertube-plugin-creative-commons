function register ({ registerHook, peertubeHelpers }) {
  // TODO declare licence info in external place
  // TODO DRY use across client and server?
  const CC_VIDEO_LICENCES = {
    1: {
      label: "CC BY 4.0",
      image: "https://licensebuttons.net/l/by/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by/4.0/" 
    },
    2: {
      label: "CC BY-SA 4.0",
      image: "https://licensebuttons.net/l/by-sa/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by-sa/4.0/" 
    },
    3: {
      label: "CC BY-ND 4.0",
      image: "https://licensebuttons.net/l/by-nd/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by-nd/4.0/" 
    },
    4: {
      label: "CC BY-NC 4.0",
      image: "https://licensebuttons.net/l/by-nc/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by-nc/4.0/" 
    },
    5: {
      label: "CC BY-NC-SA 4.0",
      image: "https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by-nc-sa/4.0/" 
    },
    6: {
      label: "CC BY-NC-ND 4.0",
      image: "https://licensebuttons.net/l/by-nc-nd/4.0/80x15.png",
      href: "https://creativecommons.org/licenses/by-nc-nd/4.0/" 
    },
    7: {
      label: "CC0 1.0",
      image: "https://licensebuttons.net/l/zero/1.0/80x15.png",
      href: "https://creativecommons.org/publicdomain/zero/1.0/" 
    },
    8: {
      label: "Public Domain Mark 1.0",
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
    handler: ({ videojs, video, playlist }) => {

      {
        const licence_span = document.createElement('span')
        licence_span.id = 'cc-licence'
        licence_span.innerHTML = ' • '

        const licence_link = document.createElement('a')
        licence_link.rel = 'license'
        licence_link.href = video.licence.href
        licence_link.target = '_blank'

        const licence_button = document.createElement('img')
        licence_button.src = video.licence.image

        licence_link.appendChild(licence_button)
        licence_span.appendChild(licence_link)

        var plugin_placeholder = document.getElementById('plugin-placeholder-player-next')
        var licence_placeholder = document.getElementById('cc-licence')

        if (licence_placeholder) {
          plugin_placeholder.replaceChild(licence_span, licence_placeholder)
        } else {
          plugin_placeholder.appendChild(licence_span)
        }

        // let video_info_date_views = document.getElementsByClassName('video-info-date-views')

        // if (licence_placeholder) {
        //   Array.from(video_info_date_views).map(e => e.replaceChild(licence_span, licence_placeholder))
        // } else {
        //   Array.from(video_info_date_views).map(e => e.appendChild(licence_span))
        // }

      }

    }
  })

  // // Why does infoElems in video-watch.video.loaded handler remain empty without this hook? 
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
