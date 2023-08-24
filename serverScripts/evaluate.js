export default function evaluate(symptoms="itching, shivering") {
  let symptoms_arr = symptoms.split(",");
  let final_arr = []
  symptoms_arr.forEach(element => {
    final_arr.push(capitalizeStringWords(element.trim()))
  });
  // console.log(final_arr.join(", "))
  return final_arr.join(",");
}

function capitalizeStringWords(inputString) {
  const words = inputString.split(' ');
  
  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  
  const result = capitalizedWords.join(' ');
  return result;
}

// console.log(evaluate("itching, shivering"))