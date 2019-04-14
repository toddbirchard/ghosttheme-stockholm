// Import hljs
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import shell from 'highlight.js/lib/languages/shell';
import sql from 'highlight.js/lib/languages/sql';
import json from 'highlight.js/lib/languages/json';
import ini from 'highlight.js/lib/languages/ini';
import yaml from 'highlight.js/lib/languages/yaml';
import handlebars from 'highlight.js/lib/languages/handlebars';
import less from 'highlight.js/lib/languages/less';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import nginx from 'highlight.js/lib/languages/nginx';
import hljs from 'highlight.js/lib/highlight';

// Register highlight.js languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('json', json);
hljs.registerLanguage('ini', ini);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('handlebars', handlebars);
hljs.registerLanguage('less', less);
hljs.registerLanguage('nginx', nginx);

export function hljs_init(){
    hljs.configure({
        tabReplace: '  ', // 2 spaces
        classPrefix: '' // don't append class prefix
    });
    hljs.initHighlightingOnLoad();
}