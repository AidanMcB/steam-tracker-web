import type { App } from 'vue';

// PrimeVue core
import PrimeVue from 'primevue/config';

// Import Lara theme (light-indigo is the default variant)
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// PrimeVue services
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

// PrimeVue components
import Button from 'primevue/button';
import Card from 'primevue/card';
import Carousel from 'primevue/carousel';
import Chart from 'primevue/chart';
import Checkbox from 'primevue/checkbox';
import Chip from 'primevue/chip';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmDialog from 'primevue/confirmdialog';
import DataView from 'primevue/dataview';
import Dialog from 'primevue/dialog';
import FloatLabel from 'primevue/floatlabel';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import MultiSelect from 'primevue/multiselect';
import Password from 'primevue/password';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToggleButton from 'primevue/togglebutton';
import Tooltip from 'primevue/tooltip';
import Message from 'primevue/message';
import Listbox from 'primevue/listbox';

// Black to Purple theme configuration
const BLACK_PURPLE_THEME = {
    unstyled: false,
    pt: {
        global: {
            css: `
                :root {
                    /* Purple Spectrum */
                    --purple-50: #F5F3FF;  /* Lightest purple */
                    --purple-100: #EDE9FE;
                    --purple-200: #DDD6FE;
                    --purple-300: #C4B5FD;
                    --purple-400: #A78BFA;
                    --purple-500: #8B5CF6;
                    --purple-600: #7C3AED;
                    --purple-700: #6D28D9;
                    --purple-800: #5B21B6;
                    --purple-900: #4C1D95; 
                    --purple-950: #2E1065; /* Deep purple */
                    
                    /* Black to Gray Spectrum */
                    --black: #000000;
                    --gray-950: #0A0A0A;
                    --gray-900: #171717;
                    --gray-800: #262626;
                    --gray-700: #404040;
                    --gray-600: #525252;
                    --gray-500: #737373;
                    --gray-400: #A3A3A3;
                    --gray-300: #D4D4D4;
                    --gray-200: #E5E5E5;
                    --gray-100: #F5F5F5;
                    --gray-50: #FAFAFA;
                    --white: #FFFFFF;
                    
                    /* Main Theme Variables */
                    --primary-color: #6D28D9; /* Purple-700 */
                    --primary-color-text: var(--white);
                    --secondary-color: #8B5CF6; /* Purple-500 */
                    --focus-ring: 0 0 0 0.2rem #C4B5FD; /* Purple-300 */
                    
                    /* Surface Colors */
                    --surface-ground: var(--purple-50);
                    --surface-section: var(--purple-100);
                    --surface-card: var(--white);
                    --surface-overlay: var(--white);
                    --surface-border: var(--purple-200);
                    
                    /* Text Colors */
                    --text-color: var(--gray-900);
                    --text-color-secondary: var(--gray-700);
                    
                    /* Highlight */
                    --highlight-bg: var(--purple-100);
                    --highlight-text-color: var(--purple-900);
                }
                
                /* Dark mode overrides */
                .dark {
                    --surface-ground: var(--gray-900);
                    --surface-section: var(--gray-800);
                    --surface-card: var(--gray-900);
                    --surface-overlay: var(--gray-900);
                    --surface-border: var(--gray-700);
                    --text-color: var(--gray-100);
                    --text-color-secondary: var(--gray-300);
                    --highlight-bg: var(--purple-900);
                    --highlight-text-color: var(--purple-200);
                }
                
                /* Button styles */
                .p-button {
                    background: var(--primary-color);
                    border-color: var(--primary-color);
                }
                
                .p-button:hover {
                    background: var(--purple-800);
                    border-color: var(--purple-800);
                }
                
                .p-button.p-button-secondary {
                    background: var(--secondary-color);
                    border-color: var(--secondary-color);
                }
                
                /* Card styles */
                .p-card {
                    border: 1px solid var(--purple-200);
                    background-color: var(--surface-card) !important;
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                
                /* Input field styles */
                .p-inputtext {
                    border-color: var(--purple-200);
                    background-color: var(--white);
                    color: var(--text-color);
                }
                
                .p-inputtext:focus {
                    border-color: var(--purple-500);
                    box-shadow: 0 0 0 1px var(--purple-200);
                }
                
                .p-float-label label {
                    color: var(--text-color-secondary);
                }
                
                .p-float-label input:focus ~ label {
                    color: var(--primary-color);
                }
                
                /* Menu styles */
                .p-menu, .p-menubar {
                    background-color: var(--surface-card);
                    border-color: var(--purple-200);
                    border-radius: 0.5rem;
                }
                
                .p-menuitem-text {
                    color: var(--text-color);
                }
                
                .p-menuitem-icon {
                    color: var(--primary-color) !important;
                }
                
                .p-menuitem-link:hover {
                    background-color: var(--purple-50) !important;
                }
                
                /* Dark mode specific styles */
                .dark .p-card,
                .dark .p-menu,
                .dark .p-menubar {
                    background-color: var(--surface-card) !important;
                    border-color: var(--gray-700);
                }
                
                .dark .p-inputtext {
                    background-color: var(--gray-800);
                    border-color: var(--gray-700);
                    color: var(--text-color);
                }
                
                .dark .p-menuitem-text {
                    color: var(--text-color);
                }
                
                .dark .p-menuitem-link:hover {
                    background-color: var(--gray-800) !important;
                }
            `
        }
    }
};

export default {
    install: (app: App): void => {
        // Setup PrimeVue with Black-Purple theme
        app.use(PrimeVue, BLACK_PURPLE_THEME);

        // Register PrimeVue services
        app.use(ToastService);
        app.use(ConfirmationService);

        // Register PrimeVue components
        app.component('Button', Button);
        app.component('Card', Card);
        app.component('Carousel', Carousel);
        app.component('Chart', Chart);
        app.component('Checkbox', Checkbox);
        app.component('Chip', Chip);
        app.component('ConfirmDialog', ConfirmDialog);
        app.component('ConfirmPopup', ConfirmPopup);
        app.component('DataView', DataView);
        app.component('Dialog', Dialog);
        app.component('FloatLabel', FloatLabel);
        app.component('InputGroup', InputGroup);
        app.component('InputGroupAddon', InputGroupAddon);
        app.component('InputText', InputText);
        app.component('Listbox', Listbox);
        app.component('Menu', Menu);
        app.component('Menubar', Menubar);
        app.component('Message', Message);
        app.component('MultiSelect', MultiSelect);
        app.component('Password', Password);
        app.component('Tag', Tag);
        app.component('Textarea', Textarea);
        app.component('Toast', Toast);
        app.component('ToggleButton', ToggleButton);

        // Register PrimeVue directives
        app.directive('tooltip', Tooltip);
    }
}; 