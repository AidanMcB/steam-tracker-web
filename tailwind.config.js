/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue}",
    ],
    theme: {
        extend: {
            colors: {
                steam: {
                    light: '#5c7e10',
                    standard: '#5b7e10',
                    dark: '#2a475e',
                    darker: '#1b2838'
                },
                mute: {
                    light: '#5d5d5d',
                    standard: '#282828',
                    dark: '#222222',
                    darker: '#181818'
                },
                purple: {
                    50: '#F3E5F5',
                    100: '#E1BEE7',
                    200: '#CE93D8',
                    300: '#BA68C8',
                    400: '#AB47BC',
                    500: '#9C27B0',
                    600: '#8E24AA',
                    700: '#7B1FA2',
                    800: '#6A1B9A',
                    900: '#4A148C',
                },
                gray: {
                    50: '#FAFAFA',
                    100: '#F5F5F5',
                    200: '#EEEEEE',
                    300: '#E0E0E0',
                    400: '#BDBDBD',
                    500: '#9E9E9E',
                    600: '#757575',
                    700: '#616161',
                    800: '#424242',
                    900: '#212121',
                }
            },
            screens: {
                'mobile': '320px'
            }
        },
    },
    future: {
        hoverOnlyWhenSupported: true
    },
    plugins: [],
} 