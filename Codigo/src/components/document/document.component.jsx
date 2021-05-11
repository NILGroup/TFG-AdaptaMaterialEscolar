import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectCurrentDocument} from '../../redux/document/document.selectors';
import {Popover} from 'react-text-selection-popover';
import {css} from '@emotion/css'
import { Document, Page } from 'react-pdf';

const DocumentLoaded = ({document}) => (<div className='pdf-file' >
    <Popover
  render={
    ({ clientRect, isCollapsed, textContent }) => {
      if (clientRect == null || isCollapsed) return null

      // I'm using emotion for this example but you can use anything really
      const style = css`
        position: absolute;
        left: ${clientRect.left + clientRect.width / 2}px;
        top: ${clientRect.top - 40}px;
        margin-left: -75px;
        width: 150px;
        background: blue;
        font-size: 0.7em;
        pointer-events: none;
        text-align: center;
        color: white;
        border-radius: 3px;
      `

      return <div className={style}>
        Selecting {(textContent || '').length} characters
      </div>
    }
  }
/>
<div>Hola</div>
<Document
        inputRef={document}
      >
      </Document>
    
        
    </div>
);

const mapStateToProps = createStructuredSelector({
    document: selectCurrentDocument
});
  
export default connect(mapStateToProps)(DocumentLoaded);