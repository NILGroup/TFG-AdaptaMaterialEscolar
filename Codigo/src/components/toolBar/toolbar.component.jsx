import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { openDefinitionsModal } from '../../redux/definitions/definitions.actions';
import { selectDefinitionsModalIsDisplayed } from '../../redux/definitions/definitions.selectors';
import { openDevelopModal } from '../../redux/develop/develop.actions';
import { selectDevelopModalIsDisplayed } from '../../redux/develop/develop.selectors';
import { openTrueFalseModal } from '../../redux/trueFalse/trueFalse.actions';
import { selectTrueFalseModalIsDisplayed } from '../../redux/trueFalse/trueFalse.selectors';
import { selectModalIsDisplayed } from '../../redux/pictograms/pictogram.selectors';
import { openPictogramFinder} from '../../redux/pictograms/pictograms.actions';
import { openWordSearchModal } from '../../redux/wordSearch/wordsearch.actions';
import { selectWordSearchModalIsDisplayed } from '../../redux/wordSearch/wordsearch.selectors';
import Definitions from '../exerciseDefinitions/definitions';
import Develop from '../exerciseDevelop/develop';
import TrueFalse from '../exerciseTrueFalse/trueFalse';
import PictoSearch from '../pictoPlugin/pictoSearch';
import WordSearchModal from '../wordSearch/wordsearchModal';
class Toolbar extends React.Component{
    
    render(){
        return (<div>
            <div className="toolbar-self">
                <button onClick={this.props.openPictogramFinder}>Pictogramas</button>
                <button >Rellenar huecos</button>
                <button onClick={this.props.openDefinitionsModal}>Definiciones</button>
                <button onClick={this.props.openDevelopModal}>Desarrollo</button>
                <button onClick={this.props.openTrueFalseModal}>V/F</button>
                <button onClick={this.props.openWordSearchModal}>Sopa de letras</button>
            </div>
            <div className="modal-box">
                { this.props.showPictogramsModal ? <PictoSearch/> : null}
                { this.props.showWordSearchModal ? <WordSearchModal/> : null}
                { this.props.showDefinitionsModal ? <Definitions/> : null}
                { this.props.showDevelopModal ? <Develop/> : null}
                { this.props.showTrueFalseModal ? <TrueFalse/> : null}
            </div>
        </div>)
    }
}

const mapDispatchToProps = (dispatch) => ({
    openPictogramFinder: () => dispatch(openPictogramFinder()),
    openWordSearchModal: () => dispatch(openWordSearchModal()),
    openDefinitionsModal: () => dispatch(openDefinitionsModal()),
    openDevelopModal: () => dispatch(openDevelopModal()),
    openTrueFalseModal: () => dispatch(openTrueFalseModal())
});

const mapStateToProps = createStructuredSelector({
    showPictogramsModal: selectModalIsDisplayed,
    showWordSearchModal: selectWordSearchModalIsDisplayed,
    showDefinitionsModal: selectDefinitionsModalIsDisplayed,
    showDevelopModal: selectDevelopModalIsDisplayed,
    showTrueFalseModal: selectTrueFalseModalIsDisplayed
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);