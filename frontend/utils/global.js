import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    @font-face {
        font-family: 'radnika_next';
        src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');

        font-weight: normal;
        font-style: normal;
    }

    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        box-sizing: border-box;
        font-size: 10px;

        /* Global variables */
        --config-width: ${({ theme }) => theme.config.maxWidth};

        --color-main: ${({ theme }) => theme.colors.main};
        --color-white-off: ${({ theme }) => theme.colors.offWhite};
        --color-green: ${({ theme }) => theme.colors.green};
        --color-red: ${({ theme }) => theme.colors.red};
        --color-gray: ${({ theme }) => theme.colors.gray};
        --color-gray-light: ${({ theme }) => theme.colors.grayLight};
        --color-text: ${({ theme }) => theme.colors.text};
        
        --shadow: ${({ theme }) => theme.colors.bs};
    }

    body {
        padding: 0;
        margin: 0;

        font-family: 'radnika_next';

        font-size: 1.5rem; /* 1.5rem = 15px */;
        line-height: 2;
    }

    a, 
    input, 
    textarea,
    button {
        outline: none;
        text-decoration: none;
        font-family: inherit;

        color: black;
    }
`;
