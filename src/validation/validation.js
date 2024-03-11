import { extend} from 'vee-validate';
// import {defineRule} from 'vee-validate';



import {
    required,
    // regex,
    alpha_spaces,
    // numeric,
    // email,
    // image,
    // size,
    min,
    // alpha,
    // min_value,
    // alpha_dash,
    max,
  } from "vee-validate/dist/rules";


  // 
  // 
 
  extend("required", {
    ...required,
    message: "This field is required",
  });

  extend("min", {
    ...min,
    message: "This field must be atleast 9 characters",
  });

  extend("max", {
    ...max,
    message: "This field may not be greater than 9 characters",
  });

  extend("alpha_spaces", {
    ...alpha_spaces,
    message: "The Full Name field may only contain alphabetic characters as well as spaces",
  });

//   defineRule('xyz', value => {
//     if (!value || !value.length) {
//         return 'This field is required';
//     }
//     return true;
// });


 extend("nicValidate", {
  valid: true,
  validate(value) {
    console.log('validate')
    const length = value.length;
    const firstDigit = value.charAt(0);
    const secondDigit = value.charAt(1);
    const thirdDigit = value.charAt(2);
    const fourthDigit = value.charAt(3);
    const fifthDigit = value.charAt(4);
    const sixthDigit = value.charAt(5);
    const seventhDigit = value.charAt(6);
    if (length !== 10 && length !== 12) {
      this.valid = false;
      return this.valid;
    } else if (length === 10) {
      if (
        firstDigit === "0" ||
        firstDigit === "1" ||
        firstDigit === "2" ||
        firstDigit === "3" ||
        firstDigit === "4"
      ) {
        this.valid = false;
        return this.valid;
      } else if (
        thirdDigit === "0" &&
        fourthDigit === "0" &&
        fifthDigit === "0"
      ) {
        this.valid = false;
        return this.valid;
      } else if (thirdDigit === "9" || thirdDigit === "4") {
        this.valid = false;
        return this.valid;
      } else if (
        (thirdDigit === "8" || thirdDigit === "3") &&
        (fourthDigit === "7" || fourthDigit === "8" || fourthDigit === "9")
      ) {
        this.valid = false;
        return this.valid;
      } else if (
        (thirdDigit === "8" || thirdDigit === "3") &&
        fourthDigit === "6" &&
        (fifthDigit === "7" || fifthDigit === "8" || fifthDigit === "9")
      ) {
        this.valid = false;
        return this.valid;
      } else if (
        thirdDigit === "5" &&
        fourthDigit === "0" &&
        fifthDigit === "0"
      ) {
        this.valid = true;
        return this.valid;
      } else {
        this.valid = true;
        return this.valid;
      }
    } else if (length === 12) {
      if (firstDigit !== "1" && firstDigit !== "2") {
        this.valid = false;
        return this.valid;
      } else if (firstDigit === "1" && secondDigit !== "9") {
        this.valid = false;
        return this.valid;
      } else if (firstDigit === "2" && secondDigit !== "0") {
        this.valid = false;
        return this.valid;
      } else if (
        firstDigit === "1" &&
        secondDigit === "9" &&
        (thirdDigit === "0" ||
          thirdDigit === "1" ||
          thirdDigit === "2" ||
          thirdDigit === "3" ||
          thirdDigit === "4")
      ) {
        this.valid = false;
        return this.valid;
      } else if (
        firstDigit === "2" &&
        secondDigit === "0" &&
        thirdDigit !== "0"
      ) {
        this.valid = false;
        return this.valid;
      } else if (
        fifthDigit === "0" &&
        sixthDigit === "0" &&
        seventhDigit === "0"
      ) {
        this.valid = false;
        return this.valid;
      } else if (fifthDigit === "9" || fifthDigit === "4") {
        this.valid = false;
        return this.valid;
      } else if (
        (fifthDigit === "8" || fifthDigit === "3") &&
        (sixthDigit === "7" || sixthDigit === "8" || sixthDigit === "9")
      ) {
        this.valid = false;
        return this.valid;
      } else if (
        (fifthDigit === "8" || fifthDigit === "3") &&
        sixthDigit === "6" &&
        (seventhDigit === "7" || seventhDigit === "8" || seventhDigit === "9")
      ) {
        this.valid = false;
        return this.valid;
      } else if (
        fifthDigit === "5" &&
        sixthDigit === "0" &&
        seventhDigit === "0"
      ) {
        this.valid = false;
        return this.valid;
      } else {
        this.valid = true;
        return this.valid;
      }
      
    }
  },
  message: () => {
    return "Please enter a valid NIC number";
  },
}); 