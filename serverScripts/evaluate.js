export default function evaluate(symptoms="itching, shivering") {
  let symptoms_arr = symptoms.split(",");
  let final_arr = []
  symptoms_arr.forEach(element => {
    final_arr.push(capitalizeString(element.trim()))
  });
  // console.log(final_arr.join(", "))
  return final_arr.join(",");
}

function capitalizeString(string) {
  const firstLetter  = string[0].toUpperCase();
  const restOfTheLetter  = string.slice(1);

  const capitalizedWord = firstLetter+restOfTheLetter;
  return capitalizedWord;
}

// console.log(evaluate("itching, shivering"))