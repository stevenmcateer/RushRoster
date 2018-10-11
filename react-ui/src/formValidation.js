export function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    if(re.test(email)){
      return true;
    } else {
      alert('Please enter a valid email address');
      return false;
    };
}

export function validatePass(p1, p2) {
  if( validatePassEq(p1, p2) && validatePassVal(p1) ) {
    return true;
  };
}

export function validatePassVal(p1) {
    if(p1.length >= 8 && p1.length <= 24) {
      return true;
    } else {
      alert('Please enter between an 8-24 character password');
      return false;
    };
}

export function validatePassEq(p1, p2) {
    if(p1 === p2){
      return true;
    } else {
      alert('Please enter the same password twice');
      return false;
    };
}

export function validateName(name) {
  var val = name.replace(/\s/g, '');
  if(val.length > 0){
    return true;
  } else {
    alert('Please enter a name');
    return false;
  }
}
