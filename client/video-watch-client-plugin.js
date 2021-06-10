function register ({ registerHook, peertubeHelpers }) {
  
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
    target: 'action:video-watch.player.loaded',
    handler: ({ videojs, video, playlist }) => {
      {
        const licence_spans = document.getElementsByClassName('cc-licence')
        for (let span of licence_spans) {
          span.remove()
        }

        const licence_span = document.createElement('span')
        licence_span.className = 'cc-licence'
        licence_span.innerHTML = ' • '

        const licence_link = document.createElement('a')
        licence_link.rel = 'license'
        licence_link.href = video.licence.href
        licence_link.target = '_blank'

        const licence_button = document.createElement('img')
        licence_button.src = video.licence.image

        licence_link.appendChild(licence_button)
        licence_span.appendChild(licence_link)

        const video_info_date_views = document.getElementsByClassName('video-info-date-views')
        for (let element of video_info_date_views) {
          element.insertAdjacentHTML('beforeend', licence_span.outerHTML)
        }

        const video_info = document.getElementsByClassName('video-info')
        for (let element of video_info) {
          element.setAttribute('xmlns:dct', 'http://purl.org/dc/terms/')
          element.setAttribute('xmlns:cc', 'https://creativecommons.org/ns#')
        }

        const video_info_name = document.getElementsByClassName('video-info-name')
        for (let element of video_info_name) {
          element.setAttribute('property', 'dct:title')
        }

        const account_page_link = document.querySelector('[title="Account page"]');
        if (account_page_link) {
          account_page_link.firstElementChild.setAttribute('property', 'cc:attributionName')
          account_page_link.setAttribute('rel', 'cc:attributionURL dct:creator')
        }
      }
    }
  })
}

export {
  register
}
