/*---------------------------------------------------- $ ---------------------------------------------------------------*/
/** @:description ID と Classを変換する関数。これはjQueryもどきで大幅な変更しないための策。
 * $('#id') or $('.className') or $('+name')
 * @param  ex:) {String} - let id = $('#id') or let classname = $('.className') or let name = $('+name')
 * @return {Object} - id OR class OR name Object.
 */
$ = (x) => {
    const cln = /^\./g
    const idn = /^#/g
    const nem = /^[+]/g
    if (typeof x == "string") {
      if(x.match(cln)) return document.querySelectorAll(x)
      if(x.match(nem)) return ((!document.querySelector(`input[name="${x.replace(nem, "")}"]`))) ? document.querySelector(`select[name="${x.replace(nem, "")}"]`):document.querySelector(`input[name="${x.replace(nem, "")}"]`)
      return document.querySelector(x)
    }
    return x
  }
/*---------------------------------------------------- alertMessage ---------------------------------------------------------------*/
/** アラートメッセージを表示させる関数
 * alertMessage("Title", "Message", flag, delay)
 * @param  ({String},{Number},{Number}) - ex:) alertMessage("Message", flag, delay)
 * @return "undefined"
 */
let alertMessage = (msg, f, delay, e) => {
  let alertFlag = ["alert-primary","alert-secondary","alert-success","alert-danger","alert-warning","alert-info","alert-light","alert-dark"]
  f = (f===9) ? $("+alertFlag").value:f
  let alertTag  = $("#alert_tag")
  let alertLen  = `alert_${$(".alert").length}`
  let tagMsg    = `<div class="alert ${alertFlag[f]} alert-dismissible fade show ${alertLen}" role="alert" data-delay="${delay}">
                    ${msg}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  `
  if((parseInt(bootstrap.Tooltip.VERSION)>4)){
    alertTag.insertAdjacentHTML('afterend',tagMsg)
    var alertNode = document.querySelector(`.${alertLen}`)
    var alert     = new bootstrap.Alert(alertNode)
    setTimeout(() => {alert.close()}, delay);
  }else{
    $(tagMsg).prependTo(alertTag)
    $("."+alertLen).toast('show')
  }
}
/*---------------------------------------------------- toastMessage ---------------------------------------------------------------*/
/** トーストを表示させる関数
 * toastMessage("Title", "Message", flag, delay)
 * @param  ({String},{String},{Number},{Number/min:500[ms]}) - :) toastMessage("Title", "Message", 1, 3000)
 * @return "undefined"
 */
let toastMessage = (title, msg, f, delay)  => {
  let toastTag = $("#toast_tag")
  let toastLen = `toast_${$(".toast").length}`
  let tagMsg   = `<div class="toast ${toastLen}" role="alert" aria-live="assertive" aria-atomic="true" data-animation="true" data-delay="${delay}">
                  <div class="toast-header">
                    <strong class="mr-auto">${title}</strong>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="toast-body">${msg}</div>
                </div>
                `
  if((parseInt(bootstrap.Tooltip.VERSION)>4)){
    toastTag.insertAdjacentHTML('afterend',tagMsg)
    var toastNode = document.querySelector(`.${toastLen}`)
    var toast = new bootstrap.Toast(toastNode)
    toast.show()
  }else{
    $(tagMsg).prependTo(toastTag)
    $("."+toastLen).toast('show')
  }
}

let selectEdite = (e) =>{
  console.log(e.target.childNodes.length)
  if(e.target.childNodes.length<=3){
  let alertFlag = ["alert-primary","alert-secondary","alert-success","alert-danger","alert-warning","alert-info","alert-light","alert-dark"]
  let n = 0
  alertFlag.forEach(element => e.target.insertAdjacentHTML('beforeend',`<option value="${n++}">${element}</option>`));
  }else{}
}

$("+alertFlag").addEventListener('click', selectEdite, false)
$("#alertTest").addEventListener('click', alertMessage.bind(null,"Test",9,3000), false)
$("#toastTest").addEventListener('click', toastMessage.bind(null,"Title","Test",0,3000), false)