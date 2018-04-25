import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  

  body {
    margin: 0;
    font-weight:normal;
  }
  * {
    margin: 0;
}
  *, *::after, *::before {
      box-sizing: border-box;
  }
  button{
      outline: none;
  }
  .pac-container {
      z-index: 2000!important;
  }
  .fileinput-button {
  position: relative;
  overflow: hidden;
  display: inline-block;
  white-space: inherit;
  input {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    z-index: 1;
    opacity: 0;
    -ms-filter: 'alpha(opacity=0)';
    font-size: 200px;
    direction: ltr;
    cursor: pointer;
  }
}
`;
