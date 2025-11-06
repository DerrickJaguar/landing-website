/* theme-switcher.js
   Simple theme switcher: applies body.theme-... classes and persists choice in localStorage
*/
(function(){
    'use strict';

    var THEMES = ['theme-white','theme-gray','theme-black'];
    var STORAGE_KEY = 'site-theme';

    function applyTheme(theme){
        if(!theme) return;
        // remove any known theme classes then add
        THEMES.forEach(function(t){ document.body.classList.remove(t); });
        document.body.classList.add(theme);
        try{ localStorage.setItem(STORAGE_KEY, theme); }catch(e){/* ignore */}
    }

    // Expose programmatic API
    window.setSiteTheme = function(theme){ if(THEMES.indexOf(theme) !== -1) applyTheme(theme); };

    window.cycleSiteTheme = function(){
        var current = null;
        THEMES.forEach(function(t){ if(document.body.classList.contains(t)) current = t; });
        var idx = current ? THEMES.indexOf(current) : -1;
        var next = THEMES[(idx + 1) % THEMES.length];
        applyTheme(next);
        return next;
    };

    function init(){
        // restore
        var saved = null;
        try{ saved = localStorage.getItem(STORAGE_KEY); }catch(e){ saved = null; }
        if(saved && THEMES.indexOf(saved) !== -1){ applyTheme(saved); }

        // wire up optional `.theme-switcher` container (if present)
        var container = document.querySelector('.theme-switcher');
        if(container){
            container.addEventListener('click', function(e){
                var btn = e.target.closest('.theme-btn');
                if(!btn) return;
                var theme = btn.getAttribute('data-theme');
                if(THEMES.indexOf(theme) !== -1){ applyTheme(theme); }
            });

            container.addEventListener('keydown', function(e){
                var target = e.target;
                if(target && target.classList && target.classList.contains('theme-btn')){
                    if(e.key === ' ' || e.key === 'Enter'){
                        e.preventDefault();
                        target.click();
                    }
                }
            });
        }

        // wire up navbar CTA if present
        var cta = document.getElementById('theme-cta');
        if(cta){
            cta.addEventListener('click', function(){
                var next = window.cycleSiteTheme();
                // optional: give quick visual feedback on button
                cta.setAttribute('data-theme', next);
            });
        }
    }

    if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', init);
    } else { init(); }

})();
