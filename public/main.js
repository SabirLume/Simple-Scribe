
  document.getElementById("file").onchange = function() {
   document.getElementById("form").submit();
};
var trash = document.getElementsByClassName("fa-trash");

Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
      const note = this.parentNode.parentNode.childNodes[1].innerText;
      const title = this.parentNode.parentNode.childNodes[3].innerText;
    //   const notes = this.parentNode.parentNode;
 
      console.log("this is the title:", title)
      fetch('my-notes', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        //puts  objects strings into a form that can be sent 
        body: JSON.stringify({
            //proprty name is title
          
          'note': note,
          'title': title
          
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
  });
