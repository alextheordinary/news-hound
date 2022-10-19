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
  const pressedButton = event.target;
  const itemID = pressedButton.dataset.itemid;
  console.log(`item id ${itemID}`);
  const buttonStatus = event.target.dataset.status;
  console.log(`button status ${buttonStatus}`);
  if (buttonStatus === 'false') {
    const response = await fetch('api/saved/', {
      method: 'POST',
      body: JSON.stringify({ item_id: itemID }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // toggle the button between 'Save' and 'Unsave'
      pressedButton.dataset.status = 'true';
      pressedButton.textContent = "Unsave";
    } else {
      alert('Failed to post');
    }
  } else {
    const response = await fetch('api/saved/', {
      method: 'DELETE',
      body: JSON.stringify({ item_id: itemID }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // toggle the button between 'Save' and 'Unsave'
      pressedButton.dataset.status = 'false';
      pressedButton.textContent = "Save";
    } else {
      alert('Failed to delete');
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

