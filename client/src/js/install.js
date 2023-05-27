const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => { // listen for beforeinstallprompt event
    window.deferredPrompt = event;
    butInstall.classList.toggle("hidden", false)
})


// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt; // show the install prompt
    if (!promptEvent) { // The deferred prompt isn't available.
        return;
    }
    promptEvent.prompt();
    window
    butInstall.classList.toggle("hidden", true) // Hide the install button, it can't be called twice.

});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null; // Clear the deferredPrompt so it can be garbage collected
    console.log('JATE was installed.', 'appinstalled', event);
});

