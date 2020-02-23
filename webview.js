const path = require('path');

module.exports = Franz => {
    Franz.injectCSS(path.join(__dirname, 'threema.css'));

    // waiting for Javascript to be loaded
    document.addEventListener('DOMContentLoaded', () => {

        // waiting for AngularJS to be fully loaded
        angular.element(() => {
            const statusController = angular.element(document.querySelector('html')).controller();
            const webClientService = statusController.webClientService;
            const stateService = webClientService.stateService;

            // listen to changes in unreadCount
            stateService.evtUnreadCountChange.attach(count => {
                Franz.setBadge(count)
            });

            // show/hide info text at the top only when in messenger view
            const bodyElement = document.querySelector('body');
            const $transitions = angular.element(bodyElement).injector().get('$transitions');
            $transitions.onStart({to: 'messenger.home'}, () => bodyElement.classList.add('franz-messenger-home'));
            $transitions.onStart({from: 'messenger.home'}, () => bodyElement.classList.remove('franz-messenger-home'));
        });
    });
};
