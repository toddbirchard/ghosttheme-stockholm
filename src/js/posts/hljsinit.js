// Import hljs
import hljs from 'highlight.js/lib/highlight';
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
import go from 'highlight.js/lib/languages/go';
import graphql from 'highlight.js/lib/languages/graphql';
import jinja2 from 'highlight.js/lib/languages/jinja2';
import hcl from 'highlight.js/lib/hcl';
import toml from 'highlight.js/lib/languages/toml';
import java from 'highlight.js/lib/languages/java';
import html from 'highlight.js/lib/languages/html';
import jsx from 'highlight.js/lib/jsx';

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
hljs.registerLanguage('go', go);
hljs.registerLanguage('graphql', graphql);
hljs.registerLanguage('jinja2', jinja2);
hljs.registerLanguage('hcl', hcl);
hljs.registerLanguage('toml', toml);
hljs.registerLanguage('java', java);
hljs.registerLanguage('html', html);
hljs.registerLanguage('jsx', jsx);

export function hljs_init() {
    hljs.configure({
        tabReplace: '  ', // 2 spaces
        classPrefix: '' // don't append class prefix
    });
    hljs.initHighlightingOnLoad();
}