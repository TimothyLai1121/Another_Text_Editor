const butInstall = document.getElementById('buttonInstall');
// Retrieve the HTML element with the id 'buttonInstall' and assign it to the constant variable `butInstall`.

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // When the `beforeinstallprompt` event is triggered, execute the following function:
  window.deferredPrompt = event;
  // Store the event object in the `window.deferredPrompt` property.
  butInstall.classList.toggle('hidden', false);
  // Remove the 'hidden' class from the `butInstall` element, making it visible.

});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // When the `butInstall` element is clicked, execute the following async function:
  const promptEvent = window.deferredPrompt;
  // Retrieve the stored `window.deferredPrompt` property and assign it to the `promptEvent` variable.
  if (!promptEvent) {
    // If `promptEvent` is null or undefined, return early and do nothing.
    return;
  }
  promptEvent.prompt();
  // Call the `prompt()` method on `promptEvent` to prompt the user to install the app.

  window.deferredPrompt = null;
  // Set `window.deferredPrompt` to null, indicating that there is no deferred prompt available.
  butInstall.classList.toggle('hidden', true);
  // Add the 'hidden' class to the `butInstall` element, hiding it.

});


// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // When the `appinstalled` event is triggered, execute the following function:
  window.deferredPrompt = null;
  // Set `window.deferredPrompt` to null, indicating that there is no deferred prompt available.
});
