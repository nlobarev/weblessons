var
   inputField = document.getElementById("inputPassword")

inputField.value = '';
window.addEventListener('keydown', function(){inputField.focus();});

function inputPassword(){
  var
     inputField = document.getElementById("inputPassword"),
     inputList = document.getElementsByClassName("passInputField");

  for(var i = 0; i < inputList.length; i++){
    inputList[i].value = '';
  }

  for(var i = 0; i < inputField.value.length; i++){
    inputList[i].value =  inputField.value[i]
  }
};
