<<<<<<< HEAD
=======
var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const msg = this.parentNode.parentNode.childNodes[1].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('notes', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const msg = this.parentNode.parentNode.childNodes[1].innerText;
    fetch('notes', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'msg': msg
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

>>>>>>> e31e64d5eb37968faa5c0ddcc3a04a0439b5313b
