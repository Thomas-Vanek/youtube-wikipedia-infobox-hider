// ==UserScript==
// @name         YouTube Clarification Box Hider
// @namespace    https://github.com/Thomas-Vanek/yt-infobox-hider
// @version      1.1
// @description  Hides the clarification boxes that youtube has added.
// @author       Thomas V.
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var config = {childList: true, subtree: true};
    var callback = function(mutationList, observer) {
      for (var mutation of mutationList) {
        if (mutation.addedNodes) {
          for (var i = 0; i < mutation.addedNodes.length; i++) {
            var node = mutation.addedNodes[i];
            if (node.tagName == "YTD-CLARIFICATION-RENDERER"){
              node.remove();
              observer.disconnect();
            }
          }
        }
      }
    }
    var observer = new MutationObserver(callback);
    observer.observe(document, config);
    document.getElementsByTagName("ytd-clarification-renderer")[0].remove();
})();
