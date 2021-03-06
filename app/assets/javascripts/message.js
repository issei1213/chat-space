$(function(){
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("更新に失敗しました");
    });
  };


  var buildHTML = function(message){
    if(message.content && message.image) {
      var html = `<div class="message" data-message-id=${message.id}></div>
      <div class="chat-main__message-list__middle-items-top">
        <div class="chat-main__message-list__middle-items-top__user-name">
          ${message.user_name}
        </div>
        <div class="chat-main__message-list__middle-items-top__send-datetime">
          ${message.created_at}
        </div>
      </div>
      <div class="chat-main__message-list__middle-items-message">
        <p class="lower-message__content">
        ${message.content}
        </p>
        <img src= ${message.image} class="lower-message__image">
      </div>`
    } else if(message.content) {
      var html = `<div class="message" data-message-id=  ${message.id}  > 
      <div class="chat-main__message-list__middle-items-top"> 
      <div class="chat-main__message-list__middle-items-top__user-name"> 
            ${message.user_name} 
            </div> 
          <div class="chat-main__message-list__middle-items-top__send-datetime"> 
            ${message.created_at} 
            </div> 
          </div> 
        <div class="chat-main__message-list__middle-items-message"> 
        <p class="lower-message__content"> 
            ${message.content} 
        </p> 
        </div> 
      </div>`
    } else if(message.image) {
      var html = `<div class="message" data-message-id=  ${message.id}  > 
      <div class="chat-main__message-list__middle-items-top"> 
      <div class="chat-main__message-list__middle-items-top__user-name"> 
            ${message.user_name} 
            </div> 
          <div class="chat-main__message-list__middle-items-top__send-datetime"> 
          ${message.created_at} 
            </div> 
          </div> 
        <div class="chat-main__message-list__middle-items-message"> 
        <img src= ${message.image} class = "lower-message__image" > 
        </div> 
      </div>`
    };
    return html;
    };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    
    console.log(formData)
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message)
      if(message.length !== 0){
        $('.chat-main__message-list').append(html);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        $('.chat-main__message-form__bottom-items-left')[0].reset();
        $('.chat-main__message-form__bottom-items-left__send').prop("disabled", false);
      }
    })

    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });

  });

  if(document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages,7000);
  }

});
