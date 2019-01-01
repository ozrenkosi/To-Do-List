changeInputPosition();

// User entered a task and clicked enter key
document.getElementById('textInputField').addEventListener('keydown', function(event) {
  // Entered text
  var value = this.value;

  if ((event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 13 || event.keyCode === 13 || event.code === 10 || event.keyCode === 10) && value) {
    // If there is any text inside the item field, add that text to the todo list
    addItem(value);

    // Reset text input
    document.getElementById('textInputField').value = '';
  }
});

// Moves textInputField up or down depending on if list is empty
function changeInputPosition() {
  if (!document.getElementById('todo').hasChildNodes() && !document.getElementById('completed').hasChildNodes()) {
    // List is empty
    document.getElementById('textInputField').style.top = '42%';
    document.getElementById('tasksContainer').style.opacity = '0';

    document.getElementById('textInputField').focus();
  }
  else {
    // List has items
    document.getElementById('textInputField').style.top = '30%';
    document.getElementById('tasksContainer').style.opacity = '100';
  }
}

function removeItem() {
  // 'this' is removeButton
  var divWrapper = this.parentNode;
  var listItem = divWrapper.parentNode;
  var list = listItem.parentNode;

  // Adds class name cardDeleteAnimation to diw wrapper which starts animation
  divWrapper.classList.add('cardDeleteAnimation');

  // After 0,45 seconds remove list item from list
  setTimeout(function() {
    list.removeChild(listItem);

    changeInputPosition()
  }, 450);
}

function completeItem() {
  // 'this' is completeButton
  var listItem = this.parentNode.parentNode;
  var list = listItem.parentNode;
  // Grabs lists ID (todo or completed)
  var id = list.id;

  // Check if the item should be added to the completed list or to re-added to the todo list
  var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

  // Removes list item from one list and adds it to the top of another list
  list.removeChild(listItem);
  target.insertBefore(listItem, target.childNodes[0]);
}

function addItem(text) {
  var list = document.getElementById('todo');

  // Create list item
  var listItem = document.createElement('li');

  // Create div wrapper and set innerText to entered text
  var divWrapper = document.createElement('div');
  divWrapper.innerText = text;

  // Create completeButton and set its class to complete
  var completeButton = document.createElement('button');
  completeButton.classList.add('complete');

  // Add click event for completing the item
  completeButton.addEventListener('click', completeItem);

  // Create removeButton and set its class to remove
  var removeButton = document.createElement('button');
  removeButton.classList.add('remove');

  // Add click event for removing the item
  removeButton.addEventListener('click', removeItem);

  // Add diw wrapper to list item
  listItem.appendChild(divWrapper);

  // Add buttons to div wrapper
  divWrapper.appendChild(completeButton);
  divWrapper.appendChild(removeButton);

  // Add list item to the top of todo list
  list.insertBefore(listItem, list.childNodes[0]);

  changeInputPosition()
}
