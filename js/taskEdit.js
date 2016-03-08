var editor = null;

function initializeEditorIfNeeded() {
  if (editor == null) {
    Simditor.locale = 'zh_cn';
    var toolbar = ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment'];
    var editor = new Simditor({
      textarea: $('#task_editor'),
      placeholder: '这里输入文字...',
      toolbar: toolbar,
      pasteImage: true,
      defaultImage: 'assets/images/image.png',
      upload: location.search === '?upload' ? {
        url: '/upload'
      } : false
    });
    // $preview = $('#preview');
    // if ($preview.length > 0) {
    //   return editor.on('valuechanged', function(e) {
    //     return $preview.html(editor.getValue());
    //   });
    // }
  }
}
