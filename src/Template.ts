import { RevealJsOptions} from './Models';

export class Template {

    public static Render (title:string, revealOptions:RevealJsOptions, slides:any  ):string{
        let jsEvents = '';
        if(revealOptions.customEvents && revealOptions.customEvents.length > 0){
            revealOptions.customEvents.map((value, index) => {
                jsEvents += `Reveal.addEventListener( '${value.eventName}', function() {
                    ${value.eventCode}
                } );`;
            })
        }

        return `<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <link rel="stylesheet" href="css/reveal.css">
        <link rel="stylesheet" href="css/theme/${revealOptions.theme}.css" id="theme">
        <link rel="stylesheet" href="${revealOptions.customTheme}.css" id="customTheme">
        <!-- For syntax highlighting -->
        <link rel="stylesheet" href="lib/css/${revealOptions.highlightTheme}.css">
        <link rel="stylesheet" href="lib/css/${revealOptions.customHighlightTheme}.css">

        <!-- If the query includes 'print-pdf', use the PDF print sheet -->
        <script>
          document.write( '<link rel="stylesheet" href="css/print/' + ( window.location.search.match( /print-pdf/gi ) ? 'pdf' : 'paper' ) + '.css" type="text/css" media="print">' );
        </script>
    </head>
    <body>

        <div class="reveal">
            <div class="slides">${slides}</div>
        </div>

        <script src="lib/js/head.min.js"></script>
        <script src="js/reveal.js"></script>

        <script>
            function extend() {
              var target = {};
              for (var i = 0; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                  if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                  }
                }
              }
              return target;
            }
            // Optional libraries used to extend on reveal.js
            var deps = [
              { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
              { src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector('[data-markdown]'); } },
              { src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector('[data-markdown]'); } },
              { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
              { src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } },
              { src: 'plugin/math/math.js', async: true }
            ];
            // default options to init reveal.js
            var defaultOptions = {
              controls: true,
              progress: true,
              history: true,
              center: true,
              transition: 'default',
              dependencies: deps
            };
            // options from URL query string
            var queryOptions = Reveal.getQueryHash() || {};
            var options = ${ JSON.stringify(revealOptions, null, 2)};
            options = extend(defaultOptions, options, queryOptions);
            Reveal.initialize(options);
            ${jsEvents}
        </script>
        
    </body>
</html>`;
    }
}
