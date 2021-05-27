import "./toolbar.styles.scss";
import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectModalIsDisplayed } from '../../redux/pictograms/pictogram.selectors';
import {closePictogramFinder, openPictogramFinder} from '../../redux/pictograms/pictograms.actions';
import { closeWordSearchModal, openWordSearchModal } from '../../redux/wordSearch/wordsearch.actions';
import { selectWordSearchModalIsDisplayed } from '../../redux/wordSearch/wordsearch.selectors';
import PictogramSearchModal from '../pictogramSearchModal/pictogramSearchModal';
import WordSearchModal from '../wordSearch/wordsearchModal';
import { closeTrueFalseModal, openTrueFalseModal } from "../../redux/trueFalse/trueFalse.actions";
import { selectTrueFalseModalIsDisplayed } from "../../redux/trueFalse/trueFalse.selectors";
import TrueFalseModal from "../exerciseTrueFalse/trueFalseModal";
import { selectDefinitionsDevelopModalIsDisplayed } from "../../redux/definitionsDevelopModal/definitionsDevelopModal.selectors";
import { closeDefinitionsDevelopModal, openDefinitionsDevelopModal } from "../../redux/definitionsDevelopModal/definitionsDevelopModal.actions";
import DefinitionsDevelopModal from "../DefinitionsDevelopModal/definitionsDevelopModal";
import { selectToolbarLastOpened } from "../../redux/toolbar/toolbar.selectors";
import { updateLastOpened } from "../../redux/toolbar/toolbar.actions";
class Toolbar extends React.Component{
    
    handleClick = (e) =>{
        this.closeModal();
        this.props.updateLastOpened(e.target.name);
        switch(e.target.name){
            case "pictograms":
                this.props.openPictogramFinder();
                break;
            case "definitionsdevelop":
                this.props.openDefinitionsDevelopModal();
                break;
            case "wordsearch":
                this.props.openWordSearchModal();
                break;
            case "truefalse":
                this.props.openTrueFalseModal();
                break;
            default:
                break;
        }
    }

    closeModal(){
        switch(this.props.lastOpened){
            case "pictograms":
                if(this.props.showPictogramsModal)
                    this.props.closePictogramFinder();
                break;
            case "definitionsdevelop":
                if(this.props.showDefinitionsDevelopModal)
                    this.props.closeDefinitionsDevelopModal();
                break;
            case "wordsearch":
                if(this.props.showWordSearchModal)
                    this.props.closeWordSearchModal();
                break;
            case "truefalse":
                if(this.props.showTrueFalseModal)
                    this.props.closeTrueFalseModal();
                break;
            default:
                break;
        }
    }

    render(){
        return (
        <div className="toolbar">
            <div className="toolbar-self">
                <button name="pictograms" className={this.props.showPictogramsModal ? "pictograms-active" : null} onClick={this.handleClick}>Pictogramas</button>
                <button >Rellenar huecos</button>
                <button name="definitionsdevelop" className={this.props.showDefinitionsDevelopModal ? "definitions-active" : null} onClick={this.handleClick}>Definiciones/Desarrollo</button>
                <button name="wordsearch" className={this.props.showWordSearchModal ? "wordsearch-active" : null} onClick={this.handleClick}>Sopa de letras</button>
                <button name="truefalse" className={this.props.showTrueFalseModal ? "truefalse-active" : null} onClick={this.handleClick}>V/F</button>
            </div>
            <div className="modal-box">
                { this.props.showPictogramsModal ? <PictogramSearchModal/> : null}
                { this.props.showWordSearchModal ? <WordSearchModal/> : null}
                { this.props.showDefinitionsDevelopModal ? <DefinitionsDevelopModal/> : null}
                { this.props.showTrueFalseModal ? <TrueFalseModal/> : null}
            </div>
        </div>)
    }
}

const mapDispatchToProps = (dispatch) => ({
    openPictogramFinder: () => dispatch(openPictogramFinder()),
    openWordSearchModal: () => dispatch(openWordSearchModal()),
    openTrueFalseModal: () => dispatch(openTrueFalseModal()),
    openDefinitionsDevelopModal: () => dispatch(openDefinitionsDevelopModal()),
    closePictogramFinder: () => dispatch(closePictogramFinder()),
    closeWordSearchModal: () => dispatch(closeWordSearchModal()),
    closeTrueFalseModal: () => dispatch(closeTrueFalseModal()),
    closeDefinitionsDevelopModal: () => dispatch(closeDefinitionsDevelopModal()),
    updateLastOpened: (last) => dispatch(updateLastOpened(last))
});

const mapStateToProps = createStructuredSelector({
    showPictogramsModal: selectModalIsDisplayed,
    showWordSearchModal: selectWordSearchModalIsDisplayed,
    showTrueFalseModal: selectTrueFalseModalIsDisplayed,
    showDefinitionsDevelopModal: selectDefinitionsDevelopModalIsDisplayed,
    lastOpened: selectToolbarLastOpened
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);