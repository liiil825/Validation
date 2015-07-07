// 所有模块都通过 define 来定义
define(function(require, exports, module) {
  // 通过 require 引入依赖
  require('zepto');
  var $this = this,
      $target,
      offset,
      pattern,
      txt,
      note,
      noteTxt,
      formClass = 'form-validation',
      noteClass = 'validation-note',
      errorClass = 'unvalid',
      options = {
        formClass: '',
        noteTxt: '填写错误'
      },
      plugin = {}

  $('.' + formClass ).on('blur', 'input', function( e ){
    $target = $(e.target),
    pattern = $target.attr( 'pattern' )

    if ( !pattern )  return true

    txt = $target.val(),
    pattern = new RegExp( pattern )

    if ( !pattern.test( txt ) ) plugin.unvalid( $target )
    else plugin.valid( $target )
  })

  plugin.unvalid = function( target ) {
    plugin.validNote( target )
    target.addClass( errorClass )
  }

  plugin.validNote = function ( target ) {
    if ( target.siblings( '.' + noteClass ).length === 0 ) appendNote( target)
  }

  plugin.valid = function ( target ) {
    target.removeClass( errorClass ).siblings( '.' + noteClass ).remove()
  }

  function appendNote ( target ) {
    noteTxt = target.data( 'note' ) || options.noteTxt,
    offset = target.offset(),
    note = $('<p>', {
      'class': noteClass
    }).css( {
      'left': offset.left,
      'width': offset.width,
      'line-height': offset.height / parseInt( target.css( 'font-size' )),
      'margin-top': (offset.height + parseInt( target.css( 'padding-top') ) * 2) * -1
    }).text( '* ' + noteTxt )
      .insertAfter( target )
  }
});
