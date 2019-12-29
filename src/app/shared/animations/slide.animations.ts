import { animate, state, style, transition, trigger } from '@angular/animations';

export function slideToTop() {
    return trigger('slideToTop', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateY(100%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateY(-100%)' }))
        ])
    ]);
}

export function slideToBottom() {
    return trigger('slideToBottom', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateY(-100%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateY(100%)' }))
        ])
    ]);
}

export function slideToLeft() {
    return trigger('slideToLeft', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ])
    ]);
}

export function slideToRight() {
    return trigger('slideToRight', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateX(-100%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateX(100%)' }))
        ])
    ]);
}