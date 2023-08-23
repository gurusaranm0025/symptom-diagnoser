export default function evaluate(symptoms) {
  let symptoms_arr = symptoms.split(",");
  let final_arr = symptoms_arr.array.forEach(element => {
    return element.charAt(0).toUpperCase() +element.slice(1).lower()
  });

  return (final_arr.join(","))
}