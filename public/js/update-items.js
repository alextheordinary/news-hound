const updateItemsHandler = async (event) => {
  event.preventDefault();

  const response = await fetch('api/items/runparse/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to update items');
  }

};

const saveItemHandler = async (event) => {
  event.preventDefault();
  const itemID = event.target.dataset.itemid;
  const buttonStatus = event.target.dataset.status;
  if (buttonStatus === 'false') {
    const response = await fetch('api/saved/', {
      method: 'POST',
      body: { item_id: itemID },
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // toggle the button between 'Save' and 'Unsave'
    } else {
      alert('Failed to update items');
    }
  } else {
    const response = await fetch('api/saved/', {
      method: 'DELETE',
      body: { item_id: itemID },
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // toggle the button between 'Save' and 'Unsave'
    } else {
      alert('Failed to update items');
    }
  }

};



document
  .querySelector('#update-items')
  .addEventListener('click', updateItemsHandler);

let inputElements = document.getElementsByClassName('save-toggle');
console.log(inputElements)
for (let i = 0; i < inputElements.length; i++) {
  console.log('adding event listener')
  inputElements[i]
    .addEventListener('click', saveItemHandler)
}

