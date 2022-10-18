const updateFeedsHandler = async (event) => {
    event.preventDefault();
    let inputElements = document.getElementsByClassName('feed-check');
    const subsToAdd = [];
    for (let i = 0; i < inputElements.length; i++) {
        if (inputElements[i].checked) {
            subsToAdd.push(
                inputElements[i].dataset.feed_id
            );
        }
    }
    const response = await fetch('api/subscribed/addnew/', {
        method: 'POST',
        body: JSON.stringify(subsToAdd),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
     const response = await fetch('api/items/runparse/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to update items');
      }
    } else {
        alert('Failed to update items');
    }

};

document
   .querySelector('#update-feeds')
   .addEventListener('click', updateFeedsHandler);