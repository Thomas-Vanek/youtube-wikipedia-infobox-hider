// ==UserScript==
// @name         YouTube Clarification Box Hider
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hides the clarification boxes that youtube has added.
// @author       Thomas V.
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var loc = location.href;
    var watchPageReg = /\S+[\/](watch)[\?].+/g;
    if (loc.match(watchPageReg) != null) {
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
    }else {
        document.getElementsByTagName("ytd-clarification-renderer")[0].remove();
          }
})();
