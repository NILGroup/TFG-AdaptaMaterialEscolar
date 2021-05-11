import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { openDefinitionsModal } from '../../redux/definitions/definitions.actions';
import { selectDefinitionsModalIsDisplayed } from '../../redux/definitions/definitions.selectors';
import { openFillGapsModal } from '../../redux/fillGaps/fillgaps.actions';
import { selectFillGapsModalIsDisplayed } from '../../redux/fillGaps/fillgaps.selectors';
import { selectModalIsDisplayed } from '../../redux/pictograms/pictogram.selectors';
import {openPictogramFinder} from '../../redux/pictograms/pictograms.actions';
import { openWordSearchModal } from '../../redux/wordSearch/wordsearch.actions';
import { selectWordSearchModalIsDisplayed } from '../../redux/wordSearch/wordsearch.selectors';
import Definitions from '../exerciseDefinitions/definitions';
import PictoSearch from '../pictoPlugin/pictoSearch';
import WordSearchModal from '../wordSearch/wordsearchModal';
import FillGaps from '../fillGaps/fillGaps';

class Toolbar extends React.Component{
    
    render(){
        return (<div>
            <div className="toolbar-self">
                <button onClick={this.props.openPictogramFinder}>Pictogramas</button>
                <button onClick={this.props.openFillGapsModal}>Rellenar huecos</button>
                <button onClick={this.props.openDefinitionsModal}>Definiciones</button>
                <button onClick={this.props.openWordSearchModal}>Sopa de letras</button>
                <button>V/F</button>
            </div>
            <div className="modal-box">
                { this.props.showPictogramsModal ? <PictoSearch/> : null}
                { this.props.showFillGapsModal ? <FillGaps/> : null}
                { this.props.showWordSearchModal ? <WordSearchModal/> : null}
                { this.props.showDefinitionsModal ? <Definitions/> : null}
            </div>
        </div>)
    }
}

const mapDispatchToProps = (dispatch) => ({
    openPictogramFinder: () => dispatch(openPictogramFinder()),
    openWordSearchModal: () => dispatch(openWordSearchModal()),
    openDefinitionsModal: () => dispatch(openDefinitionsModal()),
    openFillGapsModal: () => dispatch(openFillGapsModal())
});

const mapStateToProps = createStructuredSelector({
    showPictogramsModal: selectModalIsDisplayed,
    showWordSearchModal: selectWordSearchModalIsDisplayed,
    showDefinitionsModal: selectDefinitionsModalIsDisplayed,
    showFillGapsModal: selectFillGapsModalIsDisplayed
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);