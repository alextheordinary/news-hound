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

document
  .querySelector('#update-items')
  .addEventListener('click', updateItemsHandler);