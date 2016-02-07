<?php 
/**
 * PrismJS 代码高亮插件
 *
 * @package PrismJS 代码高亮插件
 * @author Ggicci
 * @version 1.1
 * @link http://ggicci.cn
 */
 
 class PrismSyntaxHighlighter_Plugin implements Typecho_Plugin_Interface
 {
    /**
     * 激活插件
     */
 	public static function activate()
 	{
 		Typecho_Plugin::factory('Widget_Archive')->header = array('PrismSyntaxHighlighter_Plugin', 'allow');
 		Typecho_Plugin::factory('Widget_Archive')->header = array('PrismSyntaxHighlighter_Plugin', 'css');
 		Typecho_Plugin::factory('Widget_Archive')->footer = array('PrismSyntaxHighlighter_Plugin', 'javascripts');
 	}

    /**
     * 禁用插件
     */
 	public static function deactivate()
 	{

 	}

    /**
     * 插件设置
     */
 	public static function config(Typecho_Widget_Helper_Form $form)
    {
        // 需要加载的页面，默认只在独立页和日志页加载
    	$toloads = new Typecho_Widget_Helper_Form_Element_Checkbox(
    		'toloads',
    		array('index' => '首页',
    			'post' => '日志页',
    			'page' => '独立页',
    			'category' => '分类页',
    			'search' => '搜索页',
    			'tag' => '标签页',
    			'author' => '作者页'),
    		array('post', 'page'),
    		'选择您需要加载语法高亮器的页面'
    	);

        // 选择阻止加载的自定义页面，默认都不加载
    	Typecho_Widget::widget('Widget_Contents_Page_Edit')->to($editpage);
    	$custom_templates = $editpage->getTemplates();

    	$options_for_templates = array();
    	foreach ($custom_templates as $template => $name) {
    		$options_for_templates[$template] = $name;
    	}
    	$unloads = new Typecho_Widget_Helper_Form_Element_Checkbox(
    		'unloads',
    		$options_for_templates,
    		array_keys($options_for_templates),
    		'选择阻止加载语法高亮器的自定义模板'
    	);

        // 加载自定义 JS
    	$js = new Typecho_Widget_Helper_Form_Element_Text(
    		'js',
    		null,
    		'',
    		'自定义 Prism 的 JS 文件',
    		'可以去 http://prismjs.com 官网下载自定义的 JS 文件用以支持不同编程语言。'
    	);

        // 加载自定义 CSS
    	$css = new Typecho_Widget_Helper_Form_Element_Text(
    		'css',
    		null,
    		'',
    		'自定义 Prism 的 CSS 文件',
    		'同上下载自定义 CSS 文件，用以支持不同风格的上色效果。'
    	);

        // 添加是否加载 highlight-precessor.js 选项 v1.1
        $need_precessor = new Typecho_Widget_Helper_Form_Element_Checkbox(
            'need_precessor',
            array('need' => '需要加载 highlight-precessor.js'),
            array('need'),
            '是否加载 Highlight Precessor？',
            '该文件是必须要加载的，但是为了优化，你可以不加载，但是把目录下 highlight-precessor.js 
            中的代码拷贝到你会加载的 js 文件中，这样可以减少页面请求次数。'
        );

        // 插件主页
    	$other = new Typecho_Widget_Helper_Layout('p');
    	$other->html('更详细的介绍，请参考<a href="http://ggicci.cn/works/PrismSyntaxHighlighter-For-Typecho" target="_blank">插件主页</a>。');

    	$form->addInput($toloads);
    	$form->addInput($unloads);
    	$form->addInput($js);
    	$form->addInput($css);
        $form->addInput($need_precessor);
    	$form->addItem($other);
    }

	public static function personalConfig(Typecho_Widget_Helper_Form $form)
	{

	}

    /**
     * 判断该页面是否需要加载语法上色器
     */
	public static function allow()
	{
		$plugin = Helper::options()->plugin('PrismSyntaxHighlighter');
		$toloads = $plugin->toloads;
		$unloads = $plugin->unloads;
		$allow = false;

		Typecho_Widget::widget('Widget_Archive')->to($curpage);

		// pre-filter (include)
		foreach ($toloads as $toload) {
			if ($curpage->is($toload)) {
				// next filter (exclude)
				$template = $curpage->template;
				if ($template == null) {
					$allow = true;
				} else if (!in_array($template, $unloads)) {
					$allow = true;
				}
				break;
			}
		}
		$plugin->allow = $allow;
	}
	
    /**
     * 在 <head> 加载 CSS
     */
	public static function css()
	{
		if (!Helper::options()->plugin('PrismSyntaxHighlighter')->allow) { return; }
		$css = Helper::options()->plugin('PrismSyntaxHighlighter')->css;
		$css = trim($css) == '' ? 'prism.css' : $css;
		printf('<link rel="stylesheet" href="%s">',
			Helper::options()->pluginUrl . '/PrismSyntaxHighlighter/' . $css);
	}

    /**
     * 在 <footer> 加载 JS
     */
	public static function javascripts()
	{
        $plugin = Helper::options()->plugin('PrismSyntaxHighlighter');
		if (!$plugin->allow) { return; }
		$js = $plugin->js;
		$js = trim($js) == '' ? 'prism.js' : $js;

        if ($plugin->need_precessor != null) {
            printf('<script src="%s"></script>',
                Helper::options()->pluginUrl . '/PrismSyntaxHighlighter/highlight-precessor.js');
        }
		
		printf('<script src="%s"></script>',
			Helper::options()->pluginUrl . '/PrismSyntaxHighlighter/' . $js);
	}
 }
 

