(function () {
  var variant = document.body.getAttribute("data-header") || "light";

  function load(name) {
    return fetch("partials/" + name + ".html").then(function (response) {
      if (!response.ok) {
        throw new Error(name);
      }
      return response.text();
    }).then(function (html) {
      var template = document.createElement("template");
      template.innerHTML = html.trim();
      return template.content;
    });
  }

  var spriteSlot = document.querySelector('[data-partial="sprite"]');
  var spriteReady = spriteSlot
    ? load("sprite").then(function (content) {
        spriteSlot.replaceWith(content);
      })
    : Promise.resolve();

  spriteReady.then(function () {
    var slots = document.querySelectorAll("[data-partial]");
    return Promise.all(Array.prototype.map.call(slots, function (slot) {
      var name = slot.getAttribute("data-partial");
      return load(name).then(function (content) {
        if (name === "header") {
          var header = content.querySelector(".site-header");
          if (header) {
            header.classList.add("site-header--" + variant);
          }
          if (slot.hasAttribute("data-msearch-hook")) {
            var searchBtn = content.querySelector(".main-menu__search");
            if (searchBtn && msearchPanel) {
              msearchField = searchBtn;
              searchBtn.setAttribute("aria-expanded", "false");
              searchBtn.setAttribute("aria-controls", "msearch-panel");
              searchBtn.addEventListener("click", function () {
                setMsearchOpen(msearchPanel.hidden);
              });
            }
          }
        }
        slot.replaceWith(content);
      });
    }));
  }).catch(function (error) {
    console.error(error);
  });

  document.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  var destField = document.querySelector("[data-dest-open]");
  var destPanel = document.querySelector("[data-dest-panel]");
  var dateField = document.querySelector("[data-date-open]");
  var datePanel = document.querySelector("[data-date-panel]");
  var peopleField = document.querySelector("[data-people-open]");
  var peoplePanel = document.querySelector("[data-people-panel]");
  var msearchField = null;
  var msearchPanel = document.querySelector("[data-msearch-panel]");
  var sortField = document.querySelector("[data-sort-open]");
  var sortPanel = document.querySelector("[data-sort-panel]");
  var sortLabel = document.querySelector("[data-sort-label]");
  var galleryField = document.querySelector("[data-gallery-open]");
  var galleryPop = document.querySelector("[data-gallery-pop]");
  var videoStill = document.querySelector("[data-video-open]");
  var videoPop = document.querySelector("[data-video-pop]");
  var nightsField = document.querySelector("[data-nights-open]");
  var nightsPanel = document.querySelector("[data-nights-panel]");
  var nightsLabel = document.querySelector("[data-nights-label]");
  var transportField = document.querySelector("[data-transport-open]");
  var transportPanel = document.querySelector("[data-transport-panel]");
  var transportLabel = document.querySelector("[data-transport-label]");
  var boardField = document.querySelector("[data-board-open]");
  var boardPanel = document.querySelector("[data-board-panel]");
  var boardLabel = document.querySelector("[data-board-label]");
  var hdateField = document.querySelector("[data-hdate-open]");
  var hdatePanel = document.querySelector("[data-hdate-panel]");
  var hpeopleField = document.querySelector("[data-hpeople-open]");
  var hpeoplePanel = document.querySelector("[data-hpeople-panel]");
  var dayStates = ["default", "today", "from", "to", "between"];

  function setMsearchOpen(open) {
    if (!msearchPanel) {
      return;
    }
    if (open) {
      setDestOpen(false);
      setDateOpen(false);
      setPeopleOpen(false);
      setSortOpen(false);
      setGalleryOpen(false);
      setNightsOpen(false);
      setTransportOpen(false);
      setBoardOpen(false);
      setHdateOpen(false);
      setHpeopleOpen(false);
    }
    msearchPanel.hidden = !open;
    if (msearchField) {
      msearchField.setAttribute("aria-expanded", open ? "true" : "false");
    }
  }

  function setDestOpen(open) {
    if (!destField || !destPanel) {
      return;
    }
    if (open) {
      setDateOpen(false);
      setPeopleOpen(false);
      setMsearchOpen(false);
      setSortOpen(false);
      setGalleryOpen(false);
      setNightsOpen(false);
      setTransportOpen(false);
      setBoardOpen(false);
      setHdateOpen(false);
      setHpeopleOpen(false);
    }
    destPanel.hidden = !open;
    destField.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function setDateOpen(open) {
    if (!dateField || !datePanel) {
      return;
    }
    if (open) {
      setDestOpen(false);
      setPeopleOpen(false);
      setMsearchOpen(false);
      setSortOpen(false);
      setGalleryOpen(false);
      setNightsOpen(false);
      setTransportOpen(false);
      setBoardOpen(false);
      setHdateOpen(false);
      setHpeopleOpen(false);
    }
    datePanel.hidden = !open;
    dateField.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function setPeopleOpen(open) {
    if (!peopleField || !peoplePanel) {
      return;
    }
    if (open) {
      setDestOpen(false);
      setDateOpen(false);
      setMsearchOpen(false);
      setSortOpen(false);
      setGalleryOpen(false);
      setNightsOpen(false);
      setTransportOpen(false);
      setBoardOpen(false);
      setHdateOpen(false);
      setHpeopleOpen(false);
    }
    peoplePanel.hidden = !open;
    peopleField.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function setSortOpen(open) {
    if (!sortField || !sortPanel) {
      return;
    }
    if (open) {
      setDestOpen(false);
      setDateOpen(false);
      setPeopleOpen(false);
      setMsearchOpen(false);
      setGalleryOpen(false);
      setNightsOpen(false);
      setTransportOpen(false);
      setBoardOpen(false);
      setHdateOpen(false);
      setHpeopleOpen(false);
    }
    sortPanel.hidden = !open;
    sortField.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function setGalleryOpen(open) {
    if (!galleryPop) {
      return;
    }
    if (open) {
      setDestOpen(false);
      setDateOpen(false);
      setPeopleOpen(false);
      setMsearchOpen(false);
      setSortOpen(false);
      setNightsOpen(false);
      setTransportOpen(false);
      setBoardOpen(false);
      setHdateOpen(false);
      setHpeopleOpen(false);
    }
    if (!open && videoPop) {
      videoPop.hidden = true;
    }
    galleryPop.hidden = !open;
    if (galleryField) {
      galleryField.setAttribute("aria-expanded", open ? "true" : "false");
    }
    lockPageScroll();
    if (open) {
      var close = galleryPop.querySelector(".gallery-pop__close");
      if (close) {
        close.focus();
      }
    }
  }

  function lockPageScroll() {
    var galleryOpen = galleryPop && !galleryPop.hidden;
    var videoOpen = videoPop && !videoPop.hidden;
    document.body.style.overflow = (galleryOpen || videoOpen) ? "hidden" : "";
  }

  function setVideoOpen(open) {
    if (!videoPop) {
      return;
    }
    if (open) {
      setDestOpen(false);
      setDateOpen(false);
      setPeopleOpen(false);
      setMsearchOpen(false);
      setSortOpen(false);
      setNightsOpen(false);
      setTransportOpen(false);
      setBoardOpen(false);
      setHdateOpen(false);
      setHpeopleOpen(false);
    }
    videoPop.hidden = !open;
    lockPageScroll();
    if (open) {
      var videoClose = videoPop.querySelector(".video-pop__close");
      if (videoClose) {
        videoClose.focus();
      }
    } else if (videoStill && galleryPop && !galleryPop.hidden) {
      videoStill.focus();
    }
  }

  function setNightsOpen(open) {
    if (!nightsField || !nightsPanel) {
      return;
    }
    if (open) {
      setDestOpen(false);
      setDateOpen(false);
      setPeopleOpen(false);
      setMsearchOpen(false);
      setSortOpen(false);
      setGalleryOpen(false);
      setVideoOpen(false);
      setTransportOpen(false);
      setBoardOpen(false);
      setHdateOpen(false);
      setHpeopleOpen(false);
    }
    nightsPanel.hidden = !open;
    nightsField.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function setTransportOpen(open) {
    if (!transportField || !transportPanel) {
      return;
    }
    if (open) {
      setDestOpen(false);
      setDateOpen(false);
      setPeopleOpen(false);
      setMsearchOpen(false);
      setSortOpen(false);
      setGalleryOpen(false);
      setVideoOpen(false);
      setNightsOpen(false);
      setBoardOpen(false);
      setHdateOpen(false);
      setHpeopleOpen(false);
    }
    transportPanel.hidden = !open;
    transportField.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function setBoardOpen(open) {
    if (!boardField || !boardPanel) {
      return;
    }
    if (open) {
      setDestOpen(false);
      setDateOpen(false);
      setPeopleOpen(false);
      setMsearchOpen(false);
      setSortOpen(false);
      setGalleryOpen(false);
      setVideoOpen(false);
      setNightsOpen(false);
      setTransportOpen(false);
      setHdateOpen(false);
      setHpeopleOpen(false);
    }
    boardPanel.hidden = !open;
    boardField.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function setHdateOpen(open) {
    if (!hdateField || !hdatePanel) {
      return;
    }
    if (open) {
      setDestOpen(false);
      setDateOpen(false);
      setPeopleOpen(false);
      setMsearchOpen(false);
      setSortOpen(false);
      setGalleryOpen(false);
      setVideoOpen(false);
      setNightsOpen(false);
      setTransportOpen(false);
      setBoardOpen(false);
      setHpeopleOpen(false);
    }
    hdatePanel.hidden = !open;
    hdateField.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function setHpeopleOpen(open) {
    if (!hpeopleField || !hpeoplePanel) {
      return;
    }
    if (open) {
      setDestOpen(false);
      setDateOpen(false);
      setPeopleOpen(false);
      setMsearchOpen(false);
      setSortOpen(false);
      setGalleryOpen(false);
      setVideoOpen(false);
      setNightsOpen(false);
      setTransportOpen(false);
      setBoardOpen(false);
      setHdateOpen(false);
    }
    hpeoplePanel.hidden = !open;
    hpeopleField.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (destField && destPanel) {
    var destClose = destPanel.querySelector("[data-dest-close]");

    destField.addEventListener("click", function () {
      setDestOpen(destPanel.hidden);
    });

    if (destClose) {
      destClose.addEventListener("click", function () {
        setDestOpen(false);
      });
    }
  }

  if (dateField && datePanel) {
    var dateClose = datePanel.querySelector("[data-date-close]");

    dateField.addEventListener("click", function () {
      setDateOpen(datePanel.hidden);
    });

    if (dateClose) {
      dateClose.addEventListener("click", function () {
        setDateOpen(false);
      });
    }

    datePanel.addEventListener("click", function (event) {
      var node = event.target;
      var day = null;
      while (node && node !== datePanel) {
        if (node.classList && node.classList.contains("date-day")) {
          day = node;
          break;
        }
        node = node.parentNode;
      }
      if (!day) {
        return;
      }
      var index = dayStates.indexOf(day.getAttribute("data-state"));
      day.setAttribute("data-state", dayStates[(index + 1) % dayStates.length]);
    });
  }

  if (hdateField && hdatePanel) {
    hdateField.addEventListener("click", function () {
      setHdateOpen(hdatePanel.hidden);
    });

    hdatePanel.addEventListener("click", function (event) {
      var node = event.target;
      var day = null;
      var close = null;
      while (node && node !== hdatePanel) {
        if (!day && node.classList && node.classList.contains("date-day")) {
          day = node;
        }
        if (!close && node.getAttribute && node.getAttribute("data-hdate-close") !== null) {
          close = node;
        }
        node = node.parentNode;
      }
      if (close) {
        setHdateOpen(false);
        return;
      }
      if (!day) {
        return;
      }
      var index = dayStates.indexOf(day.getAttribute("data-state"));
      day.setAttribute("data-state", dayStates[(index + 1) % dayStates.length]);
    });
  }

  if (hpeopleField && hpeoplePanel) {
    hpeopleField.addEventListener("click", function () {
      setHpeopleOpen(hpeoplePanel.hidden);
    });

    hpeoplePanel.addEventListener("click", function (event) {
      var node = event.target;
      var step = null;
      var close = null;
      while (node && node !== hpeoplePanel) {
        if (!step && node.getAttribute && node.getAttribute("data-hpeople-step")) {
          step = node;
        }
        if (!close && node.getAttribute && node.getAttribute("data-hpeople-close") !== null) {
          close = node;
        }
        node = node.parentNode;
      }
      if (close) {
        setHpeopleOpen(false);
        return;
      }
      if (!step) {
        return;
      }
      var count = hpeoplePanel.querySelector('[data-hpeople-count="' + step.getAttribute("data-hpeople-step") + '"]');
      if (!count) {
        return;
      }
      var next = Number(count.textContent) + Number(step.getAttribute("data-hpeople-dir"));
      if (next < 0) {
        next = 0;
      }
      count.textContent = String(next);
    });
  }

  if (peopleField && peoplePanel) {
    var peopleClose = peoplePanel.querySelector("[data-people-close]");

    peopleField.addEventListener("click", function () {
      setPeopleOpen(peoplePanel.hidden);
    });

    if (peopleClose) {
      peopleClose.addEventListener("click", function () {
        setPeopleOpen(false);
      });
    }

    peoplePanel.addEventListener("click", function (event) {
      var node = event.target;
      var step = null;
      while (node && node !== peoplePanel) {
        if (node.getAttribute && node.getAttribute("data-people-step")) {
          step = node;
          break;
        }
        node = node.parentNode;
      }
      if (!step) {
        return;
      }
      var count = peoplePanel.querySelector('[data-people-count="' + step.getAttribute("data-people-step") + '"]');
      if (!count) {
        return;
      }
      var next = Number(count.textContent) + Number(step.getAttribute("data-people-dir"));
      if (next < 0) {
        next = 0;
      }
      count.textContent = String(next);
    });
  }

  var mnav = document.querySelector("[data-mnav]");
  var mnavOpenBtn = document.querySelector("[data-mnav-open]");
  var mnavCloseBtn = document.querySelector("[data-mnav-close]");

  function setMnavOpen(open) {
    if (!mnav) {
      return;
    }
    if (open && !window.matchMedia("(max-width: 767px)").matches) {
      return;
    }
    mnav.hidden = !open;
    if (mnavOpenBtn) {
      mnavOpenBtn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    if (!open && mnavOpenBtn) {
      mnavOpenBtn.focus();
    }
  }

  if (mnavOpenBtn) {
    mnavOpenBtn.addEventListener("click", function () {
      setMnavOpen(mnav.hidden);
    });
  }

  if (mnavCloseBtn) {
    mnavCloseBtn.addEventListener("click", function () {
      setMnavOpen(false);
    });
  }

  window.addEventListener("resize", function () {
    if (mnav && !mnav.hidden && !window.matchMedia("(max-width: 767px)").matches) {
      mnav.hidden = true;
      if (mnavOpenBtn) {
        mnavOpenBtn.setAttribute("aria-expanded", "false");
      }
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }
    if (mnav && !mnav.hidden) {
      setMnavOpen(false);
      return;
    }
    if (videoPop && !videoPop.hidden) {
      setVideoOpen(false);
      return;
    }
    if (destPanel && !destPanel.hidden) {
      setDestOpen(false);
    }
    if (datePanel && !datePanel.hidden) {
      setDateOpen(false);
    }
    if (peoplePanel && !peoplePanel.hidden) {
      setPeopleOpen(false);
    }
    if (msearchPanel && !msearchPanel.hidden) {
      setMsearchOpen(false);
    }
    if (sortPanel && !sortPanel.hidden) {
      setSortOpen(false);
    }
    if (galleryPop && !galleryPop.hidden) {
      setGalleryOpen(false);
    }
    if (nightsPanel && !nightsPanel.hidden) {
      setNightsOpen(false);
    }
    if (transportPanel && !transportPanel.hidden) {
      setTransportOpen(false);
    }
    if (boardPanel && !boardPanel.hidden) {
      setBoardOpen(false);
    }
    if (hdatePanel && !hdatePanel.hidden) {
      setHdateOpen(false);
    }
    if (hpeoplePanel && !hpeoplePanel.hidden) {
      setHpeopleOpen(false);
    }
  });

  document.addEventListener("click", function (event) {
    if (destPanel && destField && !destPanel.hidden) {
      if (!destPanel.contains(event.target) && !destField.contains(event.target)) {
        setDestOpen(false);
      }
    }
    if (datePanel && dateField && !datePanel.hidden) {
      if (!datePanel.contains(event.target) && !dateField.contains(event.target)) {
        setDateOpen(false);
      }
    }
    if (peoplePanel && peopleField && !peoplePanel.hidden) {
      if (!peoplePanel.contains(event.target) && !peopleField.contains(event.target)) {
        setPeopleOpen(false);
      }
    }
    if (msearchPanel && msearchField && !msearchPanel.hidden) {
      if (!msearchPanel.contains(event.target) && !msearchField.contains(event.target)) {
        setMsearchOpen(false);
      }
    }
    if (sortPanel && sortField && !sortPanel.hidden) {
      if (!sortPanel.contains(event.target) && !sortField.contains(event.target)) {
        setSortOpen(false);
      }
    }
    if (nightsPanel && nightsField && !nightsPanel.hidden) {
      if (!nightsPanel.contains(event.target) && !nightsField.contains(event.target)) {
        setNightsOpen(false);
      }
    }
    if (transportPanel && transportField && !transportPanel.hidden) {
      if (!transportPanel.contains(event.target) && !transportField.contains(event.target)) {
        setTransportOpen(false);
      }
    }
    if (boardPanel && boardField && !boardPanel.hidden) {
      if (!boardPanel.contains(event.target) && !boardField.contains(event.target)) {
        setBoardOpen(false);
      }
    }
    if (hdatePanel && hdateField && !hdatePanel.hidden) {
      if (!hdatePanel.contains(event.target) && !hdateField.contains(event.target)) {
        setHdateOpen(false);
      }
    }
    if (hpeoplePanel && hpeopleField && !hpeoplePanel.hidden) {
      if (!hpeoplePanel.contains(event.target) && !hpeopleField.contains(event.target)) {
        setHpeopleOpen(false);
      }
    }
  });

  if (msearchPanel) {
    var msearchClose = msearchPanel.querySelector("[data-msearch-close]");
    if (msearchClose) {
      msearchClose.addEventListener("click", function () {
        setMsearchOpen(false);
      });
    }
  }

  if (sortField && sortPanel) {
    sortField.addEventListener("click", function () {
      setSortOpen(sortPanel.hidden);
    });

    sortPanel.addEventListener("click", function (event) {
      var node = event.target;
      var row = null;
      while (node && node !== sortPanel) {
        if (node.classList && node.classList.contains("sort-menu__row")) {
          row = node;
          break;
        }
        node = node.parentNode;
      }
      if (!row) {
        return;
      }
      if (sortLabel) {
        sortLabel.textContent = row.textContent;
      }
      setSortOpen(false);
    });
  }

  if (nightsField && nightsPanel) {
    nightsField.addEventListener("click", function () {
      setNightsOpen(nightsPanel.hidden);
    });

    nightsPanel.addEventListener("click", function (event) {
      var node = event.target;
      var row = null;
      while (node && node !== nightsPanel) {
        if (node.classList && node.classList.contains("nights__row")) {
          row = node;
          break;
        }
        node = node.parentNode;
      }
      if (!row) {
        return;
      }
      var rows = nightsPanel.querySelectorAll(".nights__row");
      var index = 0;
      while (index < rows.length) {
        rows[index].setAttribute("aria-selected", rows[index] === row ? "true" : "false");
        index += 1;
      }
      var name = row.querySelector(".nights__name");
      if (nightsLabel && name) {
        nightsLabel.textContent = name.textContent;
      }
      setNightsOpen(false);
    });
  }

  if (transportField && transportPanel) {
    transportField.addEventListener("click", function () {
      setTransportOpen(transportPanel.hidden);
    });

    transportPanel.addEventListener("click", function (event) {
      var node = event.target;
      var row = null;
      while (node && node !== transportPanel) {
        if (node.classList && node.classList.contains("transport__row")) {
          row = node;
          break;
        }
        node = node.parentNode;
      }
      if (!row) {
        return;
      }
      var rows = transportPanel.querySelectorAll(".transport__row");
      var index = 0;
      while (index < rows.length) {
        rows[index].setAttribute("aria-selected", rows[index] === row ? "true" : "false");
        index += 1;
      }
      var name = row.querySelector(".transport__name");
      if (transportLabel && name) {
        transportLabel.textContent = name.textContent;
      }
      setTransportOpen(false);
    });
  }

  if (boardField && boardPanel) {
    boardField.addEventListener("click", function () {
      setBoardOpen(boardPanel.hidden);
    });

    boardPanel.addEventListener("click", function (event) {
      var node = event.target;
      var row = null;
      while (node && node !== boardPanel) {
        if (node.classList && node.classList.contains("board__row")) {
          row = node;
          break;
        }
        node = node.parentNode;
      }
      if (!row) {
        return;
      }
      var rows = boardPanel.querySelectorAll(".board__row");
      var index = 0;
      while (index < rows.length) {
        rows[index].setAttribute("aria-selected", rows[index] === row ? "true" : "false");
        index += 1;
      }
      var name = row.querySelector(".board__name");
      if (boardLabel && name) {
        boardLabel.textContent = name.textContent;
      }
      setBoardOpen(false);
    });
  }

  if (galleryField && galleryPop) {
    galleryField.addEventListener("click", function (event) {
      var node = event.target;
      while (node && node !== galleryField) {
        if (node.classList && node.classList.contains("gallery__play")) {
          return;
        }
        node = node.parentNode;
      }
      setGalleryOpen(true);
    });

    galleryPop.addEventListener("click", function (event) {
      var node = event.target;
      while (node && node !== galleryPop) {
        if (node.getAttribute && node.getAttribute("data-gallery-close") !== null) {
          setGalleryOpen(false);
          return;
        }
        node = node.parentNode;
      }
    });
  }

  if (videoStill && videoPop) {
    videoStill.addEventListener("click", function () {
      setVideoOpen(true);
    });
  }

  if (videoPop) {
    videoPop.addEventListener("click", function (event) {
      var node = event.target;
      while (node && node !== videoPop) {
        if (node.getAttribute && node.getAttribute("data-video-close") !== null) {
          setVideoOpen(false);
          return;
        }
        node = node.parentNode;
      }
    });
  }
})();
