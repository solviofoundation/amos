import {
  R, styled
} from 'common'

export const Dropdown_ = styled.div`
  label {
    display: block;
    overflow: hidden;
    z-index: 2;
    width: 100%;
    /*  transition: all 1s ease-out;*/
  }

  span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 1.2em 0.85em;
    background: white;
    /* border-top: 1px solid rgba(0, 0, 0, 0.3); */
    cursor: pointer;
    z-index: 2;
  }
  
  span:hover {
    font-weight: 600;
  }

  a {
    text-decoration: none;
    color: #777 !important;
  }

  .show {display: block;}
`