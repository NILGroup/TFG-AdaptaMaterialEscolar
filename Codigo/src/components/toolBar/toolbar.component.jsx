import "./toolbar.styles.scss";
import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { openDefinitionsModal } from '../../redux/definitions/definitions.actions';
import { selectDefinitionsModalIsDisplayed } from '../../redux/definitions/definitions.selectors';
import { openDevelopModal } from '../../redux/develop/develop.actions';
import { selectDevelopModalIsDisplayed } from '../../redux/develop/develop.selectors';
import { selectModalIsDisplayed } from '../../redux/pictograms/pictogram.selectors';
import {openPictogramFinder} from '../../redux/pictograms/pictograms.actions';
import { openWordSearchModal } from '../../redux/wordSearch/wordsearch.actions';
import { selectWordSearchModalIsDisplayed } from '../../redux/wordSearch/wordsearch.selectors';
import PictoSearch from '../pictoPlugin/pictoSearch';
import DefinitionsModal from '../exerciseDefinitions/definitionsModal';
import DevelopModal from '../exerciseDevelop/developModal';
import WordSearchModal from '../wordSearch/wordsearchModal';
import { openTrueFalseModal } from "../../redux/trueFalse/trueFalse.actions";
import { selectTrueFalseModalIsDisplayed } from "../../redux/trueFalse/trueFalse.selectors";
import TrueFalseModal from "../exerciseTrueFalse/trueFalseModal";
class Toolbar extends React.Component{
    
    render(){
        return (
        <div className="toolbar">
            <div className="toolbar-self">
                <button className={this.props.showPictogramsModal ? "pictograms-active" : null} onClick={this.props.openPictogramFinder}>Pictogramas</button>
                <button >Rellenar huecos</button>
                <button className={this.props.showDefinitionsModal ? "definitions-active" : null} onClick={this.props.openDefinitionsModal}>Definiciones</button>
                <button className={this.props.showWordSearchModal ? "wordsearch-active" : null} onClick={this.props.openWordSearchModal}>Sopa de letras</button>
                <button className={this.props.showTrueFalseModal ? "truefalse-active" : null} onClick={this.props.openTrueFalseModal}>V/F</button>
                <button className={this.props.showDevelopModal ? "develop-active" : null} onClick={this.props.openDevelopModal}>Desarrollo</button>
            </div>
            <div className="modal-box">
                { this.props.showPictogramsModal ? <PictoSearch/> : null}
                { this.props.showWordSearchModal ? <WordSearchModal/> : null}
                { this.props.showDefinitionsModal ? <DefinitionsModal/> : null}
                { this.props.showTrueFalseModal ? <TrueFalseModal/> : null}
                { this.props.showDevelopModal ? <DevelopModal/> : null}
            </div>
        </div>)
    }
}

const mapDispatchToProps = (dispatch) => ({
    openPictogramFinder: () => dispatch(openPictogramFinder()),
    openWordSearchModal: () => dispatch(openWordSearchModal()),
    openDefinitionsModal: () => dispatch(openDefinitionsModal()),
    openTrueFalseModal: () => dispatch(openTrueFalseModal()),
    openDevelopModal: () => dispatch(openDevelopModal())
});

const mapStateToProps = createStructuredSelector({
    showPictogramsModal: selectModalIsDisplayed,
    showWordSearchModal: selectWordSearchModalIsDisplayed,
    showDefinitionsModal: selectDefinitionsModalIsDisplayed,
    showTrueFalseModal: selectTrueFalseModalIsDisplayed,
    showDevelopModal: selectDevelopModalIsDisplayed
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);