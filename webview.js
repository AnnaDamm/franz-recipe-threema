const path = require('path');

module.exports = Franz => {
    Franz.injectCSS(path.join(__dirname, 'threema.css'));

    // waiting for Javascript to be loaded
    document.addEventListener('DOMContentLoaded', () => {
        // waiting for AngularJS to be fully loaded
        angular.element(() => {
            const statusController = angular.element(document.querySelector('html')).controller();

            Franz.loop(() => {
                Franz.setBadge(statusController.unreadCount)
            });
        });
    });
};
