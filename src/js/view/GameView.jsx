import React from 'react';
import createView from 'omniscient';
import _ from 'lodash';
import PlayerView  from './PlayerView.jsx';
import Overlay from './Overlay.jsx';

const GameView = createView('GameView', function (props) {

    const { state, settings } = props;
    const { players, round, nextShape, winner } = state;
    const { player, field } = settings;
    const cell = field.cell;
    const canvas = player.canvas;
    const fieldWidth = field.width * cell.width;
    const fieldHeight = field.height * cell.height;

    let playerView = [];

    _.forEach(players, function (player) {
        playerView.push(_.assign({
            settings: settings,
            nextShape: nextShape,
        }, player));
    });

    /**
     * Data should have the following structure:
     * {
     *     round: Integer,
     *     playerView: [
     *         Object,
     *         Object
     *     ],
     *     winner: [unset | string]
     * }
     */

    return (
        <svg className="TetrisGame" viewBox={ `0 0 ${canvas.width} ${canvas.height}` } preserveAspectRatio="xMidYMid meet">
            <defs>
                <symbol id="background-playername-left" viewBox="0 0 362 71" width="328" height="71">
                    <g>
                        <polygon fill="#AC0000" points="362,64.3 240,64.3 240,27.3 362,27.3 354,45.3"/>
                        <rect x="65" y="17.3" fill="#E00C0C" width="191" height="37"/>
                        <g>
                            <path fill="#AC0000" d="M37.2,69.6c-18.7,0-34-15.3-34-34c0-18.7,15.3-34,34-34s34,15.3,34,34C71.2,54.3,56,69.6,37.2,69.6z"/>
                            <path fill="#E00C0C" d="M37.2,2.6c18.2,0,33,14.8,33,33s-14.8,33-33,33s-33-14.8-33-33S19,2.6,37.2,2.6 M37.2,0.6c-19.3,0-35,15.7-35,35s15.7,35,35,35s35-15.7,35-35S56.5,0.6,37.2,0.6L37.2,0.6z" />
                        </g>
                    </g>
                    <path fill="#FFFFFF" d="M53.2,39.7c0.3-1.2,0.4-2.5,0.4-3.8c0-5.1-2.2-9.6-5.7-12.7v-5.4c0-1-0.8-1.9-1.9-1.9c-1,0-1.9,0.8-1.9,1.9v2.8C42,19.6,39.5,19,36.8,19c0,0,0,0,0,0c-2.6,0-5.1,0.6-7.4,1.7v-2.8c0-1-0.8-1.9-1.9-1.9c-1,0-1.9,0.8-1.9,1.9v5.4c-3.5,3.1-5.7,7.6-5.7,12.7c0,1.3,0.1,2.6,0.4,3.8H53.2z M44.6,28.9c2.5,0,4.6,1.7,4.6,4.3c0,2.6-2.9,4.3-5.4,4.3s-4.6-1.2-4.6-3.8C39.2,31.2,42.1,28.9,44.6,28.9z M29.1,28.9c2.5,0,5.4,2.2,5.4,4.8c0,2.6-2.1,3.8-4.6,3.8c-2.5,0-5.4-1.7-5.4-4.3C24.5,30.6,26.5,28.9,29.1,28.9z M49.1,41.6l-2.8,5.1l-2.8-5.1H30l-2.8,5.1l-2.8-5.1h-6.2C20.9,49.4,28.2,55,36.8,55c0,0,0,0,0,0c8.6,0,15.9-5.6,18.5-13.4H49.1z" />
                </symbol>
                <symbol id="background-playername-right" viewBox="0 0 359.8 70.3" width="328" height="71">
                    <g>
                        <polygon fill="#062B4E" points="0,63.9 122,63.9 122,26.9 0,26.9 8,44.9 	"/>
                        <rect x="106" y="16.9" fill="#0072FF" width="191" height="37"/>
                        <g>
                            <path fill="#062B4E" d="M324.8,69.2c-18.7,0-34-15.3-34-34c0-18.7,15.3-34,34-34s34,15.3,34,34C358.8,53.9,343.5,69.2,324.8,69.2z"/>
                            <path fill="#0072FF" d="M324.8,2.2c18.2,0,33,14.8,33,33s-14.8,33-33,33s-33-14.8-33-33S306.5,2.2,324.8,2.2 M324.8,0.2c-19.3,0-35,15.7-35,35s15.7,35,35,35s35-15.7,35-35S344.1,0.2,324.8,0.2L324.8,0.2z"/>
                        </g>
                    </g>
                    <path fill="#FFFFFF" d="M344.8,44.6c0-4.3-0.7-8.4-2.1-12.1c-0.6,0.5-1.4,0.9-2.3,0.9c-2.2,0-4-2.2-4-4.8c0-1.7,0.7-3.2,1.8-4c-3.5-4.3-8-6.9-13-6.9l0,0l0,0c0,0,0,0,0,0l0,0c-5,0-9.6,2.6-13,6.9c1.1,0.9,1.8,2.3,1.8,4c0,2.7-1.8,4.8-4,4.8c-0.8,0-1.6-0.3-2.3-0.9c-1.3,3.6-2.1,7.7-2.1,12.1h6.1c0,0,0,0,0,0c0-2.2,0.9-3.9,2.1-3.9c1.1,0,2.1,1.8,2.1,3.9c0,0,0,0,0,0h9.2h0h9.2c0,0,0,0,0,0c0-2.2,0.9-3.9,2.1-3.9c1.1,0,2.1,1.8,2.1,3.9c0,0,0,0,0,0H344.8z M318.9,39c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4c2.2,0,4,1.8,4,4C322.9,37.2,321.1,39,318.9,39z M331.8,39c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4c2.2,0,4,1.8,4,4C335.8,37.2,334,39,331.8,39z"/>
                </symbol>
                <symbol id="next-block-left" viewBox="0 0 85 184" width="85" height="184">
                    <path fill="#FFFFFF" d="M85,182H12c-5,0-10-5-10-10V23c0-5,5-8,10-8h5V4.4C17,2.8,19,2,20.6,2h3.8c1,0,1.5,0.2,2,1.1L28,6.3V4.4C28,2.8,30.4,2,32.1,2h3.7C37.5,2,38,2.8,38,4.4v3.3c1-0.4,1.9-0.6,2.9-0.8c0.8-0.1,2.1-0.2,3-0.2c0.9,0,1.5,0.1,2,0.1c0.6,0,1.1,0.3,1.7,0.4c0.6,0.1,1,0.6,1.5,0.7c0.2-0.1,0.3-0.2,0.5-0.2C50,7.8,50.5,8,50.9,8h4.5c1,0,2,0.1,2.6,1l0.1-0.4l0.1,0.2c0.5-0.7,1.2-0.8,2-0.8c0.2,0,0.4,0,0.5,0h4.5c0.2,0,0.4-0.3,0.5-0.3c0,0,0,0,0,0L66,5.9c0.2-1.5,1.5-1.9,3-1.9h3.1C73.7,4,74,4.1,74,5.8V8h1.2C76.9,8,77,8.1,77,9.7v2.8c0,0.5,1.1,1.4,0.8,2.4H85v-2h-5.6c-0.1-0.3-0.3-0.5-0.4-0.7c0,0,0,0,0-0.1V9.7c0-2.5-0.8-3.5-3-3.7V5.8C76,2.5,74.1,2,72.1,2h-3.1c-2.7,0-4.6,1.4-4.9,3.6c0,0,0,0,0,0.1L64,6h-3.3l-0.3,0l-0.3,0c-0.5,0-1.4,0-2.2,0.4C57,6,56,6,55.4,6h-4.5c-0.1,0-0.1,0-0.2-0.1c-0.3-0.1-0.6-0.1-1-0.1c-0.1,0-0.1,0-0.2,0c-0.4-0.2-0.8-0.5-1.4-0.6c-0.2,0-0.3-0.1-0.5-0.1c-0.4-0.1-0.9-0.2-1.4-0.3c-0.1,0-0.3,0-0.5,0c-0.5,0-1-0.1-1.7-0.1c-1.5,0-2.6,0.1-3.4,0.2C40.4,4.9,40.2,5,40,5V4.4C40,0.6,37.4,0,35.8,0h-3.7c-1.6,0-3.3,0.5-4.5,1.4c-0.8-1-1.8-1.4-3.2-1.4h-3.8C17.8,0,15,1.5,15,4.4V13h-3C6.1,13,0,16.7,0,23v149c0,6.1,5.9,12,12,12h73V182z"/>
                    <path fill="#181818" d="M11,177h74V20H11c-2.2,0-4,1.8-4,4v149C7,175.2,8.8,177,11,177z"/>
                    <path d="M11,15h74v5H11c-2.2,0-4,1.8-4,4v149c0,2.2,1.8,4,4,4h74v5H11c-5,0-9-4-9-9V24C2,19,6,15,11,15z"/>
                    <g>
                        <path d="M34.8,5.4v19.5h-3.7l-7.7-12.4v12.4h-3.7V5.4h3.8L31.1,18V5.4H34.8 M34.8,2.4h-3.7c-1.7,0-3,1.3-3,3v1.9L26,3.8c-0.5-0.9-1.5-1.4-2.6-1.4h-3.8c-1.7,0-3,1.3-3,3v19.5c0,1.7,1.3,3,3,3h3.7c1.7,0,3-1.3,3-3v-1.9l2.2,3.5c0.5,0.9,1.5,1.4,2.5,1.4h3.7c1.7,0,3-1.3,3-3V5.4C37.8,3.8,36.5,2.4,34.8,2.4L34.8,2.4z"/>
                        <path d="M43,10.6c0.8,0,1.4,0,1.9,0c0.4,0,0.9,0.1,1.3,0.2c0.5,0.1,0.8,0.2,1.1,0.3c0.3,0.2,0.6,0.4,0.8,0.6s0.5,0.6,0.6,0.9c0.3,0.8,0.5,1.7,0.5,2.8s-0.2,1.8-0.5,2.4c-0.6,1-1.7,1.5-3.5,1.5h-4.5c0,0.6,0.1,1.1,0.2,1.5s0.3,0.6,0.6,0.8c0.3,0.2,0.6,0.3,0.9,0.3c0.3,0,1.2,0.1,2.5,0.1s2.7-0.1,4-0.3v2.5c-0.8,0.3-1.6,0.5-2.4,0.6c-0.8,0.1-1.4,0.1-1.7,0.1c-0.3,0-0.7,0-1.1,0c-0.6,0-1.3,0-2,0c-1.8,0-3-0.5-3.6-1.6c-0.7-1.1-1-2.9-1-5.4c0-2.5,0.3-4.2,0.8-5.3c0.5-1,1.5-1.7,3-1.9C41.5,10.7,42.2,10.6,43,10.6 M40.8,16.7h3.5c0.8,0,1.2-0.4,1.2-1.1c0-0.9-0.1-1.5-0.4-1.7s-0.7-0.4-1.4-0.4c-0.7,0-1.2,0-1.5,0.1c-0.3,0-0.5,0.2-0.8,0.4s-0.4,0.5-0.5,0.9c-0.1,0.4-0.1,0.8-0.1,1.2S40.8,16.6,40.8,16.7 M43,7.6c-1,0-1.8,0.1-2.6,0.2c-3,0.5-4.5,2.2-5.1,3.5C34.4,12.9,34,15,34,18c0,3.1,0.5,5.3,1.5,6.9c0.9,1.4,2.6,3.1,6.2,3.1c0.8,0,1.5,0,2.1,0c0.5,0,0.9,0,1.2,0c0.3,0,0.9-0.1,1.7-0.1c1.1-0.1,2.2-0.3,3.2-0.7c1.2-0.4,1.9-1.6,1.9-2.8v-2.5c0-0.8-0.3-1.5-0.8-2.1c0.1-0.1,0.2-0.2,0.2-0.4c0.6-1,0.9-2.3,0.9-3.9c0-1.4-0.2-2.7-0.7-3.9c-0.3-0.7-0.7-1.4-1.3-2c-0.5-0.4-1-0.8-1.5-1.1c-0.6-0.3-1.2-0.5-2-0.7c-0.6-0.1-1.1-0.2-1.7-0.2C44.5,7.7,43.8,7.6,43,7.6L43,7.6z"/>
                        <path d="M64.2,10.8l-4.9,7.1l4.7,7h-4.3L57,20.7l-2.6,4.2h-4.5l4.9-7.1l-4.9-7h4.5L57,15l2.7-4.2H64.2 M64.2,7.8h-4.5c-1,0-2,0.5-2.5,1.4l-0.1,0.1L57,9.2c-0.5-0.9-1.5-1.4-2.6-1.4h-4.5c-1.1,0-2.1,0.6-2.7,1.6c-0.5,1-0.4,2.2,0.2,3.1l3.7,5.3l-3.7,5.4c-0.6,0.9-0.7,2.1-0.2,3.1c0.5,1,1.5,1.6,2.7,1.6h4.5c1,0,2-0.5,2.5-1.4l0.1-0.1l0.1,0.1c0.5,0.9,1.5,1.4,2.5,1.4H64c1.1,0,2.1-0.6,2.6-1.6c0.5-1,0.5-2.2-0.2-3.1l-3.6-5.3l3.8-5.4c0.6-0.9,0.7-2.1,0.2-3.1S65.3,7.8,64.2,7.8L64.2,7.8z"/>
                        <path d="M71.1,6.8v3.9h3.2v2.8h-3.2v5.7c0,1,0.1,1.6,0.3,2c0.2,0.4,0.5,0.6,0.9,0.8c1.1,0.4,1.7,0.6,1.8,0.6v2.3h-3.2c-2.3,0-3.5-1.7-3.5-5.1v-6.2H65v-2.1l2.3-0.8l0.6-3.9H71.1 M71.1,3.8h-3.1c-1.5,0-2.7,1.1-3,2.5l-0.3,2.1l-0.6,0.2c-1.2,0.4-2,1.6-2,2.8v2.1c0,1.4,1,2.6,2.3,2.9v3.3c0,7.5,4.9,8.1,6.5,8.1H74c1.7,0,3-1.3,3-3v-2.3c0-1.5-1.1-2.7-2.5-3c-0.1,0-0.2-0.1-0.5-0.2c0-0.1,0-0.2,0-0.2v-2.7h0.2c1.7,0,3-1.3,3-3v-2.8c0-1.7-1.3-3-3-3h-0.2V6.8C74.1,5.1,72.7,3.8,71.1,3.8L71.1,3.8z"/>
                    </g>
                    <path fill="#FFFFFF" d="M19.6,24.9V5.4h3.8L31.1,18V5.4h3.7v19.5h-3.7l-7.7-12.4v12.4H19.6z"/>
                    <path fill="#FFFFFF" d="M40.8,10.8c0.6-0.1,1.3-0.2,2.1-0.2c0.8,0,1.4,0,1.9,0c0.4,0,0.9,0.1,1.3,0.2c0.5,0.1,0.8,0.2,1.1,0.3c0.3,0.2,0.6,0.4,0.8,0.6s0.5,0.6,0.6,0.9c0.3,0.8,0.5,1.7,0.5,2.8s-0.2,1.8-0.5,2.4c-0.6,1-1.7,1.5-3.5,1.5h-4.5c0,0.6,0.1,1.1,0.2,1.5s0.3,0.6,0.6,0.8c0.3,0.2,0.6,0.3,0.9,0.3c0.3,0,1.2,0.1,2.5,0.1s2.7-0.1,4-0.3v2.5c-0.8,0.3-1.6,0.5-2.4,0.6c-0.8,0.1-1.4,0.1-1.7,0.1c-0.3,0-0.7,0-1.1,0c-0.6,0-1.3,0-2,0c-1.8,0-3-0.5-3.6-1.6c-0.7-1.1-1-2.9-1-5.4c0-2.5,0.3-4.2,0.8-5.3C38.4,11.7,39.4,11.1,40.8,10.8z M45.5,15.6c0-0.9-0.1-1.5-0.4-1.7s-0.7-0.4-1.4-0.4c-0.7,0-1.2,0-1.5,0.1c-0.3,0-0.5,0.2-0.8,0.4s-0.4,0.5-0.5,0.9c-0.1,0.4-0.1,0.8-0.1,1.2s0,0.6,0,0.7h3.5C45.1,16.7,45.5,16.3,45.5,15.6z"/>
                    <path fill="#FFFFFF" d="M49.9,24.9l4.9-7.1l-4.9-7h4.5L57,15l2.7-4.2h4.5l-4.9,7.1l4.7,7h-4.3L57,20.7l-2.6,4.2H49.9z"/>
                    <path fill="#FFFFFF" d="M65,13.6v-2.1l2.3-0.8l0.6-3.9h3.1v3.9h3.2v2.8h-3.2v5.7c0,1,0.1,1.6,0.3,2c0.2,0.4,0.5,0.6,0.9,0.8c1.1,0.4,1.7,0.6,1.8,0.6v2.3h-3.2c-2.3,0-3.5-1.7-3.5-5.1v-6.2H65z"/>
                </symbol>
                <symbol id="next-block-right" viewBox="0 0 85 184" width="85" height="184">
                    <path fill="#FFFFFF" d="M75,13h-5.6c-0.1-0.2-0.2-0.4-0.3-0.6c0,0,0-0.1-0.1-0.1V9.7c0-2.5-0.8-3.5-3-3.7V5.8C66,2.5,64.1,2,62.1,2h-3.1c-2.7,0-4.6,1.4-4.9,3.6L54,6h-3.3c-1.1,0-1.9,0.6-2.6,1.4C47.4,6.6,46.5,6,45.4,6H41c-0.1,0-0.1,0.1-0.2,0.1C40.5,6,40.1,6,39.7,6c0,0,0,0-0.1,0c-0.4,0-1-0.6-1.6-0.7c-0.2,0-0.3-0.1-0.5-0.2c-0.4-0.1-0.9-0.2-1.4-0.3c-0.1,0-0.3,0-0.4,0c-0.5,0-1-0.1-1.7-0.1c-0.9,0-2.5,0-3.5,0.2C30.3,4.9,30.2,5,30,5V4.4C30,0.6,27.4,0,25.8,0h-3.7c-1.6,0-3.3,0.5-4.5,1.4c-0.8-1-1.8-1.4-3.2-1.4h-3.8C7.8,0,5,1.5,5,4.4V13H0v2h7V4.4C7,2.8,9,2,10.6,2h3.8c1,0,1.5,0.2,2,1.1L18,6.3V4.4C18,2.8,20.4,2,22.1,2h3.7C27.5,2,28,2.8,28,4.4v3.2c1-0.3,1.9-0.6,2.8-0.7C31.6,6.7,33,6.7,34,6.7c0.9,0,1.5,0.1,2,0.1c0.6,0,1.1,0.2,1.7,0.3c0.6,0.1,1.2,0.5,1.7,0.8c0.1-0.1,0.3-0.1,0.4-0.1c0.4,0,0.8,0.2,1.2,0.2h4.5c1,0,2,2.1,2.6,3c0.5-0.9,1.6-3,2.7-3h4.5c0.2,0,0.3-0.2,0.5-0.2c0,0,0,0,0,0L56,5.9c0.2-1.5,1.5-1.9,3-1.9h3.1C63.7,4,64,4.1,64,5.8V8h1.2C66.9,8,67,8.1,67,9.7v2.8c0,0.5,0.9,1.4,0.7,2.4H75c5,0,8,3,8,8v149c0,5-3,10-8,10H0v2h75c6.3,0,10-6.1,10-12V23C85,16.9,81.1,13,75,13z"/>
                    <path fill="#181818" d="M74,177H0V20h74c2.2,0,4,1.8,4,4v149C78,175.2,76.2,177,74,177z"/>
                    <path d="M74,15H0v5h74c2.2,0,4,1.8,4,4v149c0,2.2-1.8,4-4,4H0v5h74c5,0,9-4,9-9V24C83,19,79,15,74,15z"/>
                    <g>
                        <path d="M25,5v20h-3.9L13,12.4V25h-3V5h3.4L21,18V5H25 M24.8,2h-3.7C19.4,2,18,3.8,18,5.4v1.9l-2.1-3.7C15.4,2.7,14.4,2,13.4,2H9.6C8,2,7,3.8,7,5.4v19.5C7,26.5,8,28,9.6,28h3.7c1.7,0,2.6-1.5,2.6-3.1v-1.9l2.4,3.6c0.5,0.9,1.7,1.5,2.7,1.5h3.7c1.7,0,3.2-1.5,3.2-3.1V5.4C28,3.8,26.5,2,24.8,2L24.8,2z"/>
                        <path d="M33,10.6c0.8,0,1.4,0,1.9,0c0.4,0,0.9,0.1,1.3,0.2c0.5,0.1,0.8,0.2,1.1,0.3c0.3,0.2,0.6,0.4,0.8,0.6s0.5,0.6,0.6,0.9c0.3,0.8,0.5,1.7,0.5,2.8s-0.2,1.7-0.5,2.2c-0.6,1-1.7,1.3-3.5,1.3h-4.5c0,1,0.1,1.3,0.2,1.7s0.3,0.7,0.6,0.9c0.3,0.2,0.6,0.3,0.9,0.4c0.3,0,1.2,0.1,2.6,0.1s3-0.1,4-0.3v2.5c-1,0.3-1.6,0.5-2.4,0.6c-0.8,0.1-1.4,0.1-1.7,0.1c-0.3,0-0.7,0-1.1,0c-0.6,0-1.3,0-2.1,0c-1.8,0-3-0.5-3.6-1.6c-0.7-1.1-1-2.9-1-5.4c0-2.5,0.3-4.2,0.8-5.3c0.5-1,1.5-1.7,3-1.9C31.5,10.7,32.2,10.6,33,10.6 M31,17h3.3c0.8,0,1.2-0.5,1.2-1.2c0-0.9-0.1-1.5-0.4-1.8s-0.7-0.4-1.4-0.4c-0.7,0-1.2,0-1.5,0c-0.3,0-0.5,0.2-0.8,0.4s-0.3,0.5-0.4,0.9c-0.1,0.4,0,0.8,0,1.2S31,17,31,17 M33,7.6c-1,0-1.8,0.1-2.6,0.2c-3,0.5-4.5,2.2-5.1,3.5C24.4,12.9,24,15,24,18c0,3.1,0.5,5.3,1.5,6.9c0.9,1.4,2.6,3.1,6.2,3.1c0.8,0,1.5,0,2.1,0c0.5,0,0.9,0,1.2,0c0.3,0,0.9-0.1,1.7-0.1c1.1-0.1,2.2-0.3,3.2-0.7c1.2-0.4,2-1.6,2-2.8v-2.5c0-0.8-0.3-1.5-0.9-2.1c0.1-0.1,0.1-0.2,0.2-0.4c0.6-1,0.8-2.3,0.8-3.9c0-1.4-0.2-2.7-0.7-3.9c-0.3-0.7-0.7-1.4-1.3-2c-0.5-0.4-1-0.8-1.5-1.1c-0.6-0.3-1.2-0.5-2-0.7c-0.6-0.1-1.1-0.2-1.7-0.2C34.5,7.7,33.8,7.6,33,7.6L33,7.6z"/>
                        <path d="M54.2,11l-4.9,7.1L54,25h-4.3L47,20.8L44.4,25h-4.5l4.9-7l-4.9-7h4.5l2.6,4.2l2.7-4.2H54 M54.2,8h-4.5c-1,0-2,0.4-2.5,1.3l-0.1,0.1l-0.1,0C46.5,8.5,45.5,8,44.4,8h-4.5c-1.1,0-2.1,0.5-2.7,1.5c-0.5,1-0.4,2.1,0.2,3l3.7,5.3l-3.7,5.3c-0.6,0.9-0.7,2.2-0.2,3.2c0.5,1,1.5,1.7,2.7,1.7h4.5c1,0,2-0.6,2.5-1.5l0.1-0.2l0.1,0.2c0.5,0.9,1.5,1.5,2.5,1.5H54c1.1,0,2.1-0.7,2.6-1.7c0.5-1,0.5-2.2-0.2-3.1l-3.6-5.3l3.8-5.4c0.6-0.9,0.7-2,0.2-3S55.3,8,54.2,8L54.2,8z"/>
                        <path d="M61,7v4h3v3h-3v5.2c0,1,0.1,1.6,0.3,2c0.2,0.4,0.5,0.6,0.9,0.8c1.1,0.4,1.8,0.6,1.8,0.6V25h-3.2c-2.3,0-3.8-1.8-3.8-5.2V14h-2v-2.5l2.3-0.7L57.9,7H61 M61.1,4h-3.1c-1.5,0-2.7,1-3,2.4l-0.3,2.1l-0.6,0.2c-1.2,0.4-2.1,1.5-2.1,2.8v2.1c0,1.4,1,2.6,2,2.9v3.3c0,7.5,5.3,8.2,6.8,8.2H64c1.7,0,3-1.5,3-3.1v-2.3c0-1.5-1.1-2.7-2.5-3c-0.1,0-0.2-0.1-0.5-0.2c0-0.1,0-0.2,0-0.2V17h0.2c1.7,0,2.8-1.8,2.8-3.4v-2.8C67,9.1,65.9,8,64.2,8H64V6.8C64,5.1,62.7,4,61.1,4L61.1,4z" />
                    </g>
                    <path fill="#FFFFFF" d="M10,25V5h3.4L21,18V5h4v20h-3.9L13,12.4V25H10z"/>
                    <path fill="#FFFFFF" d="M30.8,10.8c0.6-0.1,1.3-0.2,2.1-0.2c0.8,0,1.4,0,1.9,0c0.4,0,0.9,0.1,1.3,0.2c0.5,0.1,0.8,0.2,1.1,0.3c0.3,0.2,0.6,0.4,0.8,0.6s0.5,0.6,0.6,0.9c0.3,0.8,0.5,1.7,0.5,2.8s-0.2,1.7-0.5,2.2c-0.6,1-1.7,1.3-3.5,1.3h-4.5c0,1,0.1,1.3,0.2,1.7s0.3,0.7,0.6,0.9c0.3,0.2,0.6,0.3,0.9,0.4c0.3,0,1.2,0.1,2.6,0.1s3-0.1,4-0.3v2.5c-1,0.3-1.6,0.5-2.4,0.6c-0.8,0.1-1.4,0.1-1.7,0.1c-0.3,0-0.7,0-1.1,0c-0.6,0-1.3,0-2.1,0c-1.8,0-3-0.5-3.6-1.6c-0.7-1.1-1-2.9-1-5.4c0-2.5,0.3-4.2,0.8-5.3C28.4,11.7,29.4,11.1,30.8,10.8z M35.5,15.8c0-0.9-0.1-1.5-0.4-1.8s-0.7-0.4-1.4-0.4c-0.7,0-1.2,0-1.5,0c-0.3,0-0.5,0.2-0.8,0.4s-0.3,0.5-0.4,0.9c-0.1,0.4,0,0.8,0,1.2s0,1,0,1h3.3C35.1,17,35.5,16.5,35.5,15.8z"/>
                    <path fill="#FFFFFF" d="M39.9,25l4.9-7l-4.9-7h4.5l2.6,4.2l2.7-4.2h4.5l-4.9,7.1L54,25h-4.3L47,20.8L44.4,25H39.9z"/>
                    <path fill="#FFFFFF" d="M55,14v-2.5l2.3-0.7L57.9,7H61v4h3v3h-3v5.2c0,1,0.1,1.6,0.3,2c0.2,0.4,0.5,0.6,0.9,0.8c1.1,0.4,1.8,0.6,1.8,0.6V25h-3.2c-2.3,0-3.8-1.8-3.8-5.2V14H55z"/>
                </symbol>
                <symbol id="grid-background" viewBox="0 0 288 558" width={ fieldWidth + 18 } height={ fieldHeight + 18 }>
                    <g>
                        <g>
                            <path d="M10,557c-5,0-9-4-9-9V10c0-5,4-9,9-9h268c5,0,9,4,9,9v538c0,5-4,9-9,9H10z"/>
                            <path fill="#FFFFFF" d="M278,2c4.4,0,8,3.6,8,8v538c0,4.4-3.6,8-8,8H10c-4.4,0-8-3.6-8-8V10c0-4.4,3.6-8,8-8H278 M278,0H10C4.5,0,0,4.5,0,10v538c0,5.5,4.5,10,10,10h268c5.5,0,10-4.5,10-10V10C288,4.5,283.5,0,278,0L278,0z"/>
                        </g>
                        <path fill="#2F2F2F" d="M277,551H9c-2.2,0-4-1.8-4-4V9c0-2.2,1.8-4,4-4h268c2.2,0,4,1.8,4,4v538C281,549.2,279.2,551,277,551z"/>
                    </g>
                </symbol>
                <symbol id="block-0-light" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/grid-block-light.svg" />`,
                }} />
                <symbol id="block-0-dark" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/grid-block-dark.svg" />`,
                }} />
                <symbol id="block-I" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-I.svg" />`,
                }} />
                <symbol id="block-J" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-J.svg" />`,
                }} />
                <symbol id="block-L" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-L.svg" />`,
                }} />
                <symbol id="block-O" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-O.svg" />`,
                }} />
                <symbol id="block-S" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-S.svg" />`,
                }} />
                <symbol id="block-T" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-T.svg" />`,
                }} />
                <symbol id="block-Z" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-Z.svg" />`,
                }} />
                <symbol id="block-G" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-G.svg" />`,
                }} />
                <symbol id="block-I-nobkg" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-I-nobkg.svg" />`,
                }} />
                <symbol id="block-J-nobkg" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-J-nobkg.svg" />`,
                }} />
                <symbol id="block-L-nobkg" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-L-nobkg.svg" />`,
                }} />
                <symbol id="block-O-nobkg" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-O-nobkg.svg" />`,
                }} />
                <symbol id="block-S-nobkg" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-S-nobkg.svg" />`,
                }} />
                <symbol id="block-T-nobkg" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-T-nobkg.svg" />`,
                }} />
                <symbol id="block-Z-nobkg" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-Z-nobkg.svg" />`,
                }} />
                <symbol id="block-3" dangerouslySetInnerHTML={{
                    __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-3.svg" />`,
                }} />
                <symbol id='shape-I' viewBox={ "0 0 " + (cell.width * 3) + " " + (cell.height * 4) }>
                    <use x={ cell.width } y="0" xlinkHref="#block-I-nobkg" />
                    <use x={ cell.width } y={ cell.height } xlinkHref="#block-I-nobkg" />
                    <use x={ cell.width } y={ cell.height * 2 } xlinkHref="#block-I-nobkg" />
                    <use x={ cell.width } y={ cell.height * 3 } xlinkHref="#block-I-nobkg" />
                </symbol>
                <symbol id='shape-J' viewBox={ "0 0 " + (cell.width * 3) + " " + (cell.height * 4) }>
                    <use x={ cell.width * 1.5 } y={ cell.height * 0.5 } xlinkHref="#block-J-nobkg" />
                    <use x={ cell.width * 1.5 } y={ cell.height * 1.5 } xlinkHref="#block-J-nobkg" />
                    <use x={ cell.width * 1.5 } y={ cell.height * 2.5 } xlinkHref="#block-J-nobkg" />
                    <use x={ cell.width * 0.5 } y={ cell.height * 2.5 } xlinkHref="#block-J-nobkg" />
                </symbol>
                <symbol id='shape-L' viewBox={ "0 0 " + (cell.width * 3) + " " + (cell.height * 4) }>
                    <use x={ cell.width * 0.5 } y={ cell.height * 0.5 } xlinkHref="#block-L-nobkg" />
                    <use x={ cell.width * 0.5 } y={ cell.height * 1.5 } xlinkHref="#block-L-nobkg" />
                    <use x={ cell.width * 0.5 } y={ cell.height * 2.5 } xlinkHref="#block-L-nobkg" />
                    <use x={ cell.width * 1.5 } y={ cell.height * 2.5 } xlinkHref="#block-L-nobkg" />
                </symbol>
                <symbol id='shape-O' viewBox={ "0 0 " + (cell.width * 3) + " " + (cell.height * 4) }>
                    <use x={ cell.width * 0.5 } y={ cell.height } xlinkHref="#block-O-nobkg" />
                    <use x={ cell.width * 0.5 } y={ cell.height * 2 } xlinkHref="#block-O-nobkg" />
                    <use x={ cell.width * 1.5 } y={ cell.height } xlinkHref="#block-O-nobkg" />
                    <use x={ cell.width * 1.5 } y={ cell.height * 2 } xlinkHref="#block-O-nobkg" />
                </symbol>
                <symbol id='shape-S' viewBox={ "0 0 " + (cell.width * 3) + " " + (cell.height * 4) }>
                    <use x={ cell.width * 0.5 } y={ cell.height * 0.5 } xlinkHref="#block-S-nobkg" />
                    <use x={ cell.width * 0.5 } y={ cell.height * 1.5 } xlinkHref="#block-S-nobkg" />
                    <use x={ cell.width * 1.5 } y={ cell.height * 1.5 } xlinkHref="#block-S-nobkg" />
                    <use x={ cell.width * 1.5 } y={ cell.height * 2.5 } xlinkHref="#block-S-nobkg" />
                </symbol>
                <symbol id='shape-T' viewBox={ "0 0 " + (cell.width * 3) + " " + (cell.height * 4) }>
                    <use x={ cell.width * 0.5 } y={ cell.height * 0.5 } xlinkHref="#block-T-nobkg" />
                    <use x={ cell.width * 0.5 } y={ cell.height * 1.5 } xlinkHref="#block-T-nobkg" />
                    <use x={ cell.width * 0.5 } y={ cell.height * 2.5 } xlinkHref="#block-T-nobkg" />
                    <use x={ cell.width * 1.5 } y={ cell.height * 1.5 } xlinkHref="#block-T-nobkg" />
                </symbol>
                <symbol id="shape-Z" viewBox={ "0 0 " + (cell.width * 3) + " " + (cell.height * 4) }>
                    <use x={ cell.width * 1.5 } y={ cell.height * 0.5 } xlinkHref="#block-Z-nobkg" />
                    <use x={ cell.width * 1.5 } y={ cell.height * 1.5 } xlinkHref="#block-Z-nobkg" />
                    <use x={ cell.width * 0.5 } y={ cell.height * 1.5 } xlinkHref="#block-Z-nobkg" />
                    <use x={ cell.width * 0.5 } y={ cell.height * 2.5 } xlinkHref="#block-Z-nobkg" />
                </symbol>
            </defs>
            <text x="50%" y="75" className="TetrisGame-currentRound">{ 'Round ' + round }</text>
            { _.map(playerView, PlayerView) }
            <Overlay winner={ winner } />
        </svg>
    );
});

export default GameView;
