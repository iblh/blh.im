/**
 * Code Syntax Highlighter Preprocessor
 */
$('code').each(function(index, el) {
    var code = $(this).text();
    var lang = (/^\s*?!!!\s*?(\w+?)\s/i).exec(code);
    if (lang != null) {
        code = code.replace(lang[0], '');
        lang = lang[1];
        $(this).addClass('language-' + lang);
    };
    $(this).text(code.trim());
});
$('pre:has(code)').addClass('line-numbers');