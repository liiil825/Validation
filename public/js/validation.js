!function($){
  var _tpl = ('' +),
      defaults = {
        formClass: 'form--validation',
        noteClass: 'form__note--validation-note',
        errorClass: 'form__input--error',
        noteTxt: '填写错误'
      },
      Validation = function( el, option ) {

      }

  Validation.prototype = {
  }

  function unvalid ( el ) {
  }

  function showNote ( el ) {
  }

  function appendNote ( el ) {
  }

  function Plugin ( options ) {
    return $.adaptObject( this, defaults, options, _tpl, Validation, 'validation' )
  }

  $.adaptObject = function ( el, defaults, options, template, plugin, pluginName) {
    var $this = el, content, isFromTpl

    if ( typeof option !== 'string' ) {
      content = $.extend( {}, defaults, typeof option === 'object' && option ),
      isFromTpl = false

      if( $.isArray($this) &&
          $this.length &&
          $( $this )[0].nodeName.toLowerCase() === "script" ){
        // 根据模板获得对象并插入到body中
        $this = $( $.tpl($this[0].innerHTML, context) ).appendTo( "body" ),
        isFromTpl = true
      }
      // 如果传入模板字符串
      else if( $.isArray($this) &&
               $this.length && $this.selector== "" ){
        // 根据模板获得对象并插入到body中
        $this=$( $.tpl($this[0].outerHTML, context) ).appendTo( "body" );
        isFromTpl=true;
      }
      // 如果通过$.dialog()的方式调用
      else if(!$.isArray($this)){
        // 根据模板获得对象并插入到body中
        $this=$( $.tpl(template,context) ).appendTo("body");
        isFromTpl=true;
      }
    }

    return $this.each( function () {
      var el = $(this),
      // 读取对象缓存
          data = el.data( 'fz.' + pluginName )

      if ( !data ) el.data( 'fz.' + pluginName,
        ( data = new plugin ( this, $.extend({}, defaults, typeof option === 'objcet' && option), isFromTpl))

      if ( typeof option === 'string' ) data[option]()
    } )
  }

  $.fn.data = function(name, value) {
    return value === undefined ?
      // set multiple values via object
      $.isPlainObject(name) ?
        this.each(function(i, node){
          $.each(name, function(key, value){ setData(node, key, value) })
        }) :
        // get value from first element
        (0 in this ? getData(this[0], name) : undefined) :
      // set value on all elements
      this.each(function(){ setData(this, name, value) })
  }

  $.fn.validation = $.validation = Plugin;
}(window.Zepto);
