javascript: (function () {
    let data = `data: text / html, 
    <title>Notepad</title>
    <body contenteditable style="font-size:2rem;line-height:1.4; margin:0 auto;padding:4rem;">
write sth here...    
    </body>
    <script>
    let url=document.getElementsByTagName('html')[0].innerHTML;

        history.pushState({ url:'data:text/html,'+url ,title: document.title }, 
            document.title,
            url );
      document.body.focus();
    </script>
    `;
    let url = data;
    /*    history.pushState({ url: document.getElementsByTagName('html')[0].innerHTML,
     title: document.title }, 
     document.title,
      url);*/
    document.write(data.replace('data: text / html, ', ''));
})()