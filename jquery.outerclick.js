/*! jquery.outerclick */
(function($, window, t, f, n, u)
{
	var document = window.document;
	var $window = $(window);
	var $document = $(document);

	$.fn.extend({
		/**
		 * 指定要素の先祖か？
		 * @function
		 * @param {jQuery|HTMLElement} target 対象要素
		 * @return {Boolean} targetの先祖要素ならtrue、そうでなければfalse
		 */
		isAncestorOf: (function()
		{
			return function(target)
			{
				var me = this.get(0);
				if(target instanceof jQuery)
				{
					// jQueryオブジェクトならDOMオブジェクトに変換
					target = target.get(0);
				}
				while(target !== n)
				{
					if(me === target)
					{
						return t;
					}
					target = target.parentElement;
				}
				return f;
			};
		})(),

		/**
		 * 要素の外側クリックで発生するイベント
		 * @function
		 * @param {Function} fn コールバック関数（省略時はイベント発行）
		 * @return {jQuery} jQueryオブジェクト
		 */
		outerclick: (function()
		{
			// イベント名
			var eventname = "outerclick";

			// 登録された要素一覧
			var $elements = [];
			$(function($)
			{
				// 画面のどこかがクリックされたら...
				$document.bind("click", function(event)
				{
					// 各要素を回り...
					var target = event.target;
					$.each($elements, function()
					{
						// クリックされた要素が子孫要素でなければイベント発生
						var $element = this;
						if(!$element.isAncestorOf(target))
						{
							$element.trigger(eventname);
						}
					});
				});
			});

			return function(fn)
			{
				if(fn !== u)
				{
					// 要素一覧にpushして、イベントに関連付け
					$elements.push(this);
					return this.bind(eventname, fn);
				}
				else
				{
					// イベント発行
					return this.trigger(eventname);
				}
			};
		})()
	});
})(jQuery, window, true, false, null);
