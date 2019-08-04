// ==UserScript==
// @name         Reddit search on Google
// @version      1.1
// @description  Adds a button to search Reddit posts with Google
// @author       Mario O.M.
// @namespace    https://github.com/marioortizmanero/reddit-search-on-google/
// @include      http*://www.google.*/search*
// @include      http*://google.*/search*
// @run-at       document-end
// ==/UserScript==

// Modify this to false if you don't want an icon
const useIcon = true;
// Modify this to true if you want to add the icon to the right of the 'Tools' button
const appendRight = false;

const queryRegex = /q=(.*?)([^&]+)/g;
const redditUrl = "+site%3Areddit.com";

(function() {
    // Creating the element
    var el = document.createElement('div');
    el.className = 'hdtb-mitem';
    var link = document.createElement('a');

    // Adding the svg icon
    if (useIcon) {
        var span = document.createElement('span');
        span.className = 'HF9Klc ZYMsjf';
        span.innerHTML += '<svg foscusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z"/></svg>';
        link.appendChild(span);
    }

    // Adding a hyperlink to add 'site:reddit.com'
    link.appendChild(document.createTextNode('Reddit'));
    link.href = window.location.href.replace(queryRegex, (match,p1,p2) => {
        return p2.lastIndexOf(redditUrl)==-1 ? ['q=', p2, redditUrl].join('') : ['q=', p2].join(''); // Only adds the url once
    });
    el.appendChild(link);

    // Inserting the element into Google search
    if (appendRight) {
        var toolsBtn = document.getElementById('hdtb-tls');
        toolsBtn.parentNode.insertBefore(el, toolsBtn.nextSibling);
    } else {
        var button = document.getElementById('hdtb-msb-vis');
        button.appendChild(el);
    }
})();
