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
        // insert licence icon
        var licence_spans = document.getElementsByClassName('cc-licence')
        for (var span of licence_spans) {
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

        var video_info_date_views = document.getElementsByClassName('video-info-date-views')
        for (var view of video_info_date_views) {
          view.insertAdjacentHTML('beforeend', licence_span.outerHTML)
        }

        // insert licence metadata
        // Set Title metadata
        let videoInfoNameElems = document.getElementsByClassName('video-info-name')
        Array.from(videoInfoNameElems).map(e => {
          e.setAttribute('xmlns:dct', 'http://purl.org/dc/terms/')
          e.setAttribute('property', 'dct:title')
        })

        // Set Author metadata
        let accountPageLinkElem = document.querySelector('[title="Account page"]');
        if (accountPageLinkElem) {
          accountPageLinkElem.setAttribute('xmlns:cc', 'https://creativecommons.org/ns#')
          accountPageLinkElem.setAttribute('property', 'cc:attributionName')
        }

        // Set Work URL metadata
        let canonicalLinkElem = document.querySelector('[rel="canonical"]');
        canonicalLinkElem.insertAdjacentHTML(
          'afterend', 
          `<link 
            xmlns:cc="https://creativecommons.org/ns#"
            href="${canonicalLinkElem.getAttribute('href')}"
            property="cc:attributionName"
            rel="cc:attributionURL"
          >`
        );
      }
    }
  })
}

export {
  register
}
