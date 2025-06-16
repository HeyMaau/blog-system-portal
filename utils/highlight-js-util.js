import javascript from 'highlight.js/lib/languages/javascript'
import kotlin from 'highlight.js/lib/languages/kotlin'
import java from 'highlight.js/lib/languages/java'
import groovy from 'highlight.js/lib/languages/groovy'
import xml from 'highlight.js/lib/languages/xml'

export function registerLanguage(hljs) {
  hljs.registerLanguage('kotlin', kotlin);
  hljs.registerLanguage('java', java);
  hljs.registerLanguage('groovy', groovy);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('javascript', javascript);
}
