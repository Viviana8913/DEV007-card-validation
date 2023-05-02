const validator = {

  isValid: function(numberCard){
    let result = 0; 
    let resultLuhn = "";
    let resultMulti = "";
    for (let i=0; i < numberCard.length; i ++) {
      if (i % 2 === 0){
        resultMulti = numberCard.substring(i, i +1)+2;
      } else{
        resultMulti = numberCard.substring(i, i + 1);
      }
      if (resultMulti >= 10){
        resultMulti = ((resultMulti - (resultMulti % 10)) / 10) + (resultMulti % 10);
      }
      resultLuhn = resultLuhn + resultMulti;
    }

    for (let i = 0; i < resultLuhn.length; i ++){
      result = result + resultLuhn.substring (i, i + 1);
    }

    return result % 10 === 0;

  },


  maskify : function(numbersConcataned){
    let maskAply = ""
    if (numbersConcataned.length <= 4){
      maskAply = numbersConcataned;
    } else {
      const mascara = numbersConcataned.slice(0, -4);
      const visibility = numbersConcataned.slice(numbersConcataned.length -4, numbersConcataned.length +1);
      let remplazados = ""
      for (let i = 1; i <= mascara.length; i ++){
        remplazados = remplazados + "#"
      }
  
      maskAply = remplazados + visibility
  
    }

    return maskAply

  }   
};

export default validator;
