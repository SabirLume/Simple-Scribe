



// var video = document.getElementById('video');
// var canvas = document.getElementById('canvas');
// var context = canvas.getContext('2d');

// //allows me to access the user's camera
// if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
//   navaigator.mediaDevices.getUserMedia({video: true}).then(function(stream){
//     video.srcObject = stream;
//     video.play();
//   });
// }
// // allows me to take a photo using a snapshot of the video
// document.getElementById('snap').addEventListener('click', function(){
//   context.drawImage(video, 0, 0, 640, 480);
// })





// var thumbUp = document.getElementsByClassName("fa-thumbs-up");
// var trash = document.getElementsByClassName("fa-trash");

// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const msg = this.parentNode.parentNode.childNodes[1].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('notes', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

// Array.from(trash).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const msg = this.parentNode.parentNode.childNodes[1].innerText;
//     fetch('notes', {
//       method: 'delete',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         'msg': msg
//       })
//     }).then(function (response) {
//       window.location.reload()
//     })
//   });
// });

