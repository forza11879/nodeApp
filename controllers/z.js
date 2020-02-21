/* eslint-disable no-use-before-define */
Promise.all([Promise1, Promise2, Promise3])
  .then(result => {
    console.log(result);
  })
  .catch(error => console.log(`Error in promises ${error}`));

// A simple promise that resolves after a given time
// const timeOut = t =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(`Completed in ${t}`);
//     }, t);
//   });

// Resolving a normal promise.
// eslint-disable-next-line no-use-before-define
timeOut(1000).then(result => console.log(result)); // Completed in 1000

// Promise.all
Promise.all([timeOut(1000), timeOut(2000)]).then(result => console.log(result)); // ["Completed in 1000", "Completed in 2000"]

// /////////////////////////////////////////////////////
// A simple promise that resolves after a given time
// const timeOut = t =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(`Completed in ${t}`);
//     }, t);
//   });

// const durations = [1000, 2000, 3000];

// const promises = [];

durations.map(duration => {
  // In the below line, two things happen.
  // 1. We are calling the async function (timeout()). So at this point the async function has started and enters the 'pending' state.
  // 2. We are pushing the pending promise to an array.
  promises.push(timeOut(duration));
});

console.log(promises); // [ Promise { "pending" }, Promise { "pending" }, Promise { "pending" } ]

// We are passing an array of pending promises to Promise.all
// Promise.all will wait till all the promises get resolves and then the same gets resolved.
Promise.all(promises).then(response => console.log(response)); // ["Completed in 1000", "Completed in 2000", "Completed in 3000"]

// /////////////////////////////////////////////////

// A simple promise that resolves after a given time
// const timeOut = t =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (t === 2000) {
//         reject(`Rejected in ${t}`);
//       } else {
//         resolve(`Completed in ${t}`);
//       }
//     }, t);
//   });

// const durations = [1000, 2000, 3000];

// const promises = [];

durations.map(duration => {
  promises.push(timeOut(duration));
});

// We are passing an array of pending promises to Promise.all
Promise.all(promises)
  .then(response => console.log(response)) // Promise.all cannot be resolved, as one of the promises passed got rejected.
  .catch(error => console.log(`Error in executing ${error}`)); // Promise.all throws an error.

// /////////////////////////
const timeOut = t =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (t === 2000) {
        reject(`Rejected in ${t}`);
      } else {
        resolve(`Completed in ${t}`);
      }
    }, t);
  });

const durations = [1000, 2000, 3000];

const promises = durations.map(
  duration => timeOut(duration).catch(e => e) // Handling the error for each promise.
);

Promise.all(promises)
  .then(response => console.log(response)) // ["Completed in 1000", "Rejected in 2000", "Completed in 3000"]
  .catch(error => console.log(`Error in executing ${error}`));
