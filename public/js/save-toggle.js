const saveItemHandler = async (event) => {
    event.preventDefault();
    const itemID = event.target;
    console.log(itemID);
//         const response = await fetch('api/saved/', {
//             method: 'POST',
//             body: {},
//             headers: { 'Content-Type': 'application/json' },
//         });
//         if (response.ok) {
//             // toggle the button between 'Save' and 'Unsave'
//           } else {
//             alert('Failed to update items');
//           }
    
 };

document
  .querySelector('#save-toggle')
  .addEventListener('click', saveItemHandler);