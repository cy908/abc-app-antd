import { APP_INITIALIZER } from '@angular/core';

import { StartupService } from './startup.service';

export const startupServiceFactory = (startupService: StartupService) => {
    return () => startupService.load();
}

export const STARTUP_PROVIDES = [
    StartupService,
    {
        provide: APP_INITIALIZER,
        useFactory: startupServiceFactory,
        deps: [StartupService],
        multi: true,
    },
];